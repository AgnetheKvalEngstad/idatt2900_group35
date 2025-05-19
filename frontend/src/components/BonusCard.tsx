import GppGoodIcon from "@mui/icons-material/GppGood";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import RouterIcon from "@mui/icons-material/Router";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface BonusCardProps {
  cardTitle: string;
  cardIcon: string;
  description: string;
  pointsNeeded: number;
  pointsAchieved: number;
}

interface iconDictionary<T> {
  [key: string]: T;
}

const iconDictionary: iconDictionary<React.ElementType> = {
  vpnLock: VpnLockIcon,
  router: RouterIcon,
  shield: GppGoodIcon,
  default: VpnLockIcon,
};

/**
 * A React component that renders a bonus card with a title, icon, description,
 *
 * @param {BonusCardProps} props - The props for the BonusCard component.
 * @param {string} props.cardTitle - The title displayed on the card.
 * @param {string} props.cardIcon - The icon displayed on the card.
 * @param {string} props.description - The description of the bonus.
 * @param {number} props.pointsNeeded - The points needed to achieve the bonus.
 * @param {number} props.pointsAchieved - The points achieved by the user.
 *
 * @returns A styled card component with the provided title, icon, and description.
 */
export default function BonusCard({
  cardTitle,
  cardIcon,
  description,
  pointsNeeded,
  pointsAchieved,
}: BonusCardProps) {
  const iconComponent =
    cardIcon && typeof cardIcon === "string"
      ? iconDictionary[cardIcon.trim().toLowerCase()] || iconDictionary.default
      : iconDictionary.default;

  const isAchieved = pointsAchieved >= pointsNeeded;
  const [openBonus, setOpenBonus] = React.useState(false);

  const handleOpenBonus = () => {
    setOpenBonus(true);
  };
  const handleCloseBonus = () => {
    setOpenBonus(false);
  };

  return (
    <>
      <Card
        raised={true}
        onClick={handleOpenBonus}
        sx={{
          borderRadius: 100,
          backgroundColor: "#0F3D75",
        }}
        className="flex flex-row justify-between text-center items-center gap-2 p-4 w-80 h-12 
      hover:shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {React.createElement(iconComponent, {
          fontSize: "large",
          style: { color: "white" },
        })}
        <Typography
          variant="body1"
          gutterBottom={false}
          style={{ color: "white" }}
        >
          {cardTitle}
        </Typography>
        <div className="w-18">
          <Typography variant="body2" style={{ color: "white" }}></Typography>
          <Typography variant="body2" style={{ color: "white" }}>
            {isAchieved ? (
              "Oppnådd!"
            ) : (
              <>
                Poeng:
                <br />
                {pointsAchieved} av {pointsNeeded}
              </>
            )}
          </Typography>
        </div>
      </Card>
      <Dialog open={openBonus} onClose={handleCloseBonus}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {cardTitle}
          <IconButton
            aria-label="close"
            onClick={handleCloseBonus}
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
          <Typography variant="body1" gutterBottom={false}>
            {isAchieved
              ? description
              : `Du mangler ${pointsNeeded - pointsAchieved} poeng for å oppnå dette bonusen.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseBonus}>
            Lukk
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
