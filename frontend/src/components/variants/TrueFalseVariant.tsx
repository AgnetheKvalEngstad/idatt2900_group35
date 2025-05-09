import { Typography, Button, ButtonGroup, Grid2 } from "@mui/material";

interface QuestionTrueFalse {
  id: number;
  questionText: string;
  correctAnswer: string;
  options: string[];
  correctOption: string;
}

interface TrueFalseVariantProps {
  questions: QuestionTrueFalse[];
  handleButtonClick: (questionId: number, value: string) => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: { [key: number]: boolean | null };
}

/**
 * A React component that renders a "True or False" question variant.
 *
 * @param {TrueFalseVariantProps} props The props for the component.
 * @param {Array<{ question: string }>} props.questions An array of questions.
 * @param {function} props.handleButtonClick A function to handle button clicks.
 * @param {Object} props.selectedValues An object containing the current selected values for each question.
 * @param {Object} props.isCorrect An object indicating whether the answers are correct for each question.
 *
 * @returns The rendered "True or False" question variant component.
 */
export default function TrueFalseVariant({
  questions,
  handleButtonClick,
  selectedValues,
  isCorrect,
}: TrueFalseVariantProps) {
  return (
    <>
      <Typography variant="h5" className="pt-2">
        Sant eller usant?
      </Typography>
      <Grid2 container spacing={1} className="flex w-full h-full">
        {questions.map((q) => (
          <Grid2
            key={q.id}
            size={{ xs: 10, sm: 8, md: 6, lg: 6 }}
            className="flex flex-col gap-2"
          >
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

            <Grid2 className="flex flex-row gap-1">
              <ButtonGroup>
                <Button
                  variant={
                    selectedValues[q.id] === "true" ? "contained" : "outlined"
                  }
                  onClick={() => handleButtonClick(q.id, "true")}
                  role="true"
                >
                  Ja
                </Button>
                <Button
                  variant={
                    selectedValues[q.id] === "false" ? "contained" : "outlined"
                  }
                  onClick={() => handleButtonClick(q.id, "false")}
                  role="false"
                >
                  Nei
                </Button>
              </ButtonGroup>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
