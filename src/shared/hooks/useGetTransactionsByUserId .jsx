import { useState, useEffect } from 'react';
import { getTransactionByIdUser } from '../../services/api'; // Ruta correcta a tu service

export const useGetTransactionsByUserId = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    if (!userId) {
      setError('User ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getTransactionByIdUser(userId);

      if (response.success) {
        // Suponiendo que la data llega en response.data.transactions
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

  // Refresca cuando cambia userId
  useEffect(() => {
    fetchTransactions();
  }, [userId]);

  return { transactions, loading, error, refetch: fetchTransactions };
};
