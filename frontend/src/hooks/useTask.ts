import { useState, useEffect, useCallback } from "react";
import { fetchTask, TaskAPI } from "../api/taskAPI";

/**
 * A custom React hook that fetches a task from an API and manages the loading and error states.
 *
 * @param id - The ID of the task to fetch.
 * @returns An object containing the task, loading state, and error state.
 */
export const useTask = (taskId: number) => {
  const [task, setTask] = useState<TaskAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (taskId == null) return;

    setLoading(true);
    try {
      const data = await fetchTask(taskId);
      setTask(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { task, loading, error, refetch: fetchData };
};
