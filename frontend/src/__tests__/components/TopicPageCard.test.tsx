import { render, screen } from "@testing-library/react";
import TopicPageCard from "../../components/TopicPageCard";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const selectedValues = {};
const isCorrect = {};
const updateAnswers = () => {};

describe("TopicPageCard component testing", () => {
  it("should render the topic page card", () => {
    render(
      <TopicPageCard
        variant="text"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(screen.getByTestId("topic-page-card")).toBeInTheDocument();
  });

  it("should render the text variant", () => {
    render(
      <TopicPageCard
        variant="text"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(screen.getByText("Velkommen til et kurs!")).toBeInTheDocument();
  });

  it("should render the true/false variant", () => {
    render(
      <TopicPageCard
        variant="trueFalse"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(screen.getByText("Sant eller usant?")).toBeInTheDocument();
  });

  it("should render the multiple choice variant", () => {
    render(
      <TopicPageCard
        variant="multipleChoice"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(screen.getByText("Flervalg: Velg riktig svar")).toBeInTheDocument();
  });

  it("should render the input variant", () => {
    render(
      <TopicPageCard
        variant="input"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(
      screen.getByText("Skriv inn svaret i feltene under")
    ).toBeInTheDocument();
  });

  it("should render the completed variant", () => {
    render(
      <TopicPageCard
        variant="completed"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
    expect(screen.getByText("Hurra!")).toBeInTheDocument();
  });

  it("handleButtonClick should update selected values and isCorrect", () => {
    const mockUpdateAnswers = vi.fn();
    render(
      <TopicPageCard
        variant="trueFalse"
        updateAnswers={mockUpdateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );

    const buttons = screen.getAllByText("Sant");
    buttons[0].click();

    expect(mockUpdateAnswers).toHaveBeenCalledWith({
      selectedValues: { 1: "true" },
      isCorrect: { 1: true },
    });
  });
});
