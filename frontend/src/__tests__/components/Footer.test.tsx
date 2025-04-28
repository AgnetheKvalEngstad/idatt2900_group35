import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

/**
 * Tests for Footer component
 */
describe("Tests for component Footer", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it("should render Footer with a button for larger text", () => {
    const button = screen.getByText("Stor skrift");
    expect(button).toBeInTheDocument();
  });

  it("should render Footer with a button for help", () => {
    const button = screen.getByText("Hjelp");
    expect(button).toBeInTheDocument();
  });

  it("should render Footer with a button to skip onboarding", () => {
    const button = screen.getByText("Hopp over");
    expect(button).toBeInTheDocument();
  });

  it("clicking help button should open help dialog", () => {
    const button = screen.getByText("Hjelp");
    userEvent.click(button);
    const dialog = screen.getByText(
      "Her kan du lære om nettsikkerhet på en morsom måte. Du kan velge hvilke temaer du ønsker å lære mer om ved å trykke på en av temaboksene."
    );
    expect(dialog).toBeInTheDocument();
  });

  it("clicking text size button should open text size dialog", () => {
    const button = screen.getByText("Stor skrift");
    userEvent.click(button);
    const dialog = screen.getByText("Hvordan få større skrift");
    expect(dialog).toBeInTheDocument();
  });
});
