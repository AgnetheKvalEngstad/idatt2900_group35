import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextVariant from "./variants/TextVariant";
import TrueFalseVariant from "./variants/TrueFalseVariant";
import MultipleChoiceVariant from "./variants/MultipleChoiceVariant";
import InputVariant from "./variants/InputVariant";
import CompletedVariant from "./variants/CompletedVariant";
import { ReasonAPI } from "../api/reasonAPI";
import { SubtopicAPI } from "../api/subtopicAPI";
import { TaskAPI } from "../api/taskAPI";

/**
 * Represents the properties for the TopicPageCard component.
 *
 * @interface TopicPageCardProps
 * @property {string} variant - The variant of the card, which determines the type of content to display.
 */
export interface TopicPageCardProps {
  variant:
    | "reason"
    | "subtopic"
    | "completed"
    | "trueFalse"
    | "multipleChoice"
    | "input";
  setAchievedPoints: (points: number) => void;
  achievedPoints: number;
}

/**
 * A React component that renders a card with different content
 * based on the `variant` prop.
 *
 * @param {TopicPageCardProps} props - The props for the component.
 * @param {string} props.variant - Determines the type of content to display
 * inside the card. Possible values are "text", "trueFalse", "multipleChoice", and "input".
 * @param {ReasonAPI} props.reason - The reason object containing the reason title and content.
 * @param {SubtopicAPI} props.subtopic - The subtopic object containing the subtopic title and content.
 * @param {TaskAPI} props.task - The task object containing the questions and answers.
 * @param {string} props.topicTitle - The title of the topic.
 * @param {function} props.handleBack - A function to handle the back button click.
 * @param {object} props.selectedValues - An object containing the selected values for each question.
 * @param {object} props.isCorrect - An object containing the correctness of each question.
 * @param {function} props.updateAnswers - A function to update the selected values and correctness of questions.
 * @param {function} props.setAchievedPoints - A function to set the achieved points for the task.
 * @param {number} props.achievedPoints - The current achieved points for the task.
 *
 *
 * @returns A card component with the specified content variant.
 */
export default function TopicPageCard({
  variant,
  reason,
  subtopic,
  task,
  topicTitle,
  handleBack,
  selectedValues,
  isCorrect,
  updateAnswers,
  setAchievedPoints,
  achievedPoints,
}: TopicPageCardProps & {
  variant:
    | "reason"
    | "subtopic"
    | "completed"
    | "trueFalse"
    | "multipleChoice"
    | "input";
  reason: ReasonAPI;
  subtopic: SubtopicAPI;
  task: TaskAPI;
  topicTitle: string;
  handleBack: () => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: {
    [key: number]: { isCorrect: boolean; isAwarded: boolean } | null;
  };
  updateAnswers: (newAnswers: {
    selectedValues: { [key: number]: string | null };
    isCorrect: {
      [key: number]: { isCorrect: boolean; isAwarded: boolean } | null;
    };
  }) => void;
  setAchievedPoints: (points: number) => void;
}) {
  const handleInputChange = (questionId: number, value: string) => {
    const newSelectedValues = { ...selectedValues, [questionId]: value };
    updateAnswers({
      selectedValues: newSelectedValues,
      isCorrect,
    });
  };

  const handleSelectedValueChange = (
    questionId: number,
    value: string | null
  ) => {
    const newSelectedValues = { ...selectedValues, [questionId]: value };
    updateAnswers({
      selectedValues: newSelectedValues,
      isCorrect,
    });
  };

  const handleButtonClick = (questionId: number, value: string) => {
    const newSelectedValues = { ...selectedValues, [questionId]: value };

    const question = task.questions.find((q) => q.id === questionId);
    if (!question) return;

    const correctAnswer =
      variant === "multipleChoice"
        ? question.correctOption.trim().toLowerCase()
        : question.correctAnswer.trim().toLowerCase();

    const parsedValue = value.trim().toLowerCase();
    const isAnswerCorrect = correctAnswer === parsedValue;
    const currentIsCorrect = isCorrect[questionId] || {
      isCorrect: false,
      isAwarded: false,
    };

    const newIsCorrect = {
      ...isCorrect,
      [questionId]: {
        isCorrect: isAnswerCorrect,
        isAwarded: currentIsCorrect.isAwarded,
      },
    };

    const questionPoints = task.maximumPoints / task.questions.length;

    if (isAnswerCorrect && !currentIsCorrect.isAwarded) {
      const newPoints = achievedPoints + questionPoints;
      setAchievedPoints(
        newPoints > task.maximumPoints ? task.maximumPoints : newPoints
      );
    }

    updateAnswers({
      selectedValues: newSelectedValues,
      isCorrect: newIsCorrect,
    });
  };

  return (
    <Card
      data-testid="topic-page-card"
      className="w-full max-w-3xl border-1 border-black"
    >
      <CardContent className="p-6 min-h-100">
        {variant === "reason" && (
          <TextVariant
            content={{
              title: reason?.reasonTitle || "Ingen tittel",
              text: reason?.reasonContent || "Ingen innhold",
            }}
          />
        )}
        {variant === "subtopic" && (
          <TextVariant
            content={{
              title: subtopic.title,
              text: subtopic.subtopicContent,
            }}
          />
        )}

        {variant === "trueFalse" && (
          <TrueFalseVariant
            questions={task.questions}
            handleButtonClick={handleButtonClick}
            selectedValues={selectedValues}
            isCorrect={Object.fromEntries(
              Object.entries(isCorrect).map(([key, value]) => [
                key,
                value?.isCorrect ?? null,
              ])
            )}
          />
        )}
        {variant === "multipleChoice" && (
          <MultipleChoiceVariant
            questions={task.questions}
            handleButtonClick={handleButtonClick}
            handleSelectedValueChange={handleSelectedValueChange}
            selectedValues={selectedValues}
            isCorrect={Object.fromEntries(
              Object.entries(isCorrect).map(([key, value]) => [
                key,
                value?.isCorrect ?? null,
              ])
            )}
          />
        )}
        {variant === "input" && (
          <InputVariant
            questions={task.questions}
            handleButtonClick={handleButtonClick}
            handleInputChange={handleInputChange}
            selectedValues={selectedValues}
            isCorrect={Object.fromEntries(
              Object.entries(isCorrect).map(([key, value]) => [
                key,
                value?.isCorrect ?? null,
              ])
            )}
          />
        )}
        {variant === "completed" && (
          <CompletedVariant
            topicTitle={topicTitle}
            handleBack={handleBack}
            points={achievedPoints}
          />
        )}
      </CardContent>
    </Card>
  );
}
