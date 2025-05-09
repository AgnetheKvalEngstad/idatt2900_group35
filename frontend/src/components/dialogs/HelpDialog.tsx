import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * A React component that renders a dialog providing instructions on how to use the page.
 *
 * @param open - A boolean value that determines whether the dialog is open or not.
 * @param onClose - A function that closes the dialog.
 *
 * @returns A React component with instructions on how to use the page.
 */
export default function HelpDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Hjelp
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 4 }}>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          Her kan du lære om nettsikkerhet på en morsom måte. Du kan velge
          hvilke temaer du ønsker å lære mer om ved å trykke på en av
          temaboksene.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          Inne i disse boksene vil du lære om et tema tilknyttet nettsikkerhet.
          Etter det kan du prøve å vinne premier gjennom å teste hvor mye du har
          lært.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          Dersom noe er utydelig kan du alltid få mer informasjon om siden du er
          på ved å trykke på “Hjelp” knappen i nedre venstre hjørne.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          Lykke til og ha det gøy!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Lukk
        </Button>
      </DialogActions>
    </Dialog>
  );
}
