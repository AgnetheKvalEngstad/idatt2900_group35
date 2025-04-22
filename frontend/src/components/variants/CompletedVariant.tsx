import { Typography, Button, Grid2 } from "@mui/material";

interface CompletedVariantProps {
  content: { title: string; text: string[] };
}
/**
 * A React component that's a variant of a topic card. Is shown when the user has completed the topic.
 *
 * @param {CompletedVariantProps} props - The props for the component.
 * @param {{ title: string; text: string[] }} props.content - The content to display in the card.
 * @param {string} props.content.title - The title of the card.
 * @param {string[]} props.content.text - An array of text lines to display below the title.
 *
 * @returns The CompletedVariant component.
 */
export default function CompletedVariant({
  content,
  handleBack,
}: CompletedVariantProps & { handleBack: () => void }) {
  const textLines: Array<React.ReactNode> = Array(content.text.length)
    .fill(null)
    .map((_, index) => (
      <Typography key={index} variant="h6">
        {content.text[index]}
      </Typography>
    ));

  return (
    <Grid2 className="flex flex-col items-center justify-center text-center gap-6">
      <Typography variant="h2" className="pt-4">
        {content.title}
      </Typography>
      <Grid2 className="max-w-120 ">{textLines}</Grid2>
      <Button variant="contained" color="secondary" onClick={handleBack}>
        Prøv oppgaven en gang til!
      </Button>
    </Grid2>
  );
}
