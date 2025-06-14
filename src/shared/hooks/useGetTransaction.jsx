import { useEffect, useState } from 'react';
import { getTransaction } from '../../services/api'; // Ajusta la ruta si es necesario

const useGetTransaction = ({ accountId = '', limit = 5, skip = 0 } = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        params: {
          accountId,
          limit,
          skip
        }
      };

      const res = await getTransaction(params);

      if (res.success) {
        setTransactions(res.data.transactions);
        setTotal(res.data.total);
      } else {
        setError(res.msg || 'Error al obtener transacciones');
      }
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [accountId, limit, skip]);

  return {
    transactions,
    total,
    loading,
    error,
    refetch: fetchTransactions
  };
};

export default useGetTransaction;