import { useState, useEffect } from "react";

const API_KEY = "EE65UP91CYB3IIPJ";  // pon aquí tu API key real

export function useIntradayStock(symbol) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    setLoading(true);
    setError(null);

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(
      symbol
    )}&interval=5min&apikey=${API_KEY}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((json) => {
        if (json["Error Message"] || json["Note"]) {
          // Alpha Vantage puede devolver "Note" si se excede el límite de requests
          throw new Error(json["Error Message"] || json["Note"]);
        }
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  return { data, loading, error };
}

