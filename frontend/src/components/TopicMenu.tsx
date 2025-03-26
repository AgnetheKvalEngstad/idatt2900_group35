import { Grid2, Button } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

interface TopicMenuProps {
  difficulty: string;
  index: number;
  onButtonClick: (newIndex: number) => void;
}

export default function TopicMenu({
  difficulty,
  index,
  onButtonClick,
}: TopicMenuProps) {
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

  const buttons = [
    { label: "Første oppgave", icon: <MenuBookRoundedIcon /> },
    { label: "Andre oppgave", icon: <MenuBookRoundedIcon /> },
    { label: "Tredje oppgave", icon: <CreateOutlinedIcon /> },
  ];

  return (
    <Grid2
      container={true}
      spacing={3}
      justifyContent="center"
      alignItems="center"
      direction="column"
      className="p-8 pr-10"
    >
      {buttons.map((button, i) => (
        <Button
          key={i}
          startIcon={button.icon}
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
        >
          {button.label}
        </Button>
      ))}
    </Grid2>
  );
}
