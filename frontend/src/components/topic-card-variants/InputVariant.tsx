import { Typography, TextField, Button, Grid2 } from "@mui/material";

interface QuestionInput {
  id: number;
  question: string;
  correctAnswer: string;
}

interface InputVariantProps {
  questions: QuestionInput[];
  handleButtonClick: (questionId: number, value: string) => void;
  handleInputChange: (questionId: number, value: string) => void;
  selectedValues: { [key: number]: string | null };
  isCorrect: { [key: number]: boolean | null };
}

/**
 * A React component that renders a list of input fields for answering questions.
 * Each question is displayed with a corresponding text field and a button to check the answer.
 *
 * @param {InputVariantProps} props The props for the component.
 * @param {Array<{ question: string }>} props.questions An array of questions.
 * @param {function} props.handleButtonClick A function to handle button clicks.
 * @param {function} props.handleInputChange A function to handle input changes.
 * @param {Object} props.selectedValues An object containing the current input values for each question.
 * @param {Object} props.isCorrect An object indicating whether the answers are correct for each question.
 *
 * @returns A Material-UI Grid2 layout containing the questions, input fields, and buttons.
 */
export default function InputVariant({
  questions,
  handleButtonClick,
  handleInputChange,
  selectedValues,
  isCorrect,
}: InputVariantProps) {
  return (
    <Grid2 container spacing={1}>
      <Typography variant="h5" className="pt-2 w-full">
        Skriv inn svaret i feltene under
      </Typography>
      {questions.map((q) => (
        <Grid2 key={q.id} size={6} className="flex flex-col gap-1">
          <Grid2 className="flex flex-row">
            <Typography className="p-2">{q.question}</Typography>
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
          <Grid2 className="flex flex-row items-center gap-2">
            <TextField
              label="Svar her"
              variant="outlined"
              value={selectedValues[q.id] || ""}
              className="w-40 pr-8"
              onChange={(e) => handleInputChange(q.id, e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleButtonClick(q.id, selectedValues[q.id] || "")
              }
            >
              Sjekk svar
            </Button>
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  );
}
