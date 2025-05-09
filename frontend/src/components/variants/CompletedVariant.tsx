import { Typography, Button, Grid2 } from "@mui/material";
import { useWindowSize, useTimeout } from "react-use";
import Confetti from "react-confetti";

interface CompletedVariantProps {
  topicTitle: string;
  points: number;
}
/**
 * A React component that's a variant of a topic card. Is shown when the user has completed the topic.
 *
 * @param {CompletedVariantProps} props - The props for the component.
 * @param {string} props.topicTitle - The title of the topic.
 * @param {number} props.points - The number of points the user has earned.
 * @param {function} props.handleBack - A function to handle the back button click.
 *
 * @returns The CompletedVariant component.
 */
export default function CompletedVariant({
  topicTitle,
  points,
  handleBack,
}: CompletedVariantProps & { handleBack: () => void }) {
  const { width, height } = useWindowSize();
  const [isComplete] = useTimeout(6500);
  return (
    <Grid2 className="flex flex-col items-center justify-center text-center gap-6">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={!isComplete}
      />
      <Typography variant="h2" className="pt-4">
        Hurra!
      </Typography>
      <Grid2 className="max-w-120 ">
        <Typography variant="h6">
          Du har fullført kurset <i>{topicTitle}</i>.
        </Typography>
        <Typography variant="h6">Bra jobba!</Typography>
        <Typography variant="h6">Du fikk {points} poeng!</Typography>
        <Typography variant="h6">
          Har du lyst til å prøve oppgaven en gang til, eller gå videre?
        </Typography>
      </Grid2>
      <Button variant="contained" color="secondary" onClick={handleBack}>
        Prøv oppgaven en gang til!
      </Button>
    </Grid2>
  );
}
