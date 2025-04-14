import { useState, useEffect } from "react";
import { fetchTask, TaskAPI } from "../api/taskAPI";

/**
 * A custom React hook that fetches a task from an API and manages the loading and error states.
 *
 * @param id - The ID of the task to fetch.
 * @returns An object containing the task, loading state, and error state.
 */
export const useTask = (id: number) => {
  const [task, setTask] = useState<TaskAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTask(id);
        setTask(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { task, loading, error };
};
