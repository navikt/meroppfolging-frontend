export const RuntimeErrorEvent = {
  SEN_OPPFOLGING_SVAR_SUBMIT_FAILED: "sen_oppfolging_svar_submit_failed",
  SEN_OPPFOLGING_STATUS_FETCH_FAILED: "sen_oppfolging_status_fetch_failed",
  MAKSDATO_FETCH_FAILED: "maksdato_fetch_failed",
  ANALYTICS_EVENT_SEND_FAILED: "analytics_event_send_failed",
} as const;

export type RuntimeErrorEvent =
  (typeof RuntimeErrorEvent)[keyof typeof RuntimeErrorEvent];

export const RuntimeErrorCode = {
  UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
  UPSTREAM_HTTP_ERROR: "UPSTREAM_HTTP_ERROR",
  UPSTREAM_TIMEOUT: "UPSTREAM_TIMEOUT",
  UPSTREAM_NETWORK_ERROR: "UPSTREAM_NETWORK_ERROR",
  UPSTREAM_REQUEST_ERROR: "UPSTREAM_REQUEST_ERROR",
  UPSTREAM_RESPONSE_PARSE_ERROR: "UPSTREAM_RESPONSE_PARSE_ERROR",
  UPSTREAM_RESPONSE_SCHEMA_MISMATCH: "UPSTREAM_RESPONSE_SCHEMA_MISMATCH",
  ANALYTICS_CLIENT_ERROR: "ANALYTICS_CLIENT_ERROR",
} as const;

export type RuntimeErrorCode =
  (typeof RuntimeErrorCode)[keyof typeof RuntimeErrorCode];

export const RuntimeErrorContext = {
  SEN_OPPFOLGING_SVAR_SUBMIT: {
    event_type: RuntimeErrorEvent.SEN_OPPFOLGING_SVAR_SUBMIT_FAILED,
    operation: "submit_sen_oppfolging_svar",
    upstream: "meroppfolging-backend",
  },
  SEN_OPPFOLGING_STATUS_FETCH: {
    event_type: RuntimeErrorEvent.SEN_OPPFOLGING_STATUS_FETCH_FAILED,
    operation: "fetch_sen_oppfolging_status",
    upstream: "meroppfolging-backend",
  },
  MAKSDATO_FETCH: {
    event_type: RuntimeErrorEvent.MAKSDATO_FETCH_FAILED,
    operation: "fetch_maksdato",
    upstream: "sykepengedager-informasjon",
  },
  ANALYTICS_EVENT_SEND: {
    event_type: RuntimeErrorEvent.ANALYTICS_EVENT_SEND_FAILED,
    operation: "send_analytics_event",
    upstream: "nav-dekoratoren",
  },
} as const satisfies Record<
  string,
  {
    event_type: RuntimeErrorEvent;
    operation: string;
    upstream: string;
  }
>;

export type RuntimeErrorContext =
  (typeof RuntimeErrorContext)[keyof typeof RuntimeErrorContext];

export type RuntimeFetchErrorContext = (typeof RuntimeErrorContext)[
  | "SEN_OPPFOLGING_STATUS_FETCH"
  | "MAKSDATO_FETCH"];
