import { useState } from 'react';

const API_KEY = '704fab2bb997141c31258b8b'; // Reemplázalo con tu clave real

export const useCurrencyConversion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversion, setConversion] = useState(null);
  const [error, setError] = useState(null);

  const convert = async (fromCurrency, toCurrency, amount) => {
    setIsLoading(true);
    setError(null);
    setConversion(null);

    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`);
      const data = await response.json();

      if (data.result === 'success') {
        setConversion(data.conversion_result);
      } else {
        throw new Error(data['error-type'] || 'Error en la conversión');
      }
    } catch (err) {
      setError(err.message || 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    convert,        // Función para iniciar la conversión
    conversion,     // Resultado numérico de la conversión
    isLoading,      // Estado de carga
    error           // Mensaje de error si ocurre algo
  };
};
