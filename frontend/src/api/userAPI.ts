import axios from "axios";
import axiosInstance from "./axios";

/**
 * Interface representing a user in the system.
 *
 * @interface UserAPI
 */
export interface UserAPI {
  id: number;
  topicIds: number[];
  allUserPoints: number;
}

/**
 * Creates a new user in the system and returns the created user object.
 *
 * @returns {Promise<UserAPI>} A promise that resolves to the created UserAPI object.
 */
export const createUser = async (): Promise<UserAPI> => {
  try {
    const response = await axiosInstance.post("/Users", { id: 0 });
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
 * Fetches a user by their ID and returns the user object.
 *
 * @param id The ID of the user to fetch.
 * @returns {Promise<UserAPI>} A promise that resolves to the UserAPI object.
 */
export const fetchUser = async (id: number): Promise<UserAPI> => {
  try {
    const response = await axiosInstance.get(`/Users/${id}`);
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
 * Deletes a user by their ID.
 * @param id The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Users/${id}`);
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
