import TopicCard from "../components/TopicCard";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTopics } from "../hooks/useTopics";
import { checkDifficulty } from "../utils/utils";
import { useCookies } from "react-cookie";
import ProgressBar from "../components/ProgressBar";

/**
 * A React component that renders a homepage that displays a grid of topic cards.
 * The topics are grouped by difficulty level, and each card
 * links to a corresponding topic page.
 *
 * @returns A React component that displays a loading state, error state,
 * or a grid of topic cards grouped by difficulty.
 */
export default function Homepage() {
  const cardSize: string = "medium";
  const [cookies] = useCookies(["progress"]);
  const [progress] = useState<{ [key: string]: number }>(
    cookies.progress || {}
  );

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
    <div className="flex justify-center items-center flex-grow py-4">
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
            className="flex flex-col items-center gap-2 p-3"
          >
            {group.map((topic) => (
              <Grid2
                key={topic.id}
                className="flex flex-col items-center p-2 gap-1"
              >
                <Link
                  key={topic.id}
                  to={`/topic/?id=${topic.id}`}
                  state={{
                    topicId: topic.id,
                    topicTitle: topic.title,
                    difficulty: checkDifficulty(topic.skillLevel),
                    reasonId: topic.reasonId,
                    subtopicId: topic.subtopicId,
                    taskId: topic.taskId,
                  }}
                >
                  <TopicCard
                    cardTitle={topic.title}
                    cardIcon={topic.icon}
                    difficulty={checkDifficulty(topic.skillLevel)}
                    size={cardSize}
                  />
                </Link>
                <Grid2 className="w-36">
                  <ProgressBar value={progress[topic.id] || 0} />
                </Grid2>
              </Grid2>
            ))}
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}
