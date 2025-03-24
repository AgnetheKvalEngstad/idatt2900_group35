import React from "react";
import { Grid2, Button } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TextSizeDialog from "./TextSizeDialog";
import HelpDialog from "./HelpDialog";

/**
 * A React component that renders a footer with buttons for increasing text size
 * and getting information and instructions for the page.
 *
 * @returns A React component with buttons for increasing text size and accessing help.
 */
export default function Footer() {
  const [openTextSize, setOpenTextSize] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);

  const handleTextSizeOpen = () => setOpenTextSize(true);
  const handleTextSizeClose = () => setOpenTextSize(false);

  const handleHelpOpen = () => setOpenHelp(true);
  const handleHelpClose = () => setOpenHelp(false);

  return (
    <Grid2
      container
      spacing={2}
      direction={"column"}
      className="mt-auto flex pl-4 py-2"
    >
      <Grid2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTextSizeOpen}
        >
          Stor skrift
        </Button>
        <TextSizeDialog open={openTextSize} onClose={handleTextSizeClose} />
      </Grid2>

      <Grid2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<QuestionMarkIcon />}
          onClick={handleHelpOpen}
        >
          Hjelp
        </Button>
        <HelpDialog open={openHelp} onClose={handleHelpClose} />
      </Grid2>
    </Grid2>
  );
}
