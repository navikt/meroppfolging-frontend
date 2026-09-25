import { describe, expect, it } from "vitest";
import { transportErrorCodes } from "@/server/observability/failureDiagnostics";
import {
  ApiRequestRejectedEvent,
  RuntimeErrorCode,
  RuntimeErrorContext,
  RuntimeErrorEvent,
  RuntimeRejectionReason,
  TokenxOboExchangeContext,
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
        "tokenx_obo_exchange_failed",
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
    const eventTypes = [
      ...contexts.map(({ event_type }) => event_type),
      TokenxOboExchangeContext.event_type,
    ];
    const operations = [
      ...contexts.map(({ operation }) => operation),
      TokenxOboExchangeContext.operation,
    ];

    expect(new Set(eventTypes)).toEqual(
      new Set(Object.values(RuntimeErrorEvent)),
    );
    expect(new Set(operations).size).toBe(operations.length);
    for (const { operation, upstream } of contexts) {
      expect(operation).toMatch(/^[a-z][a-z0-9_]{2,63}$/);
      expect(upstream).toMatch(/^[a-z][a-z0-9-]{2,63}$/);
    }
  });

  it("keeps rejection reasons and transport codes in closed code catalogs", () => {
    expect(ApiRequestRejectedEvent).toBe("api_request_rejected");
    const codes = [
      ...Object.values(RuntimeRejectionReason),
      ...transportErrorCodes,
    ];
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) {
      expect(code).toMatch(/^[A-Z][A-Z0-9_]{1,79}$/);
      expect(Object.values(RuntimeErrorCode)).not.toContain(code);
    }
  });
});
