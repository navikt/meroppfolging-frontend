import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

const BASE_PATH = "/syk/meroppfolging";
const RECEIPT_PATH = `${BASE_PATH}/snart-slutt-pa-sykepengene/kvittering`;
const SYNTHETIC_CANARY = "synthetic-receipt-query-canary-283aef";

describe("proxy", () => {
  it("matches the legacy receipt route with the configured base path", () => {
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig: { basePath: BASE_PATH },
        url: RECEIPT_PATH,
      }),
    ).toBe(true);
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig: { basePath: BASE_PATH },
        url: `${BASE_PATH}/snart-slutt-pa-sykepengene`,
      }),
    ).toBe(false);
  });

  it("redirects before rendering and removes query parameters", async () => {
    const response = proxy(
      new NextRequest(
        `https://www.nav.no${RECEIPT_PATH}?fremtidigSituasjon=${SYNTHETIC_CANARY}&behovForOppfolging=${SYNTHETIC_CANARY}`,
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      `https://www.nav.no${BASE_PATH}/snart-slutt-pa-sykepengene`,
    );
    expect([...response.headers]).not.toContainEqual(
      expect.arrayContaining([expect.stringContaining(SYNTHETIC_CANARY)]),
    );
    expect(await response.text()).not.toContain(SYNTHETIC_CANARY);
  });
});
