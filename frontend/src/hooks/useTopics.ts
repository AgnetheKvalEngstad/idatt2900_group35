import { useEffect, useState } from "react";
import { fetchTopics, TopicAPI } from "../api/topicAPI";

/**
 * A custom React hook that fetches topics from an API and manages the loading and error states.
 *
 * @returns An object containing the topics, loading state, and error state.
 */
export const useTopics = () => {
  const [topics, setTopics] = useState<TopicAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchTopics();
        setTopics(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTopics();
  }, []);

  return { topics, loading, error };
};
