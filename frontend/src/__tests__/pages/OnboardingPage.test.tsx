import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OnboardingPage from "../../pages/OnboardingPage";
import { MemoryRouter } from "react-router-dom";

/**
 * OnboardingPage component testing.
 */
describe("OnboardingPage component testing", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <OnboardingPage />
      </MemoryRouter>
    );
  });
  it("should render next button", () => {
    expect(screen.getByText("Neste")).toBeInTheDocument();
  });

  it("should render back button", () => {
    expect(screen.getByText("Tilbake")).toBeInTheDocument();
  });

  it("should render title", () => {
    expect(
      screen.getByText("Velkommen til Trygg på nett!")
    ).toBeInTheDocument();
  });

  it("should render the card", () => {
    expect(screen.getByTestId("onboarding-card")).toBeInTheDocument();
  });

  it("should render the first card content", () => {
    expect(
      screen.getByText("Her kan du lære om nettsikkerhet på en morsom måte.")
    ).toBeInTheDocument();
  });

  it("should render the second card content", () => {
    const nextButton = screen.getByText("Neste");
    fireEvent.click(nextButton);
    expect(
      screen.getByText(
        "Inne i disse boksene vil du lære om et tema tilknyttet nettsikkerhet. Etter det kan du prøve å vinne premier gjennom å teste hvor mye du har lært."
      )
    ).toBeInTheDocument();
  });
});
