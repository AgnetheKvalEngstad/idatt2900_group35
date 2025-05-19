import axiosInstance from "./axios";
import axios from "axios";

/**
 * Interface representing a bonus, contains the bonus's ID, title, description, icon, and points needed to achieve.
 *
 * @interface BonusAPI
 */
export interface BonusAPI {
  id: number;
  title: string;
  description: string;
  icon: string;
  pointsNeeded: number;
}

/**
 * Fetches bonuses and returns them as an array of BonusAPI objects.
 *
 * @returns A promise that contains an array of BonusAPI objects.
 */
export const fetchBonuses = async (): Promise<BonusAPI[]> => {
  try {
    const response = await axiosInstance.get("/Bonuses");
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
