import axiosInstance from "./axios";
import axios from "axios";

/**
 * Interface representing a subtopic, contains the subtopic's ID, title, content, read status, and topic ID.
 *
 * @interface SubtopicAPI
 */
export interface SubtopicAPI {
  id: number;
  title: string;
  subtopicContent: string;
  isRead: boolean;
  topicId: number;
}

/**
 * Fetches a subtopic by its ID and returns it as a SubtopicAPI object.
 *
 * @param {number} id - The ID of the subtopic to fetch.
 * @returns {Promise<SubtopicAPI>} A promise that contains the SubtopicAPI object.
 */
export const fetchSubtopic = async (id: number): Promise<SubtopicAPI> => {
  try {
    const response = await axiosInstance.get(`/Subtopics/${id}`);
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
 * Updates the isRead property of a subtopic.
 *
 * @param id The ID of the subtopic to update.
 * @param isRead The new value for the isRead property.
 * @returns A promise that resolves when the update is complete.
 */
export const updateSubtopicIsRead = async (
  subtopic: SubtopicAPI,
  read: boolean
): Promise<void> => {
  try {
    await axiosInstance.put(`/Subtopics/${subtopic.id}`, {
      id: subtopic.id,
      title: subtopic.title,
      subtopicContent: subtopic.subtopicContent,
      isRead: read,
      topicId: subtopic.topicId,
    });
  } catch (error) {
    console.error("Error updating subtopic:", error);
    throw error;
  }
};
