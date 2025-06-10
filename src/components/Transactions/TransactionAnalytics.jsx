import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Badge,
} from '@chakra-ui/react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

const TransactionAnalytics = ({ transactions }) => {
  // Calculate analytics
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  // Category spending analysis
  const categorySpending = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      const category = t.category || 'other';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const categoryLabels = {
    transfer: 'Transferencias',
    utilities: 'Servicios Públicos',
    entertainment: 'Entretenimiento',
    food: 'Alimentación',
    transport: 'Transporte',
    shopping: 'Compras',
    other: 'Otros'
  };

  const categoryColors = {
    transfer: 'blue',
    utilities: 'orange',
    entertainment: 'purple',
    food: 'green',
    transport: 'teal',
    shopping: 'pink',
    other: 'gray'
  };

  const sortedCategories = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const getPercentage = (amount, total) => {
    return total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Summary Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="green.600" fontSize="sm" fontWeight="medium">
                <HStack>
                  <TrendingUp size={16} />
                  <Text>Ingresos Totales</Text>
                </HStack>
              </StatLabel>
              <StatNumber color="green.600" fontSize="2xl">
                {formatCurrency(totalIncome)}
              </StatNumber>
              <StatHelpText color="green.500">
                <StatArrow type="increase" />
                12.5% vs mes anterior
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="red.600" fontSize="sm" fontWeight="medium">
                <HStack>
                  <TrendingDown size={16} />
                  <Text>Gastos Totales</Text>
                </HStack>
              </StatLabel>
              <StatNumber color="red.600" fontSize="2xl">
                {formatCurrency(totalExpenses)}
              </StatNumber>
              <StatHelpText color="red.500">
                <StatArrow type="increase" />
                5.2% vs mes anterior
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="brand.600" fontSize="sm" fontWeight="medium">
                <HStack>
                  <DollarSign size={16} />
                  <Text>Balance Neto</Text>
                </HStack>
              </StatLabel>
              <StatNumber color={netBalance >= 0 ? 'green.600' : 'red.600'} fontSize="2xl">
                {formatCurrency(netBalance)}
              </StatNumber>
              <StatHelpText color={netBalance >= 0 ? 'green.500' : 'red.500'}>
                <StatArrow type={netBalance >= 0 ? 'increase' : 'decrease'} />
                {netBalance >= 0 ? 'Ahorro positivo' : 'Déficit este mes'}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Spending by Category */}
      <Card>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <PieChart size={20} color="#0066cc" />
              <Text fontSize="lg" fontWeight="bold">
                Gastos por Categoría
              </Text>
            </HStack>

            {sortedCategories.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {sortedCategories.map(([category, amount]) => (
                  <Box key={category}>
                    <HStack justify="space-between" mb={2}>
                      <HStack>
                        <Badge 
                          colorScheme={categoryColors[category] || 'gray'} 
                          variant="subtle"
                        >
                          {categoryLabels[category] || category}
                        </Badge>
                        <Text fontSize="sm" color="gray.600">
                          {getPercentage(amount, totalExpenses)}%
                        </Text>
                      </HStack>
                      <Text fontWeight="semibold" color="gray.800">
                        {formatCurrency(amount)}
                      </Text>
                    </HStack>
                    <Progress
                      value={getPercentage(amount, totalExpenses)}
                      colorScheme={categoryColors[category] || 'gray'}
                      size="sm"
                      borderRadius="full"
                    />
                  </Box>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">
                  No hay datos de gastos para mostrar
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="bold">
              Comparación Mensual
            </Text>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Text fontSize="md" fontWeight="medium" mb={3}>
                  Progreso de Ahorro
                </Text>
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Meta mensual</Text>
                    <Text fontSize="sm" fontWeight="medium">$2,000.00</Text>
                  </HStack>
                  <Progress
                    value={Math.min((netBalance / 2000) * 100, 100)}
                    colorScheme={netBalance >= 2000 ? 'green' : 'brand'}
                    size="md"
                    borderRadius="full"
                  />
                  <HStack justify="space-between">
                    <Text fontSize="xs" color="gray.500">
                      Ahorrado: {formatCurrency(Math.max(netBalance, 0))}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {netBalance >= 2000 ? '¡Meta alcanzada!' : `Faltan: ${formatCurrency(2000 - Math.max(netBalance, 0))}`}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="medium" mb={3}>
                  Resumen del Período
                </Text>
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Transacciones totales</Text>
                    <Badge colorScheme="brand">{transactions.length}</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Promedio por transacción</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {formatCurrency(transactions.length > 0 ? totalExpenses / transactions.filter(t => t.amount < 0).length : 0)}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Transacciones pendientes</Text>
                    <Badge colorScheme="yellow">
                      {transactions.filter(t => t.status === 'pending').length}
                    </Badge>
                  </HStack>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default TransactionAnalytics;