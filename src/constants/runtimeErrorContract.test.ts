import { describe, expect, it } from "vitest";
import { RuntimeErrorCode, RuntimeErrorEvent } from "./runtimeErrorContract";

describe("runtime error contract", () => {
  it("uses unique, low-cardinality event types with canonical domain terms", () => {
    const eventTypes = Object.values(RuntimeErrorEvent);

    expect(new Set(eventTypes).size).toBe(eventTypes.length);
    expect(eventTypes).toEqual(
      expect.arrayContaining([
        "sen_oppfolging_svar_submit_failed",
        "analytics_event_send_failed",
      ]),
    );
    for (const eventType of eventTypes) {
      expect(eventType).toMatch(/^[a-z][a-z0-9_]{2,63}$/);
    }
  });

  it("uses a closed uppercase error-code catalog", () => {
    const errorCodes = Object.values(RuntimeErrorCode);

    expect(new Set(errorCodes).size).toBe(errorCodes.length);
    for (const errorCode of errorCodes) {
      expect(errorCode).toMatch(/^[A-Z][A-Z0-9_]{2,63}$/);
    }
  });
});
