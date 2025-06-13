import { useState } from 'react';
import { createTransaction } from '../../services';

const useTransfer = (onSuccess) => {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferConcept, setTransferConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTransfer = async () => {
    setLoading(true);
    setError(null);

    try {
      await createTransaction({
        to: transferTo,
        amount: parseFloat(transferAmount),
        concept: transferConcept,
      });

      // Limpiar campos después de enviar
      setTransferTo('');
      setTransferAmount('');
      setTransferConcept('');

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Error al hacer la transferencia');
    } finally {
      setLoading(false);
    }
  };

  return {
    transferTo,
    setTransferTo,
    transferAmount,
    setTransferAmount,
    transferConcept,
    setTransferConcept,
    handleTransfer,
    loading,
    error,
  };
};

export default useTransfer;
