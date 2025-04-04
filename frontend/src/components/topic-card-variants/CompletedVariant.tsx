import { Typography, Button, Grid2 } from "@mui/material";

interface CompletedVariantProps {
  content: { title: string; text: string[] };
}

export default function CompletedVariant({ content }: CompletedVariantProps) {
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
      <Button variant="contained" color="secondary">
        Prøv oppgaven en gang til!
      </Button>
    </Grid2>
  );
}
