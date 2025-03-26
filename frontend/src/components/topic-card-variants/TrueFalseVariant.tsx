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
