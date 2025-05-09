import { act, fireEvent, render, screen } from "@testing-library/react";
import TopicPageCard from "../../components/TopicPageCard";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-confetti", () => {
  return {
    default: () => <div data-testid="mock-confetti" />,
  };
});

const mockSetAchievedPoints = vi.fn();
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
const mockTask = {
  id: 1,
  title: "Task Title",
  taskContent: "Task Description",
  isDone: false,
  topicId: 1,
  taskType: "truefalse",
  questions: [
    {
      id: 1,
      questionText: "Question 1",
      correctAnswer: "true",
      options: [],
      correctOption: "null",
    },
  ],
  maximumPoints: 10,
  achievedPoints: 5,
};

const mockTopicTitle = "Topic Title";
const mockAchievedPoints = 5;

describe("TopicPageCard component testing", () => {
  it("should render the topic page card", () => {
    render(
      <TopicPageCard
        variant="reason"
        reason={mockReason}
        subtopic={mockSubtopic}
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
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
        task={mockTask}
        topicTitle={mockTopicTitle}
        updateAnswers={mockUpdateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleBack={handleBack}
        setAchievedPoints={mockSetAchievedPoints}
        achievedPoints={mockAchievedPoints}
      />
    );

    const buttons = screen.getAllByText("Ja");

    act(() => {
      fireEvent.click(buttons[0]);
    });

    expect(mockUpdateAnswers).toHaveBeenCalledWith({
      selectedValues: { 1: "true" },
      isCorrect: { 1: { isCorrect: true, isAwarded: false } },
    });
  });
});
