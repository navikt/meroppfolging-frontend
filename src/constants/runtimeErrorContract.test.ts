import { describe, expect, it } from "vitest";
import {
  RuntimeErrorCode,
  RuntimeErrorContext,
  RuntimeErrorEvent,
} from "./runtimeErrorContract";

describe("runtime error contract", () => {
  it("uses unique, low-cardinality event types with canonical domain terms", () => {
    const eventTypes = Object.values(RuntimeErrorEvent);

    expect(new Set(eventTypes).size).toBe(eventTypes.length);
    expect(eventTypes).toEqual(
      expect.arrayContaining([
        "sen_oppfolging_svar_submit_failed",
        "sen_oppfolging_status_fetch_failed",
        "maksdato_fetch_failed",
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

  it("pairs every event with one bounded operation and upstream", () => {
    const contexts = Object.values(RuntimeErrorContext);
    const eventTypes = contexts.map(({ event_type }) => event_type);
    const operations = contexts.map(({ operation }) => operation);

    expect(new Set(eventTypes)).toEqual(
      new Set(Object.values(RuntimeErrorEvent)),
    );
    expect(new Set(operations).size).toBe(operations.length);
    for (const { operation, upstream } of contexts) {
      expect(operation).toMatch(/^[a-z][a-z0-9_]{2,63}$/);
      expect(upstream).toMatch(/^[a-z][a-z0-9-]{2,63}$/);
    }
  });
});
