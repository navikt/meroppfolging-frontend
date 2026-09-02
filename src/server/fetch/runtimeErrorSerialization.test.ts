import {
  type Context,
  type ContextManager,
  context,
  ROOT_CONTEXT,
  TraceFlags,
  trace,
} from "@opentelemetry/api";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getMaxDate } from "./getMaxDate";
import { senOppfolgingStatus } from "./senOppfolgingStatus";

const serializedLogLines = vi.hoisted((): string[] => []);

vi.mock("@navikt/next-logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@navikt/next-logger")>();

  return {
    ...actual,
    logger: actual.backendLogger(
      {},
      {
        write(line: string) {
          serializedLogLines.push(line);
        },
      },
    ),
  };
});

vi.mock("@navikt/oasis", () => ({
  getToken: vi.fn(() => "idporten-token"),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers()),
}));

vi.mock("@/auth/getIdPortenToken", () => ({
  validateIdPortenToken: vi.fn(async () => true),
}));

vi.mock("@/auth/navigateToLogin", () => ({
  navigateToLogin: vi.fn(),
}));

vi.mock("@/auth/tokenUtils", () => ({
  exchangeIdportenTokenForMeroppfolgingBackendTokenx: vi.fn(
    async () => "meroppfolging-tokenx-token",
  ),
  exchangeIdportenTokenForSykepengedagerInformasjonTokenx: vi.fn(
    async () => "sykepengedager-tokenx-token",
  ),
}));

const PRIVATE_CANARY = "synthetic-private-fetch-canary-6bfc71";

vi.mock("@/constants/envs", () => ({
  getServerEnv: vi.fn(() => ({
    MEROPPFOLGING_BACKEND_URL: `https://${PRIVATE_CANARY}.invalid`,
    SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL: `https://${PRIVATE_CANARY}.invalid/api/maksdato`,
  })),
  isLocalOrDemo: false,
}));

let activeContext: Context = ROOT_CONTEXT;

const synchronousContextManager: ContextManager = {
  active: () => activeContext,
  bind: (_context, target) => target,
  disable() {
    activeContext = ROOT_CONTEXT;
    return this;
  },
  enable() {
    return this;
  },
  with(contextToActivate, fn, thisArg, ...args) {
    const previousContext = activeContext;
    activeContext = contextToActivate;
    try {
      return fn.call(thisArg, ...args);
    } finally {
      activeContext = previousContext;
    }
  },
};

async function withActiveTrace<T>(
  traceId: string,
  fn: () => T | Promise<T>,
): Promise<T> {
  const previousContext = activeContext;
  const span = trace.wrapSpanContext({
    traceId,
    spanId: "1234567890abcdef",
    traceFlags: TraceFlags.SAMPLED,
    isRemote: false,
  });
  activeContext = trace.setSpan(ROOT_CONTEXT, span);

  try {
    return await fn();
  } finally {
    activeContext = previousContext;
  }
}

function onlySerializedLog(): {
  line: string;
  record: Record<string, unknown>;
} {
  expect(serializedLogLines).toHaveLength(1);
  return {
    line: serializedLogLines[0],
    record: JSON.parse(serializedLogLines[0]) as Record<string, unknown>,
  };
}

function expectPrivateDataAbsent(
  line: string,
  record: Record<string, unknown>,
): void {
  for (const privateValue of [
    PRIVATE_CANARY,
    "idporten-token",
    "meroppfolging-tokenx-token",
    "sykepengedager-tokenx-token",
  ]) {
    expect(line).not.toContain(privateValue);
  }
  expect(record).not.toHaveProperty("endpoint");
  expect(record).not.toHaveProperty("status");
  expect(record).not.toHaveProperty("statusText");
  expect(record).not.toHaveProperty("err");
  expect(record).not.toHaveProperty("stack");
  expect(record).not.toHaveProperty("issues");
}

const fetchMock = vi.fn<typeof fetch>();

describe("serialized runtime errors for server fetches", () => {
  beforeAll(() => {
    context.disable();
    context.setGlobalContextManager(synchronousContextManager.enable());
  });

  beforeEach(() => {
    activeContext = ROOT_CONTEXT;
    serializedLogLines.length = 0;
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterAll(() => {
    context.disable();
    vi.unstubAllGlobals();
  });

  it("serializes one traced status event without endpoint or statusText", async () => {
    const traceId = "1234567890abcdef1234567890abcdef";
    fetchMock.mockResolvedValueOnce(
      new Response(`${PRIVATE_CANARY}-response-body`, {
        status: 503,
        statusText: `${PRIVATE_CANARY}-status-text`,
      }),
    );

    const rejection = await withActiveTrace(traceId, () =>
      senOppfolgingStatus().catch((error: unknown) => error),
    );

    expect(rejection).toBeInstanceOf(Error);
    expect((rejection as Error).message).toBe(
      "Failed to fetch sen oppfolging status",
    );
    expect(fetchMock).toHaveBeenCalledOnce();
    const { line, record } = onlySerializedLog();
    expect(record).toMatchObject({
      level: "error",
      event_type: "sen_oppfolging_status_fetch_failed",
      operation: "fetch_sen_oppfolging_status",
      error_code: "UPSTREAM_HTTP_ERROR",
      upstream: "meroppfolging-backend",
      method: "GET",
      upstream_status: 503,
      trace_id: traceId,
      message: "Failed to fetch sen oppfolging status",
    });
    expectPrivateDataAbsent(line, record);
  });

  it("serializes one traced maksdato schema event without payload or Zod details", async () => {
    const traceId = "2234567890abcdef1234567890abcdef";
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          maxDate: { privateValue: PRIVATE_CANARY },
          utbetaltTom: null,
          gjenstaendeSykedager: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const rejection = await withActiveTrace(traceId, () =>
      getMaxDate().catch((error: unknown) => error),
    );

    expect(rejection).toBeInstanceOf(Error);
    expect((rejection as Error).message).toBe("Failed to fetch maksdato");
    expect(fetchMock).toHaveBeenCalledOnce();
    const { line, record } = onlySerializedLog();
    expect(record).toMatchObject({
      level: "error",
      event_type: "maksdato_fetch_failed",
      operation: "fetch_maksdato",
      error_code: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
      upstream: "sykepengedager-informasjon",
      method: "GET",
      upstream_status: 200,
      trace_id: traceId,
      message: "Failed to fetch maksdato",
    });
    expectPrivateDataAbsent(line, record);
  });

  it("omits upstream status when no response exists", async () => {
    fetchMock.mockRejectedValueOnce(
      new Error(`${PRIVATE_CANARY}-network-detail`),
    );

    await expect(getMaxDate()).rejects.toThrow("Failed to fetch maksdato");

    const { line, record } = onlySerializedLog();
    expect(record).toMatchObject({
      event_type: "maksdato_fetch_failed",
      error_code: "UPSTREAM_NETWORK_ERROR",
    });
    expect(record).not.toHaveProperty("upstream_status");
    expectPrivateDataAbsent(line, record);
  });

  it("classifies invalid JSON without serializing the response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(`{"private":"${PRIVATE_CANARY}"`, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(senOppfolgingStatus()).rejects.toThrow(
      "Failed to fetch sen oppfolging status",
    );

    const { line, record } = onlySerializedLog();
    expect(record).toMatchObject({
      event_type: "sen_oppfolging_status_fetch_failed",
      error_code: "UPSTREAM_RESPONSE_PARSE_ERROR",
      upstream_status: 200,
    });
    expectPrivateDataAbsent(line, record);
  });

  it("returns valid data without logging", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          response: null,
          responseDateTime: null,
          hasAccessToSenOppfolging: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(senOppfolgingStatus()).resolves.toMatchObject({
      hasAccessToSenOppfolging: true,
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(serializedLogLines).toHaveLength(0);
  });
});
