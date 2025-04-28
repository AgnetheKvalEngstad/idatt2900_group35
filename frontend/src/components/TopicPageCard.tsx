import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextVariant from "./variants/TextVariant";
import TrueFalseVariant from "./variants/TrueFalseVariant";
import MultipleChoiceVariant from "./variants/MultipleChoiceVariant";
import InputVariant from "./variants/InputVariant";
import CompletedVariant from "./variants/CompletedVariant";
import { ReasonAPI } from "../api/reasonAPI";
import { SubtopicAPI } from "../api/subtopicAPI";

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
}

const trueFalseQuestions = [
  { id: 1, question: "Er himmelen blå?", correctAnswer: true },
  { id: 2, question: "Er ilden kald?", correctAnswer: false },
  { id: 3, question: "Er jorden flat?", correctAnswer: false },
  { id: 4, question: "Er vann vått?", correctAnswer: true },
  { id: 5, question: "Er solen varm?", correctAnswer: true },
  { id: 6, question: "Er månen laget av ost?", correctAnswer: false },
  { id: 7, question: "Er havet salt?", correctAnswer: true },
  { id: 8, question: "Er gresset grønt?", correctAnswer: true },
  { id: 9, question: "Er vinden kald?", correctAnswer: false },
];

const multipleChoiceQuestions = [
  {
    id: 1,
    question: "Hva er hovedstaden i Frankrike?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Hva er hovedstaden i Tyskland?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Berlin",
  },
  {
    id: 3,
    question: "Hva er hovedstaden i Spania?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Madrid",
  },
];

const inputQuestions = [
  { id: 1, question: "Hva er 2 + 2?", correctAnswer: "4" },
  { id: 2, question: "Hva er 10 - 5?", correctAnswer: "5" },
  { id: 3, question: "Hva er 3 * 3?", correctAnswer: "9" },
  { id: 4, question: "Hva er 12 / 4?", correctAnswer: "3" },
  { id: 5, question: "Hva er kvadratroten av 16?", correctAnswer: "4" },
  { id: 6, question: "Hva er 5 + 7?", correctAnswer: "12" },
];

/**
 * A React component that renders a card with different content
 * based on the `variant` prop.
 *
 * @param {TopicPageCardProps} props - The props for the component.
 * @param {string} props.variant - Determines the type of content to display
 * inside the card. Possible values are "text", "trueFalse", "multipleChoice", and "input".
 * @param {ReasonAPI} props.reason - The reason object containing the reason title and content.
 * @param {SubtopicAPI} props.subtopic - The subtopic object containing the subtopic title and content.
 * @param {function} props.handleBack - A function to handle the back button click.
 * @param {object} props.selectedValues - An object containing the selected values for each question.
 * @param {object} props.isCorrect - An object containing the correctness of each question.
 * @param {function} props.updateAnswers - A function to update the selected values and correctness of questions.
 *
 * @returns A card component with the specified content variant.
 */
export default function TopicPageCard({
  variant,
  reason,
  subtopic,
  topicTitle,
  handleBack,
  selectedValues,
  isCorrect,
  updateAnswers,
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
  topicTitle: string;
  handleBack: () => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: { [key: number]: boolean | null };
  updateAnswers: (newAnswers: {
    selectedValues: { [key: number]: string | null };
    isCorrect: { [key: number]: boolean | null };
  }) => void;
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

    let correctAnswer: string | boolean | undefined;
    if (variant === "trueFalse") {
      correctAnswer = trueFalseQuestions.find(
        (q) => q.id === questionId
      )?.correctAnswer;
    } else if (variant === "multipleChoice") {
      correctAnswer = multipleChoiceQuestions.find(
        (q) => q.id === questionId
      )?.correctAnswer;
    } else if (variant === "input") {
      correctAnswer = inputQuestions.find(
        (q) => q.id === questionId
      )?.correctAnswer;
    }

    const parsedValue =
      variant === "trueFalse" ? value === "true" : value.trim();
    const newIsCorrect = {
      ...isCorrect,
      [questionId]: correctAnswer === parsedValue,
    };

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
            questions={trueFalseQuestions}
            handleButtonClick={handleButtonClick}
            selectedValues={selectedValues}
            isCorrect={isCorrect}
          />
        )}
        {variant === "multipleChoice" && (
          <MultipleChoiceVariant
            questions={multipleChoiceQuestions}
            handleButtonClick={handleButtonClick}
            handleSelectedValueChange={handleSelectedValueChange}
            selectedValues={selectedValues}
            isCorrect={isCorrect}
          />
        )}
        {variant === "input" && (
          <InputVariant
            questions={inputQuestions}
            handleButtonClick={handleButtonClick}
            handleInputChange={handleInputChange}
            selectedValues={selectedValues}
            isCorrect={isCorrect}
          />
        )}
        {variant === "completed" && (
          <CompletedVariant topicTitle={topicTitle} handleBack={handleBack} />
        )}
      </CardContent>
    </Card>
  );
}
