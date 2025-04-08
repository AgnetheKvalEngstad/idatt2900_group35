import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopicPage from "../../pages/TopicPage";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";

describe("TopicPage component testing", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TopicPage />
      </MemoryRouter>
    );
  });
  it("should render next button", () => {
    expect(screen.getByText("Neste")).toBeInTheDocument();
  });

  it("should render back button", () => {
    expect(screen.getByText("Tilbake")).toBeInTheDocument();
  });

  it("back button should be disabled on first card", () => {
    expect(screen.getByText("Tilbake")).toBeDisabled();
  });

  it("should render next button", () => {
    expect(screen.getByText("Neste")).toBeInTheDocument();
  });

  it("clicking next button should enable back button", () => {
    const nextButton = screen.getByText("Neste");
    fireEvent.click(nextButton);
    expect(screen.getByText("Tilbake")).not.toBeDisabled();
  });

  it("clicking three times should lead to completed page", () => {
    const nextButton = screen.getByText("Neste");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText("Hurra!")).toBeInTheDocument();
  });

  it("clicking back button should go back to previous card", () => {
    const nextButton = screen.getByText("Neste");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const backButton = screen.getByText("Tilbake");
    fireEvent.click(backButton);
    expect(screen.getByText("Lever oppgave")).toBeInTheDocument();
  });
});
