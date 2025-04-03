import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
} from "@mui/material";

interface QuestionMultipleChoice {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface MultipleChoiceVariantProps {
  questions: QuestionMultipleChoice[];
  handleButtonClick: (questionId: number, value: string) => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: { [key: number]: boolean | null };
}

/**
 * A React component that renders a multiple-choice question variant.
 * Displays a list of questions with a set of options.
 *
 * @param {MultipleChoiceVariantProps} props The props for the component.
 * @param {Array<{ question: string, options: string[] }>} props.questions
 * An array of question objects, where each object contains a `question` string
 * and an `options` array of possible answers.
 *
 * @returns The rendered multiple-choice question variant component.
 */
export default function MultipleChoiceVariant({
  questions,
  handleButtonClick,
  selectedValues,
  isCorrect,
}: MultipleChoiceVariantProps) {
  return (
    <>
      <Typography variant="h5" className="pt-2">
        Velg riktig svar
      </Typography>
      <Grid2 container spacing={1}>
        {questions.map((q) => (
          <Grid2 key={q.id} size={4}>
            <Typography className="pt-2">{q.question}</Typography>
            <RadioGroup
              value={selectedValues[q.id] || ""}
              onChange={(e) => handleButtonClick(q.id, e.target.value)}
            >
              {q.options.map((option: string, i: number) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {isCorrect[q.id] !== undefined && (
              <Typography
                variant="body2"
                className="pt-2"
                color={isCorrect[q.id] ? "green" : "red"}
              >
                {isCorrect[q.id] ? "Riktig!" : "Feil"}
              </Typography>
            )}
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
