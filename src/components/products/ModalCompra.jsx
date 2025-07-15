import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { buyProduct } from '../../services/api'; // Asegúrate que esta función NO reciba userId

const ModalCompra = ({ isOpen, onClose, product, onPurchaseSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleBuy = async () => {
    if (!product) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await buyProduct({
        productId: product._id,
        quantity,
      });

      if (response.error) {
        setError(response.msg || 'Error al comprar');
      } else {
        setSuccessMsg(`Compra exitosa de ${quantity} ${product.name}(s)`);
        if (onPurchaseSuccess) onPurchaseSuccess();
      }
    } catch (err) {
      setError('Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setError(null);
      setSuccessMsg(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.900" color="white">
        <ModalHeader>Comprar producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {product ? (
            <>
              <Text mb={3} fontWeight="bold" fontSize="xl">
                {product.name}
              </Text>
              <Text mb={3}>
                Precio unitario: ${parseFloat(product.price?.$numberDecimal || product.price).toFixed(2)}
              </Text>
              <Text mb={3}>{product.description}</Text>

              <NumberInput
                min={1}
                max={1000}
                value={quantity}
                onChange={(val) => {
                  const num = parseInt(val);
                  if (!isNaN(num)) setQuantity(num);
                }}
              >
                <NumberInputField placeholder="Cantidad" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              {error && (
                <Text color="red.400" mt={2}>
                  {error}
                </Text>
              )}

              {successMsg && (
                <Text color="green.400" mt={2}>
                  {successMsg}
                </Text>
              )}
            </>
          ) : (
            <Text>No hay producto seleccionado</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="yellow"
            mr={3}
            isLoading={loading}
            onClick={handleBuy}
            disabled={!!successMsg}
          >
            Comprar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCompra;
