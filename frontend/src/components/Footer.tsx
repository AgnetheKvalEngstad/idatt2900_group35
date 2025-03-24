import {
  Button,
  Grid2,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Component for the footer of the page
 * @returns Footer component
 */
export default function Footer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          onClick={handleClickOpen}
        >
          Hjelp
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ m: 0, p: 2 }}>Hjelp</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ p: 4 }}>
            <Typography gutterBottom>
              Her kan du lære om nettsikkerhet på en morsom måte. Du kan velge
              hvilke temaer du ønsker å lære mer om ved å trykke på en av
              temaboksene.
            </Typography>
            <Typography gutterBottom>
              Inne i disse boksene vil du lære om et tema tilknyttet
              nettsikkerhet. Etter det kan du prøve å vinne premier gjennom å
              teste hvor mye du har lært.
            </Typography>
            <Typography gutterBottom>
              Dersom noe er utydelig kan du alltid få mer informasjon om siden
              du er på ved å trykke på “Hjelp” knappen i nedre venstre hjørne.
            </Typography>
            <Typography gutterBottom>Lykke til og ha det gøy!</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Lukk
            </Button>
          </DialogActions>
        </Dialog>
      </Grid2>
    </Grid2>
  );
}
