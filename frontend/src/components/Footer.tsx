import React from "react";
import { Grid2, Button } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TextSizeDialog from "./dialogs/TextSizeDialog";
import HelpDialog from "./dialogs/HelpDialog";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

/**
 * A React component that renders a footer with buttons for increasing text size
 * and getting information and instructions for the page.
 *
 * @returns A React component with buttons for increasing text size and accessing help.
 */
export default function Footer() {
  const [openTextSize, setOpenTextSize] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTextSizeOpen = () => setOpenTextSize(true);
  const handleTextSizeClose = () => setOpenTextSize(false);

  const handleHelpOpen = () => setOpenHelp(true);
  const handleHelpClose = () => setOpenHelp(false);

  return (
    <Grid2 className="sticky bottom-0 mt-auto flex flex-row items-center justify-between pl-4 py-2 bg-white">
      <Grid2 className="flex flex-col gap-2">
        <Button
          variant="contained"
          color="primary"
          onClick={handleTextSizeOpen}
        >
          Stor skrift
        </Button>
        <TextSizeDialog open={openTextSize} onClose={handleTextSizeClose} />

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

      {location.pathname === "/" && (
        <Grid2 className="pr-8">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Hopp over
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
}
