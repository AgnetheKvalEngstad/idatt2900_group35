import { render, screen } from "@testing-library/react";
import TopicPageCard from "../../components/TopicPageCard";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const selectedValues = {};
const isCorrect = {};
const updateAnswers = () => {};
const handleBack = vi.fn();

const mockReason = {
  id: 1,
  reasonTitle: "Reason Title",
  reasonContent: "Reason Description",
  isRead: false,
  topicId: 1,
};
const mockSubtopic = {
  id: 1,
  title: "Subtopic Title",
  subtopicContent: "Subtopic Description",
  isRead: false,
  topicId: 1,
};

describe("TopicPageCard component testing", () => {
  it("should render the topic page card", () => {
    render(
      <TopicPageCard
        variant="reason"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
      />
    );
    expect(screen.getByText("Reason Title")).toBeInTheDocument();
  });

  it("should render the text variant", () => {
    render(
      <TopicPageCard
        variant="subtopic"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
      />
    );
    expect(screen.getByText("Subtopic Title")).toBeInTheDocument();
  });

  it("should render the true/false variant", () => {
    render(
      <TopicPageCard
        variant="trueFalse"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
      />
    );
    expect(screen.getByText("Sant eller usant?")).toBeInTheDocument();
  });

  it("should render the multiple choice variant", () => {
    render(
      <TopicPageCard
        variant="multipleChoice"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
      />
    );
    expect(screen.getByText("Flervalg: Velg riktig svar")).toBeInTheDocument();
  });

  it("should render the input variant", () => {
    render(
      <TopicPageCard
        variant="input"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
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
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
      />
    );
    expect(screen.getByText("Hurra!")).toBeInTheDocument();
  });

  it("handleButtonClick should update selected values and isCorrect", () => {
    const mockUpdateAnswers = vi.fn();
    render(
      <TopicPageCard
        variant="trueFalse"
        reason={mockReason}
        subtopic={mockSubtopic}
        updateAnswers={mockUpdateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
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
