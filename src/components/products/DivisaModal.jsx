import React, { useState } from 'react';
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
  Select,
  Input,
  Box,
  VStack,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useCurrencyConversion } from '../../shared/hooks';
import { currencies } from '../Data/currencies' // Ajusta la ruta si es necesario

const DivisasModal = ({ isOpen, onClose }) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const toast = useToast();

  const { convert, conversion, isLoading, error } = useCurrencyConversion();

  const handleConvert = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast({
        title: 'Monto inválido',
        description: 'Ingresa un número mayor a 0',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    convert(fromCurrency, toCurrency, amt);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent bg="#1a1a1a" color="white">
        <ModalHeader>Conversor de Divisas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Box flex="1">
                <Text mb={1}>De:</Text>
                <Select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  bg="gray.800"
                  borderColor="gray.600"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box flex="1">
                <Text mb={1}>A:</Text>
                <Select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  bg="gray.800"
                  borderColor="gray.600"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </HStack>

            <Box>
              <Text mb={1}>Cantidad:</Text>
              <Input
                placeholder="Ingrese el monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                bg="gray.800"
                borderColor="gray.600"
              />
            </Box>

            <Button colorScheme="yellow" onClick={handleConvert} isDisabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Convertir'}
            </Button>

            {conversion && (
              <Box mt={4} p={4} bg="gray.700" borderRadius="md" textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  {amount} {fromCurrency} = {conversion} {toCurrency}
                </Text>
              </Box>
            )}

            {error && (
              <Text color="red.300" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" colorScheme="yellow" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DivisasModal;
