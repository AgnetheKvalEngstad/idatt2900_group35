import { useEffect, useState, useCallback } from "react";
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

  const fetchData = useCallback(async (ids: number[] = []) => {
    setLoading(true);
    try {
      const data = await fetchTopics(ids);
      setTopics(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { topics, loading, error, refetch: fetchData };
};
