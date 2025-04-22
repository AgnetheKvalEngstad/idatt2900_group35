import { Grid2, Button } from "@mui/material";
import { JSX } from "react";
import { getBackgroundColor } from "../utils/utils";

interface TopicMenuProps {
  difficulty: string;
  index: number;
  onButtonClick: (newIndex: number) => void;
  menuItems: { title: string; icon: JSX.Element }[];
}

/**
 * A React component that renders a menu with buttons representing different subtopics.
 * The appearance of the buttons changes based on the selected index and the difficulty level.
 *
 * @param {TopicMenuProps} props The props for the `TopicMenu` component.
 * @param {string} props.difficulty The difficulty level, which determines the button background color.
 * @param {number} props.index The index of the currently selected button.
 * @param {(index: number) => void} props.onButtonClick Function triggered when a button is clicked.
 *
 * @returns A Material-UI Grid2 layout containing buttons styled based on the difficulty and selection state.
 */
export default function TopicMenu({
  difficulty,
  index,
  onButtonClick,
  menuItems,
}: TopicMenuProps) {
  return (
    <Grid2
      container={true}
      spacing={3}
      justifyContent="center"
      alignItems="center"
      direction="column"
      className="p-8 md:pr-10 w-80"
    >
      {menuItems.map((menuItem, i) => (
        <Button
          key={i}
          startIcon={menuItem.icon}
          variant="contained"
          fullWidth
          size="large"
          style={
            i === index
              ? {
                  backgroundColor: "white",
                  color: "black",
                  border: `2px solid ${getBackgroundColor(difficulty)}`,
                }
              : {
                  backgroundColor: getBackgroundColor(difficulty),
                  color: "black",
                  border: `1px solid black`,
                }
          }
          onClick={() => onButtonClick(i)}
          className="hover:shadow-lg hover:scale-105 transition-transform duration-200"
        >
          {menuItem.title}
        </Button>
      ))}
    </Grid2>
  );
}
