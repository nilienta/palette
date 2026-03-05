import { useEffect, useState } from "react";
import { getDataFromSheet } from "../api/getDataFromSheet";
import type { Game } from "../model/game";

export const useGames = () => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const dataInit = await getDataFromSheet();
        setData(dataInit);
      } catch (error) {
        console.error("Ошибка загрузки игр:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
