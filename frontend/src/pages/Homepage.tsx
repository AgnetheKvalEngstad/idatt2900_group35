import TopicCard from "../components/TopicCard";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTopics } from "../hooks/useTopics";
import { checkDifficulty } from "../utils/utils";
import { useCookies } from "react-cookie";
import ProgressBar from "../components/ProgressBar";
import { useUser } from "../hooks/useUser";

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
  const [cookies, setCookie] = useCookies(["progress", "userInfo"]);
  const { user, createUserHandler } = useUser();
  const [progress] = useState<{ [key: string]: number }>(
    cookies.progress || {}
  );
  const hasInitialized = useRef(user?.id ? true : false);

  const [topicIds, setTopicIds] = useState<number[]>([]);
  const { topics: data, loading, error, refetch } = useTopics();

  useEffect(() => {
    const initUser = async () => {
      if (hasInitialized.current) return;
      hasInitialized.current = true;

      try {
        if (!cookies.userInfo?.id) {
          console.log("No user, creating new user");
          const newUser = await createUserHandler();
          setCookie("userInfo", newUser, { path: "/" });
          setTopicIds(newUser.topicIds);
        } else {
          console.log("User already exists", cookies.userInfo);
          const savedTopicIds = cookies.userInfo.topicIds || [];
          setTopicIds(savedTopicIds);
        }
      } catch (err) {
        console.error("Failed to initialize user:", err);
      }
    };

    initUser();
  }, [cookies.userInfo, createUserHandler, setCookie]);

  useEffect(() => {
    if (topicIds.length > 0) {
      console.log("Refetching topics with IDs:", topicIds);
      refetch(topicIds);
    }
  }, [topicIds, refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading topics</div>;
  }

  const sortedTopics = {
    ingen: data.filter(
      (topic) => checkDifficulty(topic.skillLevel) === "ingen"
    ),
    litt: data.filter((topic) => checkDifficulty(topic.skillLevel) === "litt"),
    mye: data.filter((topic) => checkDifficulty(topic.skillLevel) === "mye"),
  };

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
