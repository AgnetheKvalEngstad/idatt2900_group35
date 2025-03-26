import { Typography, TextField, Button, Grid2 } from "@mui/material";

interface QuestionInput {
  question: string;
  correctAnswer: string;
}

interface InputVariantProps {
  questions: QuestionInput[];
}

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
