import { logger } from "@navikt/next-logger";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FormRequest } from "@/server/schemas/formRequestSchema";
import { submitForm } from "./submitForm";

const serializedLogLines = vi.hoisted((): string[] => []);
vi.mock("@navikt/next-logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@navikt/next-logger")>();
  const backend = actual.backendLogger(
    {},
    {
      write(line: string) {
        serializedLogLines.push(line);
      },
    },
  );
  return {
    ...actual,
    logger: {
      error: vi.fn(backend.error.bind(backend)),
      warn: vi.fn(backend.warn.bind(backend)),
    },
  };
});

vi.mock("axios", async (importOriginal) => ({
  ...(await importOriginal<typeof import("axios")>()),
  default: vi.fn(),
}));

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
    async () => "tokenx-token",
  ),
}));

vi.mock("@/constants/envs", () => ({
  getServerEnv: vi.fn(() => ({
    MEROPPFOLGING_BACKEND_URL: "http://meroppfolging-backend",
  })),
  isLocalOrDemo: false,
}));

const SYNTHETIC_CANARY = "synthetic-private-form-canary-7c96a4";

const formRequest: FormRequest = {
  senOppfolgingFormV2: [
    {
      questionType: "FREMTIDIG_SITUASJON",
      questionText: `${SYNTHETIC_CANARY}-question-one`,
      answerType: "USIKKER",
      answerText: `${SYNTHETIC_CANARY}-answer-one`,
    },
    {
      questionType: "BEHOV_FOR_OPPFOLGING",
      questionText: `${SYNTHETIC_CANARY}-question-two`,
      answerType: "JA",
      answerText: `${SYNTHETIC_CANARY}-answer-two`,
    },
  ],
};

describe("submitForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    serializedLogLines.length = 0;
  });

  it("exposes only allowlisted diagnostics when submission fails", async () => {
    vi.mocked(axios).mockRejectedValueOnce(
      Object.assign(new Error(`${SYNTHETIC_CANARY}-upstream-error`), {
        config: { data: formRequest },
        isAxiosError: true,
        response: { data: formRequest, status: 503 },
      }),
    );

    const rejection: unknown = await submitForm(formRequest).catch(
      (error: unknown) => error,
    );

    expect(rejection).toBeInstanceOf(Error);
    if (!(rejection instanceof Error)) {
      throw new Error("Expected submission to reject with an Error");
    }
    expect(rejection.message).toBe("Failed to submit registration");
    expect(rejection.message).not.toContain(SYNTHETIC_CANARY);
    expect(rejection.cause).toBeUndefined();
    expect(vi.mocked(logger.error).mock.calls).toEqual([
      [
        expect.objectContaining({
          event_type: "sen_oppfolging_svar_submit_failed",
          error_code: "UPSTREAM_HTTP_ERROR",
          upstream_status: 503,
          operation: "submit_sen_oppfolging_svar",
          upstream: "meroppfolging-backend",
        }),
        "Kunne ikke sende svar på sen oppfølging",
      ],
    ]);
    expect(JSON.stringify(vi.mocked(logger.error).mock.calls)).not.toContain(
      SYNTHETIC_CANARY,
    );
  });

  it.each([
    {
      error: Object.assign(new Error(`${SYNTHETIC_CANARY}-invalid-status`), {
        config: { data: formRequest },
        isAxiosError: true,
        response: {
          data: formRequest,
          status: `${SYNTHETIC_CANARY}-status`,
        },
      }),
      expectedErrorCode: "UPSTREAM_HTTP_ERROR",
    },
    {
      error: Object.assign(new Error(`${SYNTHETIC_CANARY}-timeout`), {
        code: "ETIMEDOUT",
        config: { data: formRequest },
        isAxiosError: true,
        request: { body: formRequest },
      }),
      expectedErrorCode: "ETIMEDOUT",
    },
    {
      error: Object.assign(new Error(`${SYNTHETIC_CANARY}-network`), {
        config: { data: formRequest },
        isAxiosError: true,
        request: { body: formRequest },
      }),
      expectedErrorCode: "UPSTREAM_NETWORK_ERROR",
    },
    {
      error: Object.assign(new Error(`${SYNTHETIC_CANARY}-request`), {
        config: { data: formRequest },
        isAxiosError: true,
      }),
      expectedErrorCode: "UPSTREAM_REQUEST_ERROR",
    },
    {
      error: new Error(`${SYNTHETIC_CANARY}-unexpected`),
      expectedErrorCode: "UNEXPECTED_ERROR",
    },
  ])(
    "classifies failures as $expectedErrorCode without exposing the error",
    async ({ error, expectedErrorCode }) => {
      vi.mocked(axios).mockRejectedValueOnce(error);

      await expect(submitForm(formRequest)).rejects.toThrow(
        "Failed to submit registration",
      );

      expect(vi.mocked(logger.error).mock.calls).toEqual([
        [
          expect.objectContaining({
            event_type: "sen_oppfolging_svar_submit_failed",
            error_code: expectedErrorCode,
            operation: "submit_sen_oppfolging_svar",
            upstream: "meroppfolging-backend",
          }),
          "Kunne ikke sende svar på sen oppfølging",
        ],
      ]);
      expect(JSON.stringify(vi.mocked(logger.error).mock.calls)).not.toContain(
        SYNTHETIC_CANARY,
      );
    },
  );
  it.each(["ALREADY_RESPONDED", "NO_UTSENDT_VARSEL"])(
    "logs the known %s domain conflict once without response data",
    async (code) => {
      vi.mocked(axios).mockRejectedValueOnce(
        Object.assign(new Error(SYNTHETIC_CANARY), {
          isAxiosError: true,
          response: {
            status: 409,
            data: {
              error_code: code,
              reason: SYNTHETIC_CANARY,
              token: SYNTHETIC_CANARY,
            },
          },
          config: {
            data: formRequest,
            headers: { Authorization: SYNTHETIC_CANARY },
          },
        }),
      );
      await expect(submitForm(formRequest)).rejects.toThrow(
        "Failed to submit registration",
      );
      expect(logger.error).not.toHaveBeenCalled();
      expect(serializedLogLines).toHaveLength(1);
      expect(JSON.parse(serializedLogLines[0])).toMatchObject({
        level: "warn",
        event_type: "api_request_rejected",
        operation: "submit_sen_oppfolging_svar",
        rejection_reason: code,
        error_code: code,
        failure_kind: "domain",
        failure_stage: "response",
        upstream_status: 409,
        upstream: "meroppfolging-backend",
        outcome: "rejected",
      });
      expect(serializedLogLines[0]).not.toContain(SYNTHETIC_CANARY);
    },
  );

  it("keeps an unexplained 409 visible as a technical failure", async () => {
    vi.mocked(axios).mockRejectedValueOnce(
      Object.assign(new Error(SYNTHETIC_CANARY), {
        isAxiosError: true,
        response: { status: 409, data: { error_code: SYNTHETIC_CANARY } },
      }),
    );
    await expect(submitForm(formRequest)).rejects.toThrow();
    expect(logger.warn).not.toHaveBeenCalled();
    expect(serializedLogLines).toHaveLength(1);
    expect(JSON.parse(serializedLogLines[0])).toMatchObject({
      level: "error",
      error_code: "UPSTREAM_HTTP_ERROR",
      failure_kind: "http",
      upstream_status: 409,
    });
    expect(serializedLogLines[0]).not.toContain(SYNTHETIC_CANARY);
  });

  it.each([
    ["ENOTFOUND", "dns"],
    ["ETIMEDOUT", "timeout"],
    ["ECONNREFUSED", "connection"],
    ["CERT_HAS_EXPIRED", "tls"],
  ])(
    "preserves %s diagnosis through Axios cause without logging its payload",
    async (code, kind) => {
      vi.mocked(axios).mockRejectedValueOnce(
        Object.assign(
          new Error(SYNTHETIC_CANARY, {
            cause: Object.assign(new Error(SYNTHETIC_CANARY), { code }),
          }),
          {
            isAxiosError: true,
            request: {},
            config: { data: formRequest },
          },
        ),
      );
      await expect(submitForm(formRequest)).rejects.toThrow();
      expect(serializedLogLines).toHaveLength(1);
      expect(JSON.parse(serializedLogLines[0])).toMatchObject({
        error_code: code,
        failure_kind: kind,
        failure_stage: "request",
        cause_type: "Error",
      });
      expect(serializedLogLines[0]).not.toContain(SYNTHETIC_CANARY);
    },
  );
});
