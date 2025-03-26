import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
} from "@mui/material";

interface QuestionMultipleChoice {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface MultipleChoiceVariantProps {
  questions: QuestionMultipleChoice[];
}

export default function MultipleChoiceVariant({
  questions,
}: MultipleChoiceVariantProps) {
  return (
    <>
      <Typography variant="h5" className="pt-2">
        Velg riktig svar
      </Typography>
      <Grid2 container spacing={1}>
        {questions.map((q, index) => (
          <Grid2 key={index} size={4}>
            <Typography className="pt-2">{q.question}</Typography>
            <RadioGroup>
              {q.options.map((option: string, i: number) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
