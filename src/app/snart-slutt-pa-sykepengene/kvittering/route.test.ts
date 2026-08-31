import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

const BASE_PATH = "/syk/meroppfolging";
const RECEIPT_PATH = `${BASE_PATH}/snart-slutt-pa-sykepengene/kvittering`;
const SYNTHETIC_CANARY = "synthetic-receipt-query-canary-283aef";

describe("legacy receipt route", () => {
  it("redirects before rendering and removes query parameters", async () => {
    const response = GET(
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
