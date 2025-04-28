import { useState, useEffect } from "react";
import { fetchSubtopic, SubtopicAPI } from "../api/subtopicAPI";

/**
 * A custom React hook that fetches a subtopic from an API and manages the loading and error states.
 *
 * @param id - The ID of the subtopic to fetch.
 * @returns An object containing the subtopic, loading state, and error state.
 */
export const useSubtopic = (id: number) => {
  const [subtopic, setSubtopic] = useState<SubtopicAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubtopic(id);
        setSubtopic(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { subtopic, loading, error };
};
