import React, { useState } from 'react';
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

const AccountOverview = ({ balance }) => {
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
                <CreditCard size={24} />
              </Box>
              <VStack spacing={0} align="start">
                <Text fontSize="sm" opacity={0.9}>
                  Cuenta Principal
                </Text>
                <Text fontSize="xs" opacity={0.7}>
                  **** **** **** 1234
                </Text>
              </VStack>
            </HStack>
            <Badge colorScheme="green" variant="solid" px={3} py={1}>
              Activa
            </Badge>
          </HStack>

          <Box>
            <HStack justify="space-between" align="center" mb={3}>
              <Text fontSize="sm" opacity={0.8}>
                Saldo Disponible
              </Text>
              <IconButton
                icon={showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                onClick={() => setShowBalance(!showBalance)}
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                aria-label="Toggle balance visibility"
              />
            </HStack>
            <Text fontSize="3xl" fontWeight="bold" mb={2}>
              {showBalance ? formatCurrency(balance) : '••••••'}
            </Text>
            <HStack>
              <TrendingUp size={16} />
              <Text fontSize="sm" opacity={0.9}>
                +2.5% vs mes anterior
              </Text>
            </HStack>
          </Box>

          <HStack spacing={6}>
            <Stat size="sm">
              <StatLabel color="whiteAlpha.800">Ingresos</StatLabel>
              <StatNumber fontSize="lg" color="white">
                {showBalance ? formatCurrency(3500) : '••••'}
              </StatNumber>
              <StatHelpText color="whiteAlpha.700" mb={0}>
                <StatArrow type="increase" />
                12.5%
              </StatHelpText>
            </Stat>
            <Stat size="sm">
              <StatLabel color="whiteAlpha.800">Gastos</StatLabel>
              <StatNumber fontSize="lg" color="white">
                {showBalance ? formatCurrency(1250) : '••••'}
              </StatNumber>
              <StatHelpText color="whiteAlpha.700" mb={0}>
                <StatArrow type="decrease" />
                8.2%
              </StatHelpText>
            </Stat>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AccountOverview;