import { Card, Grid2, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { getBackgroundColor } from "../utils/utils";
import LockIcon from "@mui/icons-material/Lock";
import LinkIcon from "@mui/icons-material/Link";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CookieIcon from "@mui/icons-material/Cookie";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";

interface TopicCardProps {
  cardTitle: string;
  cardIcon: string;
  difficulty: string;
  size: string;
  sx?: SxProps;
}

interface IconDictionary<T> {
  [key: string]: T;
}

const iconDictionary: IconDictionary<React.ElementType> = {
  lock: LockIcon,
  link: LinkIcon,
  webasset: WebAssetIcon,
  cookie: CookieIcon,
  warning: WarningAmberRoundedIcon,
  default: CloudQueueRoundedIcon,
};

/**
 * A React component that renders a card representing a topic.
 * The card displays a title, an icon, and a difficulty level, with the background
 * color based on difficulty.
 *
 * @component
 * @param {TopicCardProps} props The props for the TopicCard component.
 * @param {string} props.cardTitle The title displayed on the card.
 * @param {string} props.cardIcon The icon displayed on the card.
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
  sx,
}: TopicCardProps) {
  const getWidth = (size: string) => {
    switch (size) {
      case "small":
        return 180;
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

  const iconComponent =
    cardIcon && typeof cardIcon === "string"
      ? iconDictionary[cardIcon.trim().toLowerCase()] || iconDictionary.default
      : iconDictionary.default;

  return (
    <Card
      sx={{
        width: getWidth(size),
        height: getHeight(size),
        backgroundColor: getBackgroundColor(difficulty),
        borderRadius: size == "small" ? 4 : 5,
        border: size == "small" ? 2 : 3,
        padding: size === "small" ? 1 : 2,
        ...sx,
      }}
      variant="outlined"
      className="hover:shadow-lg hover:scale-105 transition-transform duration-200 flex justify-between"
    >
      <Grid2
        className={`${
          size !== "small"
            ? "flex flex-col items-center justify-between gap-2 text-center w-full"
            : "flex flex-row-reverse items-center justify-center gap-2 text-center"
        }`}
      >
        <Typography variant={getFontSize(size)}>{cardTitle}</Typography>
        {React.createElement(iconComponent, {
          sx: { fontSize: size === "small" ? 24 : 50 },
        })}

        {size !== "small" && (
          <Typography className="" variant="body2">
            Krever {difficulty} erfaring
          </Typography>
        )}
      </Grid2>
    </Card>
  );
}
