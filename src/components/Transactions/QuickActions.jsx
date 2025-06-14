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
      color: 'yellow',
      onClick: onTransferOpen,
    },
    {
      title: 'Pagar Servicios',
      description: 'Paga facturas y servicios',
      icon: CreditCard,
      color: 'yellow',
      onClick: () => console.log('Pago de servicios'),
    },
  ];

  return (
    <>
      <Card
        bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)"
        border="1px solid"
        borderColor="rgba(255, 215, 0, 0.3)"
        boxShadow="0 10px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)"
        backdropFilter="blur(10px)"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          bgGradient: 'linear(to-r, transparent, #FFD700, transparent)',
          opacity: 0.6,
        }}
      >
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={2}
                bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
                bgClip="text"
                textShadow="0 0 30px rgba(255, 215, 0, 0.3)"
              >
                Acciones Rápidas
              </Text>
              <Text fontSize="sm" color="gray.300" fontWeight="medium">
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
                  border="1px solid"
                  borderColor="rgba(255, 215, 0, 0.2)"
                  bg="linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(26,26,26,0.8) 100%)"
                  backdropFilter="blur(5px)"
                  _hover={{
                    borderColor: 'rgba(255, 215, 0, 0.6)',
                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
                    transform: 'translateY(-2px)',
                    bg: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(26,26,26,0.9) 100%)',
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                >
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      borderRadius="full"
                      bg="linear-gradient(135deg, #FFD700, #FFA500)"
                      boxShadow="0 4px 20px rgba(255, 215, 0, 0.4)"
                      border="1px solid rgba(255, 215, 0, 0.2)"
                      _hover={{
                        boxShadow: '0 6px 25px rgba(255, 215, 0, 0.5)',
                        transform: 'scale(1.05)',
                      }}
                      transition="all 0.2s ease"
                    >
                      <Icon as={action.icon} boxSize={6} />
                    </Box>
                    <VStack spacing={1}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="#FFD700"
                        textShadow="0 0 10px rgba(255, 215, 0, 0.3)"
                      >
                        {action.title}
                      </Text>
                      <Text fontSize="xs" color="gray.400" textAlign="center" fontWeight="medium">
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
