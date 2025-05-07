import { useEffect, useState } from "react";
import { BonusAPI, fetchBonuses } from "../api/bonusAPI";

/**
 * A custom React hook that fetches bonuses from an API and manages the loading and error states.
 *
 * @returns An object containing the bonuses, loading state, and error state.
 */
export const useBonuses = () => {
  const [bonuses, setBonuses] = useState<BonusAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = await fetchBonuses();
      setBonuses(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { bonuses, loading, error, refetch };
};
