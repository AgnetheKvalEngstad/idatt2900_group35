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
 * A React component that renders a dialog providing instructions on how to increase text size
 * for better readability on Windows and Mac systems.
 *
 * @param open - A boolean value that determines whether the dialog is open or not.
 * @param onClose - A function that closes the dialog.
 *
 * @returns A React component with instructions on how to increase text size.
 */
export default function TextSizeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Hvordan få større skrift
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
          <strong>Windows: </strong>
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          For bedre lesbarhet kan du trykke på tastene
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          '<strong>Ctrl</strong>' og '<strong>+</strong>' samtidig for å få
          større skrift, og '<strong>Ctrl</strong>' og '<strong>-</strong>' for
          å få mindre skrift.
        </Typography>
        <Typography sx={{ mb: 4 }} />
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          <strong>Mac: </strong>
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          For bedre lesbarhet kan du trykke på tastene
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "1.2rem" }}>
          '<strong>Cmd</strong>' og '<strong>+</strong>' samtidig for å få
          større skrift, og '<strong>Cmd</strong>' og '<strong>-</strong>' for å
          få mindre skrift.
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
