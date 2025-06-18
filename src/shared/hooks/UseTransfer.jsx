import { useState } from 'react';
import { createTransaction } from '../../services';
import toast from 'react-hot-toast';

const useTransfer = (onSuccess) => {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferConcept, setTransferConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromAccountId, setFromAccountId] = useState('');

  const handleTransfer = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createTransaction({
        accountId: fromAccountId,
        type: 'Transferencia',
        amount: parseFloat(transferAmount),
        details: transferConcept,
        destinationNumberAccount: transferTo,
      });      

      if (response.error) {
        toast.error(response.error?.response?.data || response?.message || response?.e?.response?.data?.message || 'Ocurrio un error al hacer la transferencia', {
          style: {
            background: 'red',
            color: 'white'
          }
        });
        setLoading(false);
        return
      }

      toast.success('Transferencia hecha exitosamente!')
      location.reload();

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
    fromAccountId,
    setFromAccountId,
    loading,
    error,
  };
};

export default useTransfer;
