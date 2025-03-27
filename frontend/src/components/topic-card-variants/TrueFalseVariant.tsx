import { Typography, Button, ButtonGroup, Grid2 } from "@mui/material";

interface QuestionTrueFalse {
  question: string;
  correctAnswer: boolean;
}

interface TrueFalseVariantProps {
  questions: QuestionTrueFalse[];
  handleButtonClick: (value: string) => void;
  selectedValue: string | null;
}

/**
 * A React component that renders a "True or False" question variant.
 *
 * @param {TrueFalseVariantProps} props The props for the component.
 * @param {Array<{ question: string }>} props.questions An array of question objects, each containing a `question` string.
 * @param {(value: string) => void} props.handleButtonClick A callback function triggered when a button is clicked, receiving the selected value ("true" or "false").
 * @param {string} props.selectedValue The currently selected value, either "true" or "false".
 *
 * @returns The rendered "True or False" question variant component.
 */
export default function TrueFalseVariant({
  questions,
  handleButtonClick,
  selectedValue,
}: TrueFalseVariantProps) {
  return (
    <>
      <Typography variant="h5" className="pt-2">
        Sant eller usant?
      </Typography>
      <Grid2 container spacing={1}>
        {questions.map((q, index) => (
          <Grid2 key={index} size={4}>
            <Typography className="pt-2">{q.question}</Typography>
            <ButtonGroup>
              <Button
                variant={selectedValue === "true" ? "contained" : "outlined"}
                onClick={() => handleButtonClick("true")}
              >
                Sant
              </Button>
              <Button
                variant={selectedValue === "false" ? "contained" : "outlined"}
                onClick={() => handleButtonClick("false")}
              >
                Usant
              </Button>
            </ButtonGroup>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
