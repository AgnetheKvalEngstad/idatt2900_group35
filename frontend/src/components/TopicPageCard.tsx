import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextVariant from "./topic-card-variants/TextVariant";
import TrueFalseVariant from "./topic-card-variants/TrueFalseVariant";
import MultipleChoiceVariant from "./topic-card-variants/MultipleChoiceVariant";
import InputVariant from "./topic-card-variants/InputVariant";

interface TopicPageCardProps {
  variant: "text" | "trueFalse" | "multipleChoice" | "input";
}

const trueFalseQuestions = [
  { id: 1, question: "Is the sky blue?", correctAnswer: true },
  { id: 2, question: "Is fire cold?", correctAnswer: false },
  { id: 3, question: "Is the earth flat?", correctAnswer: false },
  { id: 4, question: "Is water wet?", correctAnswer: true },
  { id: 5, question: "Is the sun hot?", correctAnswer: true },
  { id: 6, question: "Is the moon made of cheese?", correctAnswer: false },
  { id: 7, question: "Is the ocean salty?", correctAnswer: true },
  { id: 8, question: "Is the grass green?", correctAnswer: true },
  { id: 9, question: "Is the wind cold?", correctAnswer: false },
];

const multipleChoiceQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What is the capital of Germany?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Berlin",
  },
  {
    id: 3,
    question: "What is the capital of Spain?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Madrid",
  },
];

const inputQuestions = [
  { id: 1, question: "What is 2 + 2?", correctAnswer: "4" },
  { id: 2, question: "What is 10 - 5?", correctAnswer: "5" },
  { id: 3, question: "What is 3 * 3?", correctAnswer: "9" },
];

/**
 * A React component that renders a card with different content
 * based on the `variant` prop.
 *
 * @param {TopicPageCardProps} props - The props for the component.
 * @param {string} props.variant - Determines the type of content to display
 * inside the card. Possible values are "text", "trueFalse", "multipleChoice", and "input".
 *
 * @returns A card component with the specified content variant.
 */
export default function TopicPageCard({ variant }: TopicPageCardProps) {
  const [selectedValues, setSelectedValues] = useState<{
    [key: number]: string | null;
  }>({});
  const [isCorrect, setIsCorrect] = useState<{
    [key: number]: boolean | null;
  }>({});

  const handleInputChange = (questionId: number, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleButtonClick = (questionId: number, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));

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

    setIsCorrect((prev) => ({
      ...prev,
      [questionId]: correctAnswer === parsedValue,
    }));
  };

  return (
    <Card
      data-testid="topic-page-card"
      className="relative w-full max-w-3xl overflow-auto border-1 border-black"
    >
      <CardContent className="p-6 h-108 overflow-y-auto">
        {variant === "text" && <TextVariant />}
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
      </CardContent>
    </Card>
  );
}
