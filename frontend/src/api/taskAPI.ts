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
  questions: {
    id: number;
    questionText: string;
    correctAnswer: string;
    options: string[];
    correctOption: string;
  }[];
  maximumPoints: number;
  achievedPoints: number;
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

export const fetchAchievedPoints = async (id: number): Promise<number> => {
  try {
    const response = await axiosInstance.get(`/Tasks/${id}`);
    return response.data.achievedPoints;
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
 * Updates the points of a task.
 *
 * @param task The task to update.
 * @param points The new points to set for the task.
 */
export const updateTaskPoints = async (
  task: TaskAPI,
  points: number
): Promise<void> => {
  try {
    await axiosInstance.put(`/Tasks/${task.id}`, {
      id: task.id,
      title: task.title,
      taskContent: task.taskContent,
      isDone: task.isDone,
      topicId: task.topicId,
      taskType: task.taskType,
      maximumPoints: task.maximumPoints,
      achievedPoints: points,
    });
  } catch (error) {
    console.error("Error updating task points:", error);
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
