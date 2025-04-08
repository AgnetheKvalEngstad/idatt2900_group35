import { render, screen } from "@testing-library/react";
import TextVariant from "../../../components/topic-card-variants/TextVariant";
import "@testing-library/jest-dom";

describe("TextVariant component testing", () => {
  const mockContent = {
    title: "Eksempel på tittel",
    text: "Eksempel på tekst",
  };

  beforeEach(() => {
    render(<TextVariant content={mockContent} />);
  });

  it("renders the current title", () => {
    expect(screen.getByText("Eksempel på tittel")).toBeInTheDocument();
  });
});
