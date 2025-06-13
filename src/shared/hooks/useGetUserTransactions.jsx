import { useState, useEffect } from 'react';
import { getTransactionUser } from '../../services/api'; // Ajusta la ruta según tu estructura

export const useGetUserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      // No necesitas pasar data porque el token ya se envía en headers con axios interceptor
      const response = await getTransactionUser();
      if (response.success) {
        // response.data.transactions según tu backend
        setTransactions(response.data.transactions);
      } else {
        setError(response.msg || 'Error al obtener transacciones');
      }
    } catch (e) {
      setError('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, error, refetch: fetchTransactions };
};
