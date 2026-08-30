import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Page from "./page";

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: vi.fn(),
}));

describe("legacy receipt route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to the query-free receipt source", () => {
    Page();

    expect(vi.mocked(redirect).mock.calls).toEqual([
      ["/snart-slutt-pa-sykepengene"],
    ]);
  });
});
