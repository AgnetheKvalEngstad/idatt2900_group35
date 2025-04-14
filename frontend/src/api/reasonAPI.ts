import axiosInstance from "./axios";
import axios from "axios";

/**
 * Interface representing a reason, contains the reason's ID, title, content, read status, and topic ID.
 *
 * @interface ReasonAPI
 */
export interface ReasonAPI {
  id: number;
  reasonTitle: string;
  reasonContent: string;
  isRead: boolean;
  topicId: number;
}

/**
 * Fetches a reason by its id and returns it as a ReasonAPI object.
 *
 * @param {number} id - The ID of the reason to fetch.
 * @returns {Promise<ReasonAPI>} A promise that contains a ReasonAPI object.
 */
export const fetchReason = async (id: number): Promise<ReasonAPI> => {
  try {
    const response = await axiosInstance.get(`/Reasons/${id}`);
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
