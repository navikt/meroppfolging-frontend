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

vi.mock("axios", () => ({
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
        response: { data: formRequest },
        status: 500,
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
          event: "submit_form_failed",
          operation: "submit_sen_oppfolging_form",
          upstream: "meroppfolging-backend",
        },
        "Failed to submit registration",
      ],
    ]);
  });
});
