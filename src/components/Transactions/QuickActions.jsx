import React, { useState } from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
  Grid,
  Box,
  Icon,
} from '@chakra-ui/react';
import { Send, CreditCard } from 'lucide-react';
import TransferModal from './TransferModa';
import useTransfer from '../../shared/hooks/UseTransfer';

const QuickActions = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const onTransferOpen = () => setIsTransferOpen(true);
  const onTransferClose = () => setIsTransferOpen(false);

  const {
    transferTo,
    setTransferTo,
    transferAmount,
    setTransferAmount,
    transferConcept,
    setTransferConcept,
    handleTransfer,
    loading,
    error,
  } = useTransfer(() => {
    // Esto se ejecuta cuando la transferencia se hace con éxito
    onTransferClose();
    // Podés refrescar datos aquí si necesitás
  });

  const actions = [
    {
      title: 'Transferir',
      description: 'Envía dinero a otra cuenta',
      icon: Send,
      color: 'brand',
      onClick: onTransferOpen,
    },
    {
      title: 'Pagar Servicios',
      description: 'Paga facturas y servicios',
      icon: CreditCard,
      color: 'green',
      onClick: () => console.log('Pago de servicios'),
    },
  ];

  return (
    <>
      <Card>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2}>
                Acciones Rápidas
              </Text>
              <Text fontSize="sm" color="gray.600">
                Realiza operaciones bancarias fácilmente
              </Text>
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {actions.map((action, index) => (
                <Box
                  key={index}
                  as="button"
                  onClick={action.onClick}
                  p={4}
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.200"
                  bg="white"
                  _hover={{
                    borderColor: `${action.color}.300`,
                    boxShadow: 'md',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      borderRadius="full"
                      bg={`${action.color}.50`}
                      color={`${action.color}.500`}
                    >
                      <Icon as={action.icon} boxSize={6} />
                    </Box>
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                        {action.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" textAlign="center">
                        {action.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </VStack>
        </CardBody>
      </Card>

      <TransferModal
        isOpen={isTransferOpen}
        onClose={onTransferClose}
        transferTo={transferTo}
        setTransferTo={setTransferTo}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        transferConcept={transferConcept}
        setTransferConcept={setTransferConcept}
        handleTransfer={handleTransfer}
      />
    </>
  );
};

export default QuickActions;
