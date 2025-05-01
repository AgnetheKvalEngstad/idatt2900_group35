import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGroup from "../../components/ButtonGroup";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("ButtonGroup Component", () => {
  const mockHandleBack = vi.fn();
  const mockHandleNext = vi.fn();
  const mockHandleTaskCompletion = vi.fn();
  const topicPageCards = ["Card1", "Card2", "Card3", "Card4"];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the back and next buttons", () => {
    render(
      <ButtonGroup
        currentIndex={1}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    expect(screen.getByText("Tilbake")).toBeInTheDocument();
    expect(screen.getByText("Neste")).toBeInTheDocument();
  });

  it("disables the back button when currentIndex is 0", () => {
    render(
      <ButtonGroup
        currentIndex={0}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    const backButton = screen.getByText("Tilbake");
    expect(backButton).toBeDisabled();
  });

  it("displays 'Fullfør kurs' when on the last card", () => {
    render(
      <ButtonGroup
        currentIndex={topicPageCards.length - 1}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    expect(screen.getByText("Fullfør kurs")).toBeInTheDocument();
  });

  it("displays 'Lever oppgave' when on the second-to-last card", () => {
    render(
      <ButtonGroup
        currentIndex={topicPageCards.length - 2}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    expect(screen.getByText("Lever oppgave")).toBeInTheDocument();
  });

  it("calls handleBack when the back button is clicked", () => {
    render(
      <ButtonGroup
        currentIndex={1}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    const backButton = screen.getByText("Tilbake");
    fireEvent.click(backButton);
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
  });

  it("calls handleNext when the next button is clicked", () => {
    render(
      <ButtonGroup
        currentIndex={1}
        topicPageCards={topicPageCards}
        handleBack={mockHandleBack}
        handleNext={mockHandleNext}
        handleTaskCompletion={mockHandleTaskCompletion}
      />
    );

    const nextButton = screen.getByText("Neste");
    fireEvent.click(nextButton);
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });
});
