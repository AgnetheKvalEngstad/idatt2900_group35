import { Typography, TextField, Button, Grid2 } from "@mui/material";

interface QuestionInput {
  question: string;
  correctAnswer: string;
}

interface InputVariantProps {
  questions: QuestionInput[];
}

/**
 * A React component that renders a list of input fields for answering questions.
 * Each question is displayed with a corresponding text field and a button to check the answer.
 *
 * @param {InputVariantProps} props The props for the component.
 * @param {Array<{ question: string }>} props.questions An array of question objects,
 * each containing a `question` string to be displayed.
 *
 * @returns A Material-UI Grid2 layout containing the questions, input fields, and buttons.
 */
export default function InputVariant({ questions }: InputVariantProps) {
  return (
    <Grid2 container spacing={1}>
      <Typography variant="h5" className="pt-2">
        Skriv inn svaret i feltene under
      </Typography>
      {questions.map((q, index) => (
        <Grid2 key={index} size={16} spacing={1}>
          <Typography className="pt-2">{q.question}</Typography>
          <TextField
            label="Svar her"
            variant="outlined"
            className="w-lg pr-8"
          />
          <Button variant="contained" color="primary">
            Sjekk svar
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
}
