import { useState } from 'react';
import { getUserAccount } from '../../services';

export const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserAccount(); 
      if (response.success) {
        setAccount(response.data.account);
      } else {
        setError(response.msg || 'Error desconocido');
      }
    } catch (err) {
      setError('Error al obtener la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return {
    account,
    loading,
    error,
    fetchAccount
  };
};
