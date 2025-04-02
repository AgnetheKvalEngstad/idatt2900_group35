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
  { id: 10, question: "Is the snow black?", correctAnswer: false },
  { id: 11, question: "Is the snow white?", correctAnswer: true },
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
  {
    id: 4,
    question: "What is the capital of England?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "London",
  },
  {
    id: 5,
    question: "What is the capital of Norway?",
    options: ["Oslo", "Bergen", "Stavanger", "Trondheim"],
    correctAnswer: "Oslo",
  },
  {
    id: 6,
    question: "What is the capital of Sweden?",
    options: ["Oslo", "Stockholm", "Copenhagen", "Helsinki"],
    correctAnswer: "Stockholm",
  },
];

const inputQuestions = [
  { id: 1, question: "What is 2 + 2?", correctAnswer: "4" },
  { id: 2, question: "What is 10 - 5?", correctAnswer: "5" },
  { id: 3, question: "What is 3 * 3?", correctAnswer: "9" },
  { id: 4, question: "What is 8 / 2?", correctAnswer: "4" },
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

  const handleButtonClick = (questionId: number, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [questionId]: value,
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
          />
        )}
        {variant === "multipleChoice" && (
          <MultipleChoiceVariant questions={multipleChoiceQuestions} />
        )}
        {variant === "input" && <InputVariant questions={inputQuestions} />}
      </CardContent>
    </Card>
  );
}
