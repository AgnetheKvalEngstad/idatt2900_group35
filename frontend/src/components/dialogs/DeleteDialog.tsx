import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { useUser } from "../../hooks/useUser";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * A React component that renders a dialog for deleting user data.
 *
 * @param open - A boolean value that determines whether the dialog is open or not.
 * @param onClose - A function that closes the dialog.
 *
 * @returns A React component for deleting user data.
 */
export default function DeleteDialog({ open, onClose }: DeleteDialogProps) {
  const [cookies, removeCookies] = useCookies([
    "progress",
    "lastIndex",
    "userInfo",
  ]);
  const { deleteUserHandler } = useUser();

  const handleDelete = () => {
    deleteUserHandler(cookies.userInfo.id);
    removeCookies("progress", { path: "/" });
    removeCookies("lastIndex", { path: "/" });
    removeCookies("userInfo", { path: "/" });

    onClose();
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Er du sikker på at du vil slette dataene dine?
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
      <DialogContent>
        <Typography>
          Dette vil slette all informasjon om fremdriften din og bonusene du har
          oppnådd. Det vil ikke være mulig å gjenopprette dette.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Avbryt
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Bekreft
        </Button>
      </DialogActions>
    </Dialog>
  );
}
