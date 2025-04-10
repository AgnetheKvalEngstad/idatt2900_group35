import TopicCard from "../components/TopicCard";
import CookieIcon from "@mui/icons-material/Cookie";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { useTopics } from "../hooks/useTopics";
import { checkDifficulty } from "../utils/utils";

/**
 * A React component that renders a homepage that displays a grid of topic cards.
 * The topics are grouped by difficulty level, and each card
 * links to a corresponding topic page.
 *
 * @returns A React component that displays a loading state, error state,
 * or a grid of topic cards grouped by difficulty.
 */
export default function Homepage() {
  const cardIcon = CookieIcon;
  const cardSize: string = "medium";

  const { topics: data, loading, error } = useTopics();

  const sortedTopics = {
    ingen: data.filter(
      (topic) => checkDifficulty(topic.skillLevel) === "ingen"
    ),
    litt: data.filter((topic) => checkDifficulty(topic.skillLevel) === "litt"),
    mye: data.filter((topic) => checkDifficulty(topic.skillLevel) === "mye"),
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading topics</div>;
  }

  return (
    <div className="flex justify-center items-center flex-grow py-12">
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ maxWidth: "1200px" }}
      >
        {Object.values(sortedTopics).map((group, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 4, md: 4 }}
            className="flex flex-col items-center gap-12 p-4"
          >
            {group.map((topic) => (
              <Link
                key={topic.id}
                to={`/topic/?difficulty=${checkDifficulty(topic.skillLevel)}`}
              >
                <TopicCard
                  cardTitle={topic.title}
                  cardIcon={cardIcon}
                  difficulty={checkDifficulty(topic.skillLevel)}
                  size={cardSize}
                />
              </Link>
            ))}
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}
