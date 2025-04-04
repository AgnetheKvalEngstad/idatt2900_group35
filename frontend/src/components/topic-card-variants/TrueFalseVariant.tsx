import { Typography, Button, ButtonGroup, Grid2 } from "@mui/material";

interface TrueFalseVariantProps {
  questions: { id: number; question: string; correctAnswer: boolean }[];
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
      <Grid2 container spacing={1}>
        {questions.map((q) => (
          <Grid2 key={q.id} size={4}>
            <Typography className="pt-2">{q.question}</Typography>
            <ButtonGroup>
              <Button
                variant={
                  selectedValues[q.id] === "true" ? "contained" : "outlined"
                }
                onClick={() => handleButtonClick(q.id, "true")}
                role="true"
              >
                Sant
              </Button>
              <Button
                variant={
                  selectedValues[q.id] === "false" ? "contained" : "outlined"
                }
                onClick={() => handleButtonClick(q.id, "false")}
                role="false"
              >
                Usant
              </Button>
            </ButtonGroup>
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
