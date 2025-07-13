import { useState, useEffect } from "react";

export function useBitcoinBlocks(limit = 10) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlocks() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://mempool.space/api/blocks");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Limitamos los resultados aquí manualmente
        setBlocks(data.slice(0, limit));
      } catch (err) {
        setError(err.message || "Error al cargar bloques");
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, [limit]);

  return { blocks, loading, error };
}
