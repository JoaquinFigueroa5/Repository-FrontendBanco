import React, { useState } from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
  Grid,
  Box,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { Send, CreditCard } from 'lucide-react';
import TransferModal from './TransferModa';
import useTransfer from '../../shared/hooks/UseTransfer';

const QuickActions = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, blue.900, purple.900, pink.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');

  const textColor = useColorModeValue('gray.800', 'white');
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
    fromAccountId,
    setFromAccountId
  } = useTransfer(() => {
    // Esto se ejecuta cuando la transferencia se hace con éxito
    onTransferClose();
    // Podés refrescar datos aquí si necesitás
  });

  const actions = [
    {
      title: 'Transferir',
      description: 'Envía dinero a otra cuenta',
      textColor: textColor,
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
              <Text fontSize="xl" fontWeight="bold" mb={2} color={textColor}>
                Acciones Rápidas
              </Text>
              <Text fontSize="sm" color={textColor}>
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
                      <Text fontSize="sm" fontWeight="semibold" color={action.textColor}>
                        {action.title}
                      </Text>
                      <Text fontSize="xs" color={action.textColor} textAlign="center">
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
        onClose={() => setIsTransferOpen(false)}
        transferTo={transferTo}
        setTransferTo={setTransferTo}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        transferConcept={transferConcept}
        setTransferConcept={setTransferConcept}
        handleTransfer={handleTransfer}
        fromAccountId={fromAccountId}
        setFromAccountId={setFromAccountId}
      />
    </>
  );
};

export default QuickActions;
