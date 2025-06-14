import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  IconButton,
} from '@chakra-ui/react';
import { Eye, EyeOff, CreditCard, TrendingUp } from 'lucide-react';
import { useColorModeValue } from '@chakra-ui/react';
import useUserStore from '../../context/UserStore';
import { useAccount } from '../../shared/hooks/useAccount';

const AccountOverview = ({ refresh }) => {

  const { account, loading, error, fetchAccount } = useAccount();

  const { user } = useUserStore()

  useEffect(() => {
    fetchAccount();
  }, [refresh]);
  const textColor = useColorModeValue('gray.800', 'white');
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <Card bg="gradient-to-r" bgGradient="linear(135deg, brand.500, brand.600)" color="white">
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                <CreditCard size={24} color='black' />
              </Box>
              <VStack spacing={0} align="start">
                <Text fontSize="sm" opacity={0.9} color={textColor}>
                  Cuenta Principal - {user?.username}
                </Text>
                <Text fontSize="xs" opacity={0.7} color={textColor}>
                  {account?.accountNumber}
                </Text>
              </VStack>
            </HStack>
            <Badge colorScheme="green" variant="solid" px={3} py={1} color={textColor}>
              Activa
            </Badge>
          </HStack>

          <Box>
            <HStack justify="space-between" align="center" mb={3}>
              <Text fontSize="sm" opacity={0.8} color={textColor}>
                Saldo Disponible
              </Text>
              <IconButton
                icon={showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                onClick={() => setShowBalance(!showBalance)}
                size="sm"
                variant="ghost"
                color={textColor}
                _hover={{ bg: 'whiteAlpha.200' }}
                aria-label="Toggle balance visibility"
              />
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" mb={2} color={textColor}>
              {showBalance ? `Q ${account?.balance?.$numberDecimal}` : '••••'}
            </Text>

          </Box>


        </VStack>
      </CardBody>
    </Card>
  );
};

export default AccountOverview;