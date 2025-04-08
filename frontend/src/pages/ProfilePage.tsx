import { Grid2, Card, Typography, Button } from "@mui/material";
import React from "react";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import TopicCard from "../components/TopicCard";
import CookieIcon from "@mui/icons-material/Cookie";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SpaIcon from "@mui/icons-material/Spa";

/**
 * A React component that renders the profile page.
 *
 * @returns The rendered ProfilePage component.
 */
export default function ProfilePage() {
  const [open, setOpen] = React.useState(false);
  const [cardIcon] = [CookieIcon];

  const [cardTitle] = ["Eksempel tema"];

  const numberOfCards: number = 6;
  const difficulties: Array<string> = ["ingen", "litt", "mye"];
  const difficultyOrder: Record<string, number> = {
    ingen: 0,
    litt: 1,
    mye: 2,
  };
  const cards: Array<React.ReactNode> = Array(numberOfCards)
    .fill(null)
    .map((_, index) => ({
      component: (
        <TopicCard
          cardTitle={cardTitle}
          cardIcon={cardIcon}
          difficulty={difficulties[index % difficulties.length]}
          size="small"
        />
      ),
      difficulty: difficulties[index % difficulties.length],
    }))
    .sort(
      (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    )
    .map((card) => card.component);

  const createCard = (icon: React.ElementType, title: string) => {
    return (
      <Card
        raised={true}
        sx={{
          borderRadius: 100,
          backgroundColor: "#0F3D75",
        }}
        className="flex flex-row items-center gap-2 p-4 w-65 h-16 hover:shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {React.createElement(icon, {
          fontSize: "large",
          style: { color: "white" },
        })}
        <Typography
          variant="body1"
          gutterBottom={false}
          style={{ color: "white" }}
        >
          {title}
        </Typography>
      </Card>
    );
  };

  return (
    <Grid2 className="flex flex-col justify-center items-center space-y-4  w-full">
      <Typography variant="h4" className="pb-6">
        Min side
      </Typography>
      <Grid2 className="flex flex.row justify-center items-center space-x-4">
        <Card
          className="flex flex-col items-center justify-center w-80 text-center p-6 border-1 border-black"
          sx={{ borderRadius: 6 }}
        >
          <Typography variant="h6">Du har oppnådd totalt</Typography>
          <Typography variant="h6">1000 av 2000 poeng!</Typography>
          <Grid2 className="flex flex.row justify-center items-center space-x-2 py-2">
            <OfflineBoltOutlinedIcon
              fontSize="large"
              className="bg-yellow-300 rounded-[50%] border-2"
            />
            <OfflineBoltOutlinedIcon
              fontSize="large"
              className="bg-yellow-300 rounded-[50%] border-2"
            />
            <OfflineBoltOutlinedIcon
              fontSize="large"
              className="bg-yellow-300 rounded-[50%] border-2"
            />
          </Grid2>
          <Typography variant="h6">Stå på!!</Typography>
        </Card>

        <Card
          className="flex flex-col items-center justify-center text-center p-4 border-1 border-black"
          sx={{ borderRadius: 6 }}
        >
          <Typography variant="h5" className="pb-2">
            Fullførte temaer
          </Typography>
          <Grid2 spacing={2} className="grid grid-cols-2 gap-1">
            {cards.map((card, index) => (
              <Grid2 size={6} key={index}>
                {card}
              </Grid2>
            ))}
          </Grid2>
        </Card>
      </Grid2>
      <Grid2 className="flex flex.row justify-center items-center space-x-4">
        <Card
          className="flex flex-col items-center justify-center w-90 text-center p-6 border-1 border-black"
          sx={{ borderRadius: 6 }}
        >
          <Typography variant="body1" className="pb-4">
            Denne nettsiden lagrer informasjon om hvor langt du har kommet og
            hvilke bonuser du har nådd. Dersom du ikke ønsker at dette skal
            lagres videre, trykk slett min data.
          </Typography>
          <DeleteDialog open={open} onClose={() => setOpen(false)} />
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
          >
            Slett min data
          </Button>
        </Card>
        <Card
          className="flex flex-col gap-2 items-center justify-center text-center p-6 border-1 border-black "
          sx={{ borderRadius: 6 }}
        >
          <Typography variant="h5">Bonuser du har fått!</Typography>
          {createCard(SpaIcon, "2 for 1 på spa!")}
          {createCard(GppGoodIcon, "Pakkedeal med antivirus")}
        </Card>
      </Grid2>
    </Grid2>
  );
}
