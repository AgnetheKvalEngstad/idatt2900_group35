import { Typography } from "@mui/material";

interface TextVariantProps {
  content: { title: string; text: string };
}

/**
 * A React component that renders a text variant card.
 *
 * This component displays a title and text.
 *
 * @param {TextVariantProps} props - The props for the component.
 * @param {Object} props.content - The content to be displayed in the card.
 *
 * @returns The rendered text variant card component.
 */
export default function TextVariant({ content }: TextVariantProps) {
  {
    return (
      <>
        <Typography variant="h5" className="pb-4">
          {content.title}
        </Typography>
        <Typography variant="body1">{content.text}</Typography>
      </>
    );
  }
}
