import { useState, useEffect, useCallback } from "react";
import { fetchSubtopic, SubtopicAPI } from "../api/subtopicAPI";

/**
 * A custom React hook that fetches a subtopic from an API and manages the loading and error states.
 *
 * @param id - The ID of the subtopic to fetch.
 * @returns An object containing the subtopic, loading state, and error state.
 */
export const useSubtopic = (subtopicId: number) => {
  const [subtopic, setSubtopic] = useState<SubtopicAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (subtopicId == null) return;

    setLoading(true);
    try {
      const data = await fetchSubtopic(subtopicId);
      setSubtopic(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [subtopicId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { subtopic, loading, error, refetch: fetchData };
};
