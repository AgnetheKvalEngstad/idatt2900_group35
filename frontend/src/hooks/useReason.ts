import { useState, useEffect, useCallback } from "react";
import { fetchReason, ReasonAPI } from "../api/reasonAPI";

/**
 * A custom React hook that fetches a reason from an API and manages the loading and error states.
 *
 * @param id - The ID of the reason to fetch.
 * @returns An object containing the reason, loading state, and error state.
 */
export const useReason = (reasonId?: number) => {
  const [reason, setReason] = useState<ReasonAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (reasonId == null) return;

    setLoading(true);
    try {
      const data = await fetchReason(reasonId);
      setReason(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [reasonId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { reason, loading, error, refetch: fetchData };
};
