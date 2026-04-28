import { describe, expect, it } from "vitest";
import RadioGroupForQuestion from "@/components/FormComponents/RadioGroupForQuestion";
import { render, screen } from "@/test/testUtils";

describe("RadioGroupForQuestion", () => {
  it("should render", async () => {
    render(
      <RadioGroupForQuestion
        questionName="BEHOV_FOR_OPPFOLGING"
        description={<div>Test description</div>}
      />,
    );

    expect(
      screen.getByRole("radiogroup", {
        name: /Ønsker du å be om oppfølging\?/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "Ja, jeg ønsker å be om oppfølging",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "Nei, jeg trenger ikke oppfølging nå",
      }),
    ).toBeInTheDocument();
  });
});
