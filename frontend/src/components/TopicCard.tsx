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
