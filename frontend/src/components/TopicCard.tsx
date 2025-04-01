import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

interface TopicCardProps {
  cardTitle: string;
  cardIcon: React.ElementType;
  difficulty: string;
  size: string;
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
 * @param {string} props.size The size of the card, which determines its width and height.
 *
 * @returns A styled card component with the provided title, icon, and difficulty level.
 */
export default function TopicCard({
  cardTitle,
  cardIcon,
  difficulty,
  size,
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
  const getWidth = (size: string) => {
    switch (size) {
      case "small":
        return 200;
      case "medium":
        return 184;
      default:
        return 184;
    }
  };
  const getHeight = (size: string) => {
    switch (size) {
      case "small":
        return 50;
      case "medium":
        return 184;
      default:
        return 184;
    }
  };
  const getFontSize = (size: string) => {
    switch (size) {
      case "small":
        return "body1";
      case "medium":
        return "h6";
      default:
        return "h6";
    }
  };

  return (
    <Card
      sx={{
        width: getWidth(size),
        height: getHeight(size),
        backgroundColor: getBackgroundColor(difficulty),
        borderRadius: size == "small" ? 4 : 6,
        border: size == "small" ? 2 : 3,
        display: "flex",
        flexDirection: size === "small" ? "row-reverse" : "column",
        alignItems: "center",
        padding: size === "small" ? 1 : 0,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant={getFontSize(size)} component="div">
          {cardTitle}
        </Typography>
      </CardContent>

      {React.createElement(cardIcon, {
        sx: { fontSize: size === "small" ? 24 : 64 },
      })}

      {size !== "small" && (
        <CardContent className="text-center">
          <Typography variant="body2">Krever {difficulty} erfaring</Typography>
        </CardContent>
      )}
    </Card>
  );
}
