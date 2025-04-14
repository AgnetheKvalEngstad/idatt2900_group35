import { useState, useEffect } from "react";
import { fetchReason, ReasonAPI } from "../api/reasonAPI";

/**
 * A custom React hook that fetches a reason from an API and manages the loading and error states.
 *
 * @param id - The ID of the reason to fetch.
 * @returns An object containing the reason, loading state, and error state.
 */
export const useReason = (id: number) => {
  const [reason, setReason] = useState<ReasonAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReason(id);
        setReason(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { reason, loading, error };
};
