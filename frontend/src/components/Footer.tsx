import { Button, Grid2 } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

/**
 * Component for the footer of the page
 * @returns Footer component
 */
export default function Footer() {
  return (
    <Grid2
      container
      spacing={2}
      direction={"column"}
      className="mt-auto flex pl-4 py-2"
    >
      <Grid2>
        <Button variant="contained" color="primary">
          Stor skrift
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<QuestionMarkIcon />}
        >
          Hjelp
        </Button>
      </Grid2>
    </Grid2>
  );
}
