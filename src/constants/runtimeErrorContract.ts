export const RuntimeErrorEvent = {
  SEN_OPPFOLGING_SVAR_SUBMIT_FAILED: "sen_oppfolging_svar_submit_failed",
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
  ANALYTICS_CLIENT_ERROR: "ANALYTICS_CLIENT_ERROR",
} as const;

export type RuntimeErrorCode =
  (typeof RuntimeErrorCode)[keyof typeof RuntimeErrorCode];
