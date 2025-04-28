import axiosInstance from "./axios";
import axios from "axios";

/**
 * Interface representing a task, contains the task's ID, title, content, completion status, topic ID, and task type.
 *
 * @interface TaskAPI
 */
export interface TaskAPI {
  id: number;
  title: string;
  taskContent: string;
  isDone: boolean;
  topicId: number;
  taskType: string;
}

/**
 * Fetches a task by its id and returns it as a TaskAPI object.
 *
 * @param {number} id - The ID of the task to fetch.
 * @returns {Promise<TaskAPI>} A promise that contains the TaskAPI object.
 */
export const fetchTask = async (id: number): Promise<TaskAPI> => {
  try {
    const response = await axiosInstance.get(`/Tasks/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};

/**
 * Updates the isDone property of a task.
 *
 * @param id The ID of the task to update.
 * @param isDone The new value for the isDone property.
 * @returns A promise that resolves when the update is complete.
 */
export const updateTaskIsDone = async (
  task: TaskAPI,
  done: boolean
): Promise<void> => {
  try {
    await axiosInstance.put(`/Tasks/${task.id}`, {
      id: task.id,
      title: task.title,
      taskContent: task.taskContent,
      isDone: done,
      topicId: task.topicId,
      taskType: task.taskType,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
