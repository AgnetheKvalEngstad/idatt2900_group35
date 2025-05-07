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
 * @param {function} props.handleTaskCompletion - A function to handle task completion.
 *
 * @returns The rendered button group component.
 */
export default function ButtonGroup({
  currentIndex,
  topicPageCards,
  handleBack,
  handleNext,
  handleTaskCompletion,
}: {
  currentIndex: number;
  topicPageCards: string[];
  handleBack: () => void;
  handleNext: () => void;
  handleTaskCompletion: () => void;
}) {
  const isLastCard = currentIndex === topicPageCards.length - 1;
  const isSecondLastCard = currentIndex === topicPageCards.length - 2;
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
        onClick={() => {
          if (isSecondLastCard) {
            handleNext();
            handleTaskCompletion();
          } else {
            handleNext();
          }
        }}
        endIcon={<ArrowForwardIcon />}
      >
        {isLastCard
          ? "Fullfør kurs"
          : isSecondLastCard
            ? "Lever oppgave"
            : "Neste"}
      </Button>
    </Grid2>
  );
}
