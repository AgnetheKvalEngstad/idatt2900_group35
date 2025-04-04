import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextVariant from "./topic-card-variants/TextVariant";
import TrueFalseVariant from "./topic-card-variants/TrueFalseVariant";
import MultipleChoiceVariant from "./topic-card-variants/MultipleChoiceVariant";
import InputVariant from "./topic-card-variants/InputVariant";
import CompletedVariant from "./topic-card-variants/CompletedVariant";

interface TopicPageCardProps {
  variant:
    | "text"
    | "text2"
    | "completed"
    | "trueFalse"
    | "multipleChoice"
    | "input";
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

const textContent = {
  title: "Velkommen til et kurs!",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore\
   et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\
     fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\
    mollit anim id est laborum.",
};
const textContent2 = {
  title: "Velkommen til et kurs! 2",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore\
  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip\
   ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu\
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\
   mollit anim id est laborum.",
};

const completedContent = {
  title: "Hurra!",
  text: [
    "Du har fullført oppgaveseksjonen om test tema.",
    "Bra jobba! ",
    "Du fikk xxx mynter! ",
    "Har du lyst til å prøve oppgaven en gang til, eller gå videre til neste tema?",
  ],
};

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
export default function TopicPageCard({
  variant,
  selectedValues,
  isCorrect,
  updateAnswers,
}: TopicPageCardProps & {
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
      className="relative w-full max-w-3xl overflow-auto border-1 border-black"
    >
      <CardContent className="p-6 h-108 overflow-y-auto">
        {variant === "text" && <TextVariant content={textContent} />}
        {variant === "text2" && <TextVariant content={textContent2} />}

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
        {variant === "completed" && (
          <CompletedVariant content={completedContent} />
        )}
      </CardContent>
    </Card>
  );
}
