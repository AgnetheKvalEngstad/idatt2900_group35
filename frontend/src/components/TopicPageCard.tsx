import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextVariant from "./variants/TextVariant";
import TrueFalseVariant from "./variants/TrueFalseVariant";
import MultipleChoiceVariant from "./variants/MultipleChoiceVariant";
import InputVariant from "./variants/InputVariant";
import CompletedVariant from "./variants/CompletedVariant";

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
      className="w-full max-w-3xl border-1 border-black overflow-visible"
    >
      <CardContent className="p-6 h-108 ">
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
