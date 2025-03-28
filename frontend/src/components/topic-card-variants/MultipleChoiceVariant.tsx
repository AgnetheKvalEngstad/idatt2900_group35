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
