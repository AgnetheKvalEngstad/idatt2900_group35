import { render, screen } from "@testing-library/react";
import CompletedVariant from "../../../components/variants/CompletedVariant";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const handleBack = vi.fn();

describe("CompletedVariant component testing", () => {
  const mockContent = {
    title: "Eksempel på tittel",
    text: ["Eksempel på tekst 1", "Eksempel på tekst 2"],
  };

  beforeEach(() => {
    render(<CompletedVariant content={mockContent} handleBack={handleBack} />);
  });

  it("renders the current title", () => {
    expect(screen.getByText("Eksempel på tittel")).toBeInTheDocument();
  });

  it("renders the correct number of text lines", () => {
    expect(screen.getAllByRole("heading", { level: 6 })).toHaveLength(2);
  });
});
