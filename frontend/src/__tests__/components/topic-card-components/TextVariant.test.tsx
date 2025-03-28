import { render, screen } from "@testing-library/react";
import TextVariant from "../../../components/topic-card-variants/TextVariant";
import "@testing-library/jest-dom";

describe("TextVariant component testing", () => {
  beforeEach(() => {
    render(<TextVariant />);
  });

  it("renders the current title", () => {
    expect(screen.getByText("Eksempel på tittel")).toBeInTheDocument();
  });
});
