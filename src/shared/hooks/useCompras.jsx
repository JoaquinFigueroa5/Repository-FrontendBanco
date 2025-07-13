import { useState } from 'react';
import { buyProduct as buyProductAPI } from '../../services';

const useBuyProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const buyProduct = async ({ productId, quantity }) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await buyProductAPI({ productId, quantity });

      if (result.error) {
        setError(result.msg);
        return null;
      }

      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err.message || 'Error al procesar la compra');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { buyProduct, loading, error, response };
};

export default useBuyProduct;
