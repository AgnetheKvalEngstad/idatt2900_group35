import axiosInstance from "./axios";
import axios from "axios";

/**
 * Interface representing a topic, contains the topic's ID, title, skill level, and user ID.
 *
 * @interface TopicAPI
 */
export interface TopicAPI {
  id: number;
  title: string;
  skillLevel: string;
  icon: string;
  userId: number;
  taskType: string;
  taskId: number;
  subtopicId: number;
  reasonId: number;
}

/**
 * Fetches topics and returns them as an array of TopicAPI objects.
 *
 * @returns A promise that contains an array of TopicAPI objects.
 */
export const fetchTopics = async (topicIds: number[]): Promise<TopicAPI[]> => {
  try {
    if (topicIds.length === 0) {
      return [];
    }
    const requests = topicIds.map((id) => axiosInstance.get(`/Topics/${id}`));
    const responses = await Promise.all(requests);
    return responses.map((res) => res.data);
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
