import { useState } from "react";
import { createUser, deleteUser, fetchUser, UserAPI } from "../api/userAPI";

/**
 * An interface representing the structure of the user data returned by the API.
 */
interface UseUserResult {
  user: UserAPI | null;
  loading: boolean;
  error: unknown | null;
  createUserHandler: () => Promise<UserAPI>;
  fetchUserHandler: (id: number) => Promise<void>;
  deleteUserHandler: (id: number) => Promise<void>;
}

/**
 * A custom React hook that manages user data, including creating and fetching users.
 *
 * @returns {UseUserResult} An object containing the user data, loading state, error state, and functions to create and fetch users.
 */
export const useUser = (): UseUserResult => {
  const [user, setUser] = useState<UserAPI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const createUserHandler = async (): Promise<UserAPI> => {
    setLoading(true);
    try {
      const newUser = await createUser();
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserHandler = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const fetchedUser = await fetchUser(id);
      setUser(fetchedUser);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserHandler = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await deleteUser(id);
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    createUserHandler,
    fetchUserHandler,
    deleteUserHandler,
  };
};
