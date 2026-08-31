import { logger } from "@navikt/next-logger";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FormRequest } from "@/server/schemas/formRequestSchema";
import { submitForm } from "./submitForm";

vi.mock("@navikt/next-logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

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
        {
          event_type: "sen_oppfolging_svar_submit_failed",
          error_code: "UPSTREAM_HTTP_ERROR",
          status: 503,
          operation: "submit_sen_oppfolging_svar",
          upstream: "meroppfolging-backend",
        },
        "Failed to submit registration",
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
      expectedErrorCode: "UPSTREAM_TIMEOUT",
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
          {
            event_type: "sen_oppfolging_svar_submit_failed",
            error_code: expectedErrorCode,
            operation: "submit_sen_oppfolging_svar",
            upstream: "meroppfolging-backend",
          },
          "Failed to submit registration",
        ],
      ]);
      expect(JSON.stringify(vi.mocked(logger.error).mock.calls)).not.toContain(
        SYNTHETIC_CANARY,
      );
    },
  );
});
