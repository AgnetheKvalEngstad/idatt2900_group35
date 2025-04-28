import { render, screen } from "@testing-library/react";
import CompletedVariant from "../../../components/variants/CompletedVariant";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const handleBack = vi.fn();

describe("CompletedVariant component testing", () => {
  const mockTopicTitle = "Eksempel på tittel";

  beforeEach(() => {
    render(
      <CompletedVariant topicTitle={mockTopicTitle} handleBack={handleBack} />
    );
  });

  it("renders the current topic title", () => {
    expect(screen.getByText("Eksempel på tittel")).toBeInTheDocument();
  });

  it("renders try again button", () => {
    expect(
      screen.getByRole("button", { name: "Prøv oppgaven en gang til!" })
    ).toBeInTheDocument();
  });

  it("calls handleBack when button is clicked", () => {
    const button = screen.getByRole("button", {
      name: "Prøv oppgaven en gang til!",
    });
    button.click();
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it("renders the correct heading", () => {
    expect(screen.getByRole("heading", { name: "Hurra!" })).toBeInTheDocument();
  });
});
