import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
  Button,
  Grid,
  Box,
  Icon,
} from '@chakra-ui/react';
import { Send, CreditCard, History, Settings, Plus, ArrowUpRight } from 'lucide-react';

const QuickActions = ({ onTransferClick, onPaymentClick }) => {
  const actions = [
    {
      title: 'Transferir',
      description: 'Envía dinero a otra cuenta',
      icon: Send,
      color: 'brand',
      onClick: onTransferClick,
    },
    {
      title: 'Pagar Servicios',
      description: 'Paga facturas y servicios',
      icon: CreditCard,
      color: 'green',
      onClick: onPaymentClick,
    },
    {
      title: 'Historial',
      description: 'Ver transacciones',
      icon: History,
      color: 'purple',
      onClick: () => console.log('Historial'),
    },
    {
      title: 'Configuración',
      description: 'Ajustes de cuenta',
      icon: Settings,
      color: 'gray',
      onClick: () => console.log('Configuración'),
    },
  ];

  return (
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

          <Box pt={4} borderTop="1px" borderColor="gray.100">
            <Button
              leftIcon={<Plus size={18} />}
              rightIcon={<ArrowUpRight size={16} />}
              variant="outline"
              colorScheme="brand"
              size="sm"
              width="full"
            >
              Más Opciones
            </Button>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default QuickActions;