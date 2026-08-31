import { cleanup, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IkkeSvart } from "@/mocks/data/fixtures/statusDtoFixtures";
import { submitForm } from "@/server/actions/submitForm";
import { render, screen } from "@/test/testUtils";
import { StepHandler } from "./StepHandler";

const runtime = vi.hoisted(() => ({ isLocalOrDemo: false }));

vi.mock("@/constants/envs", () => ({
  get isLocalOrDemo() {
    return runtime.isLocalOrDemo;
  },
}));

vi.mock("@/libs/analytics/analytics", () => ({
  logAnalyticsEvent: vi.fn(),
  logCustomAnalyticsEvent: vi.fn(),
}));

vi.mock("@/server/actions/submitForm", () => ({
  submitForm: vi.fn(),
}));

const push = vi.fn();

describe("StepHandler", () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.clearAllMocks();
    runtime.isLocalOrDemo = false;
    vi.mocked(useRouter).mockReturnValue({
      back: vi.fn(),
      bfcacheId: "test",
      forward: vi.fn(),
      prefetch: vi.fn(),
      push,
      refresh: vi.fn(),
      replace: vi.fn(),
    });
    vi.mocked(submitForm).mockResolvedValue();
  });

  it("navigates to a receipt without putting form answers in the URL", async () => {
    const { user } = render(<StepHandler senOppfolgingStatus={IkkeSvart} />);

    await user.click(
      screen.getByRole("radio", { name: "Ingen av alternativene passer" }),
    );
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(
      screen.getByRole("radio", {
        name: "Ja, jeg ønsker å be om oppfølging",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Send inn svarene" }));

    await waitFor(() => {
      expect(push.mock.calls).toEqual([["/snart-slutt-pa-sykepengene"]]);
    });
  });

  it("shows a query-free in-memory receipt in local and demo environments", async () => {
    runtime.isLocalOrDemo = true;
    const { user } = render(<StepHandler senOppfolgingStatus={IkkeSvart} />);

    await user.click(
      screen.getByRole("radio", { name: "Ingen av alternativene passer" }),
    );
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(screen.getByRole("button", { name: "Neste" }));
    await user.click(
      screen.getByRole("radio", {
        name: "Ja, jeg ønsker å be om oppfølging",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Send inn svarene" }));

    expect(
      await screen.findByRole("heading", {
        name: "Takk, svarene dine er sendt til Nav.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ingen av alternativene passer")).toBeVisible();
    expect(screen.getByText("Ja, jeg ønsker å be om oppfølging")).toBeVisible();
    expect(push.mock.calls).toEqual([]);
  });
});
