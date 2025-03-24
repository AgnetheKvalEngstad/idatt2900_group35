import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";
import "@testing-library/jest-dom";

/**
 * Tests for Footer component
 */
describe("Tests for component Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("should render Footer with a button for larger text", () => {
    const button = screen.getByText("Stor skrift");
    expect(button).toBeInTheDocument();
  });

  it("should render Footer with a button for help", () => {
    const button = screen.getByText("Hjelp");
    expect(button).toBeInTheDocument();
  });
});
