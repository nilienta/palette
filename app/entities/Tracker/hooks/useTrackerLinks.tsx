import { useState, useEffect } from "react";
import {
  parseSheetData,
  PUBLISHED_URL,
  type SheetData,
} from "../api/parseSheetData";

export const useTrackerData = () => {
  const [data, setData] = useState<SheetData>({
    links: [],
    price: 0,
    videoUrl: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await parseSheetData(PUBLISHED_URL);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};
