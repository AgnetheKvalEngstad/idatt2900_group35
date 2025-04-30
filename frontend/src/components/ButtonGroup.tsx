import { Button, Grid2 } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 * A React component that renders a button group for navigating between cards.
 *
 * @param {object} props - The props object.
 * @param {number} props.currentIndex - The current index of the card being displayed.
 * @param {string[]} props.topicPageCards - An array of card identifiers.
 * @param {function} props.handleBack - A function to handle the back button click.
 * @param {function} props.handleNext - A function to handle the next button click.
 *
 * @returns The rendered button group component.
 */
export default function ButtonGroup({
  currentIndex,
  topicPageCards,
  handleBack,
  handleNext,
}: {
  currentIndex: number;
  topicPageCards: string[];
  handleBack: () => void;
  handleNext: () => void;
}) {
  return (
    <Grid2 className="flex flex-row w-full max-w-3xl justify-between p-2">
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        disabled={currentIndex === 0}
      >
        Tilbake
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleNext}
        endIcon={<ArrowForwardIcon />}
      >
        {currentIndex === topicPageCards.length - 1
          ? "Fullfør kurs"
          : currentIndex === topicPageCards.length - 2
            ? "Lever oppgave"
            : "Neste"}
      </Button>
    </Grid2>
  );
}
