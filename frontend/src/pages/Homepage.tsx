import TopicCard from "../components/TopicCard";
import CookieIcon from "@mui/icons-material/Cookie";
import { Grid2 } from "@mui/material";

export default function Homepage() {
  const [cardTitle, cardIcon] = ["Insert title here", CookieIcon];

  const numberOfCards: number = 6;
  const difficulties: Array<string> = ["ingen", "litt", "mye"];
  const cards: Array<React.ReactNode> = Array(numberOfCards)
    .fill(null)
    .map((_, index) => (
      <TopicCard
        key={index}
        cardTitle={cardTitle}
        cardIcon={cardIcon}
        difficulty={difficulties[index % difficulties.length]}
      />
    ));

  return (
    // er div ok mtp universell utforming og skjermlesere?
    <div className="flex justify-center items-center flex-grow py-12">
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ maxWidth: "700px" }}
      >
        {cards.map((card, index) => (
          <Grid2 key={index} size={{ xs: 6, sm: 4, md: 4 }} padding={3}>
            {card}
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}
