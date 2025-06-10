import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Box,
  Grid,
  Badge,
} from '@chakra-ui/react';
import { CreditCard, Zap, Phone, Wifi, Car, Home } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    provider: '',
    accountNumber: '',
    amount: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const serviceCategories = [
    {
      type: 'utilities',
      name: 'Servicios Públicos',
      icon: Zap,
      color: 'orange',
      providers: [
        { name: 'CFE', description: 'Comisión Federal de Electricidad' },
        { name: 'JAPAC', description: 'Agua Potable' },
        { name: 'Gas Natural', description: 'Servicio de Gas' }
      ]
    },
    {
      type: 'telecommunications',
      name: 'Telecomunicaciones',
      icon: Phone,
      color: 'blue',
      providers: [
        { name: 'Telcel', description: 'Telefonía Móvil' },
        { name: 'Movistar', description: 'Telefonía y Internet' },
        { name: 'AT&T', description: 'Servicios Móviles' }
      ]
    },
    {
      type: 'internet',
      name: 'Internet y TV',
      icon: Wifi,
      color: 'purple',
      providers: [
        { name: 'Telmex', description: 'Internet y Telefonía' },
        { name: 'Megacable', description: 'Internet y TV' },
        { name: 'Sky', description: 'Televisión por Satélite' }
      ]
    },
    {
      type: 'insurance',
      name: 'Seguros',
      icon: Car,
      color: 'green',
      providers: [
        { name: 'GNP', description: 'Seguros Generales' },
        { name: 'BBVA Seguros', description: 'Seguros Bancarios' },
        { name: 'AXA', description: 'Seguros Diversos' }
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceType) {
      newErrors.serviceType = 'Selecciona un tipo de servicio';
    }

    if (!formData.provider) {
      newErrors.provider = 'Selecciona un proveedor';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Ingresa tu número de cuenta/referencia';
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Ingresa un monto válido';
    }

    if (parseFloat(formData.amount) > 5000) {
      newErrors.amount = 'El monto máximo por pago es $5,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const transaction = {
        type: 'payment',
        amount: -parseFloat(formData.amount),
        description: formData.description || `Pago ${formData.provider} - ${formData.accountNumber}`,
        category: formData.serviceType,
        recipient: formData.provider
      };

      onSubmit(transaction);
      
      // Reset form
      setFormData({
        serviceType: '',
        provider: '',
        accountNumber: '',
        amount: '',
        description: ''
      });
      setErrors({});
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const selectedCategory = serviceCategories.find(cat => cat.type === formData.serviceType);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={3}>
            <Box p={2} bg="green.50" borderRadius="lg">
              <CreditCard size={24} color="#38a169" />
            </Box>
            <Text>Pagar Servicios</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                Los pagos se procesan inmediatamente las 24 horas del día
              </Alert>

              <VStack spacing={4} width="full">
                <FormControl isInvalid={errors.serviceType}>
                  <FormLabel>Tipo de Servicio</FormLabel>
                  <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                    {serviceCategories.map((category, index) => {
                      const Icon = category.icon;
                      const isSelected = formData.serviceType === category.type;
                      
                      return (
                        <Box
                          key={index}
                          as="button"
                          type="button"
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            serviceType: category.type,
                            provider: '' 
                          }))}
                          p={4}
                          borderRadius="lg"
                          border="2px"
                          borderColor={isSelected ? `${category.color}.400` : 'gray.200'}
                          bg={isSelected ? `${category.color}.50` : 'white'}
                          _hover={{ 
                            borderColor: `${category.color}.300`,
                            bg: `${category.color}.50` 
                          }}
                          transition="all 0.2s"
                        >
                          <VStack spacing={2}>
                            <Box
                              p={2}
                              borderRadius="lg"
                              bg={`${category.color}.100`}
                              color={`${category.color}.600`}
                            >
                              <Icon size={24} />
                            </Box>
                            <Text fontSize="sm" fontWeight="medium" textAlign="center">
                              {category.name}
                            </Text>
                          </VStack>
                        </Box>
                      );
                    })}
                  </Grid>
                  <FormErrorMessage>{errors.serviceType}</FormErrorMessage>
                </FormControl>

                {selectedCategory && (
                  <FormControl isInvalid={errors.provider}>
                    <FormLabel>Proveedor</FormLabel>
                    <VStack spacing={2} align="stretch">
                      {selectedCategory.providers.map((provider, index) => (
                        <Box
                          key={index}
                          as="button"
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, provider: provider.name }))}
                          p={3}
                          borderRadius="lg"
                          border="1px"
                          borderColor={formData.provider === provider.name ? `${selectedCategory.color}.300` : 'gray.200'}
                          bg={formData.provider === provider.name ? `${selectedCategory.color}.50` : 'white'}
                          _hover={{ borderColor: `${selectedCategory.color}.300` }}
                          textAlign="left"
                        >
                          <HStack justify="space-between">
                            <VStack spacing={0} align="start">
                              <Text fontSize="sm" fontWeight="medium">
                                {provider.name}
                              </Text>
                              <Text fontSize="xs" color="gray.600">
                                {provider.description}
                              </Text>
                            </VStack>
                            {formData.provider === provider.name && (
                              <Badge colorScheme={selectedCategory.color} size="sm">
                                Seleccionado
                              </Badge>
                            )}
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                    <FormErrorMessage>{errors.provider}</FormErrorMessage>
                  </FormControl>
                )}

                {formData.provider && (
                  <>
                    <FormControl isInvalid={errors.accountNumber}>
                      <FormLabel>Número de Cuenta/Referencia</FormLabel>
                      <Input
                        value={formData.accountNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder="Ingresa tu número de referencia"
                      />
                      <FormErrorMessage>{errors.accountNumber}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.amount}>
                      <FormLabel>Monto a Pagar</FormLabel>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                      />
                      <FormErrorMessage>{errors.amount}</FormErrorMessage>
                      {formData.amount && !errors.amount && (
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          Pagarás: {formatCurrency(parseFloat(formData.amount))}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Descripción (Opcional)</FormLabel>
                      <Input
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Concepto del pago"
                      />
                    </FormControl>
                  </>
                )}
              </VStack>

              <HStack spacing={3} width="full" pt={4}>
                <Button variant="outline" onClick={onClose} flex={1}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Procesando..."
                  leftIcon={<CreditCard size={18} />}
                  colorScheme="green"
                  flex={1}
                  isDisabled={!formData.provider || !formData.amount}
                >
                  Pagar Ahora
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;