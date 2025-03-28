import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

interface TopicCardProps {
  cardTitle: string;
  cardIcon: React.ElementType;
  difficulty: string;
}

/**
 * A React component that renders a card representing a topic.
 * The card displays a title, an icon, and a difficulty level, with the background
 * color based on difficulty.
 *
 * @component
 * @param {TopicCardProps} props The props for the TopicCard component.
 * @param {string} props.cardTitle The title displayed on the card.
 * @param {React.ElementType} props.cardIcon The icon component to render on the card.
 * @param {string} props.difficulty The difficulty level of the topic, which determines
 * the background color of the card.
 *
 * @returns A styled card component with the provided title, icon, and difficulty level.
 */
export default function TopicCard({
  cardTitle,
  cardIcon,
  difficulty,
}: TopicCardProps) {
  const getBackgroundColor = (difficulty: string) => {
    switch (difficulty) {
      case "ingen":
        return "#66DB68";
      case "litt":
        return "#FF9000";
      case "mye":
        return "#E77979";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <Card
      sx={{
        width: 184,
        height: 184,
        backgroundColor: getBackgroundColor(difficulty),
        borderRadius: 6,
        border: 3,
      }}
      variant="outlined"
    >
      <CardContent className="text-center">
        <Typography variant="h6" component="div">
          {cardTitle}
        </Typography>
      </CardContent>

      <CardContent className="text-center">
        {React.createElement(cardIcon, { sx: { fontSize: 48 } })}
      </CardContent>

      <CardContent className="text-center">
        <Typography variant="body2">Krever {difficulty} erfaring</Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
