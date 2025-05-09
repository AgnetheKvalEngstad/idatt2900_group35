import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
  Button,
} from "@mui/material";

interface QuestionMultipleChoice {
  id: number;
  questionText: string;
  correctAnswer: string;
  options: string[];
  correctOption: string;
}

interface MultipleChoiceVariantProps {
  questions: QuestionMultipleChoice[];
  handleButtonClick: (questionId: number, value: string) => void;
  handleSelectedValueChange: (questionId: number, value: string | null) => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: { [key: number]: boolean | null };
}

/**
 * A React component that renders a multiple-choice question variant.
 * Displays a list of questions with a set of options.
 *
 * @param {MultipleChoiceVariantProps} props The props for the component.
 * @param {Array<{ question: string, options: string[] }>} props.questions An array of question objects.
 * @param {function} props.handleButtonClick A function to handle button clicks.
 * @param {function} props.handleSelectedValueChange A function to handle changes in selected values.
 * @param {Object} props.selectedValues An object containing the selected values for each question.
 * @param {Object} props.isCorrect An object containing the correctness of each question's answer.
 *
 * @returns The rendered multiple-choice question variant component.
 */
export default function MultipleChoiceVariant({
  questions,
  handleButtonClick,
  handleSelectedValueChange,
  selectedValues,
  isCorrect,
}: MultipleChoiceVariantProps) {
  return (
    <>
      <Typography variant="h5" className="pt-2">
        Flervalg: Velg riktig svar
      </Typography>
      <Grid2 container spacing={1}>
        {questions.map((q) => (
          <Grid2 key={q.id} size={{ xs: 10, sm: 8, md: 6, lg: 6 }}>
            <Grid2 className="flex flex-row gap-2">
              <Typography className="pt-2">{q.questionText}</Typography>
              {isCorrect[q.id] !== undefined && (
                <Typography
                  className={`pt-2 ${
                    isCorrect[q.id] ? "text-[#006B2B]" : "text-[#C3040E]"
                  }`}
                >
                  {isCorrect[q.id] ? "Riktig!" : "Feil"}
                </Typography>
              )}
            </Grid2>
            <RadioGroup
              value={selectedValues[q.id] || ""}
              onChange={(e) => {
                handleSelectedValueChange(q.id, e.target.value);
              }}
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

            <Button
              variant="contained"
              className="mt-2"
              onClick={() =>
                handleButtonClick(q.id, selectedValues[q.id] || "")
              }
            >
              Sjekk svar
            </Button>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
