import { describe, expect, it, vi } from "vitest";
import { logAnalyticsEvent } from "./analytics";

const mocks = vi.hoisted(() => ({
  analyticsLogger: vi.fn(),
  errorLogger: vi.fn(),
}));

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({
  getAnalyticsInstance: vi.fn(() => mocks.analyticsLogger),
}));

vi.mock("@navikt/next-logger", () => ({
  logger: {
    error: mocks.errorLogger,
  },
}));

vi.mock("@/constants/envs", () => ({
  isLocalOrDemo: false,
}));

const SYNTHETIC_CANARY = "synthetic-analytics-error-canary-9e4581";

describe("logAnalyticsEvent", () => {
  it("logs only allowlisted diagnostics when the analytics provider fails", async () => {
    mocks.analyticsLogger.mockRejectedValueOnce(
      new Error(`${SYNTHETIC_CANARY}-provider-error`),
    );

    await logAnalyticsEvent({
      eventName: "skjema fullført",
      data: { skjemanavn: "Snart slutt på sykepengene" },
    });

    expect(mocks.errorLogger.mock.calls).toEqual([
      [
        {
          event_type: "analytics_event_send_failed",
          operation: "send_analytics_event",
          error_code: "ANALYTICS_CLIENT_ERROR",
          upstream: "nav-dekoratoren",
        },
        "Analytics logging failed",
      ],
    ]);
  });
});
