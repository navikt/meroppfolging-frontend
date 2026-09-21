import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  exchangeIdportenTokenForMeroppfolgingBackendTokenx,
  exchangeIdportenTokenForSykepengedagerInformasjonTokenx,
} from "./tokenUtils";

const lines = vi.hoisted((): string[] => []);
const requestOboToken = vi.hoisted(() => vi.fn());
vi.mock("@navikt/oasis", () => ({ requestOboToken }));
vi.mock("@/constants/envs", () => ({
  getServerEnv: () => ({ NAIS_CLUSTER_NAME: "test-cluster" }),
  isLocalOrDemo: false,
}));
vi.mock("@navikt/next-logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@navikt/next-logger")>();
  return {
    ...actual,
    logger: actual.backendLogger(
      {},
      {
        write(line: string) {
          lines.push(line);
        },
      },
    ),
  };
});
const secret = "private-token-canary-01017012345";

describe("TokenX diagnostics preserve the existing target audiences", () => {
  beforeEach(() => {
    lines.length = 0;
    requestOboToken.mockReset();
  });
  it.each([
    [
      exchangeIdportenTokenForMeroppfolgingBackendTokenx,
      "meroppfolging-backend",
    ],
    [
      exchangeIdportenTokenForSykepengedagerInformasjonTokenx,
      "sykepengedager-informasjon",
    ],
  ] as const)(
    "identifies a failed grant for %s",
    async (exchange, upstream) => {
      requestOboToken.mockResolvedValue({
        ok: false,
        error: new Error(secret),
      });
      await expect(exchange(secret)).rejects.toThrow(
        "TokenX OBO exchange failed",
      );
      expect(requestOboToken).toHaveBeenCalledExactlyOnceWith(
        secret,
        `test-cluster:team-esyfo:${upstream}`,
      );
      expect(lines).toHaveLength(1);
      expect(JSON.parse(lines[0])).toMatchObject({
        event_type: "tokenx_obo_exchange_failed",
        upstream,
        failure_stage: "token_exchange",
        failure_kind: "token",
        error_code: "TOKENX_OBO_EXCHANGE_ERROR",
      });
      expect(lines[0]).not.toContain(secret);
    },
  );

  it("retains a thrown DNS cause without logging provider details", async () => {
    requestOboToken.mockRejectedValue(
      new TypeError(secret, {
        cause: Object.assign(new Error(secret), { code: "ENOTFOUND" }),
      }),
    );
    await expect(
      exchangeIdportenTokenForMeroppfolgingBackendTokenx(secret),
    ).rejects.toThrow("TokenX OBO exchange failed");
    expect(lines).toHaveLength(1);
    expect(JSON.parse(lines[0])).toMatchObject({
      failure_kind: "dns",
      failure_stage: "token_exchange",
      error_code: "UPSTREAM_DNS_FAILURE",
    });
    expect(lines[0]).not.toContain(secret);
  });
});
