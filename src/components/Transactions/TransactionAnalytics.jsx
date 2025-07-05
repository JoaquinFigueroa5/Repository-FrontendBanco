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
  Badge,
  Icon,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Target,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const TransactionAnalytics = ({ transactions = [] }) => {
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
    transfer: 'rgba(218, 165, 32, 0.9)',
    utilities: 'rgba(251, 146, 60, 0.9)',
    entertainment: 'rgba(168, 85, 247, 0.9)',
    food: 'rgba(34, 197, 94, 0.9)',
    transport: 'rgba(59, 130, 246, 0.9)',
    shopping: 'rgba(236, 72, 153, 0.9)',
    other: 'rgba(156, 163, 175, 0.9)'
  };

  const sortedCategories = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(amount);
  };

  const getPercentage = (amount, total) => {
    return total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
  };

  // Configuración para las tarjetas de estadísticas
  const statsConfig = [
    {
      icon: TrendingUp,
      label: 'Ingresos Totales',
      value: totalIncome,
      color: 'rgba(34, 197, 94, 0.9)',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      shadowColor: 'rgba(34, 197, 94, 0.2)',
      percentage: '12.5%',
      trend: 'increase',
      description: 'vs mes anterior'
    },
    {
      icon: TrendingDown,
      label: 'Gastos Totales',
      value: totalExpenses,
      color: 'rgba(239, 68, 68, 0.9)',
      bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      shadowColor: 'rgba(239, 68, 68, 0.2)',
      percentage: '5.2%',
      trend: 'increase',
      description: 'vs mes anterior'
    },
    {
      icon: DollarSign,
      label: 'Balance Neto',
      value: netBalance,
      color: netBalance >= 0 ? 'rgba(218, 165, 32, 0.9)' : 'rgba(239, 68, 68, 0.9)',
      bgGradient: netBalance >= 0
        ? 'linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
      borderColor: netBalance >= 0 ? 'rgba(218, 165, 32, 0.3)' : 'rgba(239, 68, 68, 0.3)',
      shadowColor: netBalance >= 0 ? 'rgba(218, 165, 32, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      percentage: netBalance >= 0 ? 'Ahorro positivo' : 'Déficit este mes',
      trend: netBalance >= 0 ? 'increase' : 'decrease',
      description: ''
    }
  ];

  return (
    <Box
      bg="black"
      borderRadius="3xl"
      border="2px solid rgba(218, 165, 32, 0.2)"
      overflow="hidden"
      p={8}
      boxShadow="0 0 40px rgba(218, 165, 32, 0.1)"
    >
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={6}
      >
        <HStack justify="space-between" align="center" mb={4}>
          <HStack spacing={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
              border="1px solid rgba(218, 165, 32, 0.2)"
            >
              <Icon as={BarChart3} boxSize={5} color="rgba(218, 165, 32, 0.9)" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text
                fontSize="xl"
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
              >
                Análisis de Transacciones
              </Text>
              <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                Resumen financiero completo
              </Text>
            </VStack>
          </HStack>
          <Badge
            bg="rgba(218, 165, 32, 0.1)"
            color="rgba(218, 165, 32, 0.9)"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="600"
          >
            {transactions.length} Transacciones
          </Badge>
        </HStack>
        <Divider borderColor="rgba(218, 165, 32, 0.2)" />
      </MotionBox>

      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <VStack spacing={6} align="stretch">
          {/* Summary Stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {statsConfig.map((stat, index) => (
              <MotionBox
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Box
                  p={6}
                  bg={stat.bgGradient}
                  borderRadius="2xl"
                  border={`1px solid ${stat.borderColor}`}
                  _hover={{
                    boxShadow: `0 8px 30px ${stat.shadowColor}`,
                    borderColor: stat.color
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  <Flex justify="space-between" align="start" mb={4}>
                    <MotionBox
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box
                        p={3}
                        bg={stat.color}
                        borderRadius="xl"
                        boxShadow={`0 4px 15px ${stat.shadowColor}`}
                        border="2px solid rgba(255, 255, 255, 0.1)"
                      >
                        <Icon as={stat.icon} boxSize={5} color="white" />
                      </Box>
                    </MotionBox>
                  </Flex>

                  <VStack align="start" spacing={3}>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="rgba(255, 255, 255, 0.8)"
                      letterSpacing="0.02em"
                    >
                      {stat.label}
                    </Text>

                    <Text
                      fontSize="2xl"
                      fontWeight="900"
                      color={stat.color}
                      textShadow={`0 0 10px ${stat.shadowColor}`}
                      letterSpacing="-0.02em"
                    >
                      {formatCurrency(stat.value)}
                    </Text>

                    <HStack spacing={2}>
                      <Icon
                        as={stat.trend === 'increase' ? TrendingUp : TrendingDown}
                        boxSize={3}
                        color={stat.color}
                      />
                      <Text fontSize="xs" color={stat.color} fontWeight="600">
                        {stat.percentage}
                      </Text>
                      <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                        {stat.description}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Spending by Category */}
          <MotionBox
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
          >
            <Box
              p={6}
              bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
              borderRadius="2xl"
              border="1px solid rgba(218, 165, 32, 0.3)"
              _hover={{
                boxShadow: "0 8px 30px rgba(218, 165, 32, 0.2)",
                borderColor: "rgba(218, 165, 32, 0.5)"
              }}
              transition="all 0.3s ease"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <HStack spacing={3}>
                    <MotionBox
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box
                        p={3}
                        bg="rgba(218, 165, 32, 0.9)"
                        borderRadius="xl"
                        boxShadow="0 4px 15px rgba(218, 165, 32, 0.2)"
                        border="2px solid rgba(255, 255, 255, 0.1)"
                      >
                        <Icon as={PieChart} boxSize={5} color="white" />
                      </Box>
                    </MotionBox>
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="lg"
                        fontWeight="700"
                        color="white"
                        letterSpacing="-0.02em"
                      >
                        Gastos por Categoría
                      </Text>
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                        Top 5 categorías más gastadas
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge
                    bg="rgba(218, 165, 32, 0.1)"
                    color="rgba(218, 165, 32, 0.9)"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {formatCurrency(totalExpenses)}
                  </Badge>
                </HStack>

                <Divider borderColor="rgba(218, 165, 32, 0.2)" />

                {sortedCategories.length > 0 ? (
                  <VStack spacing={4} align="stretch">
                    {sortedCategories.map(([category, amount], index) => (
                      <MotionBox
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          x: 5,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                      >
                        <Box
                          p={4}
                          bg="rgba(255, 255, 255, 0.02)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.05)"
                          _hover={{
                            bg: "rgba(255, 255, 255, 0.05)",
                            borderColor: categoryColors[category] || 'rgba(218, 165, 32, 0.3)'
                          }}
                          transition="all 0.3s ease"
                        >
                          <HStack justify="space-between" mb={3}>
                            <HStack spacing={3}>
                              <Box
                                w={4}
                                h={4}
                                borderRadius="full"
                                bg={categoryColors[category] || 'rgba(218, 165, 32, 0.9)'}
                                boxShadow={`0 0 10px ${categoryColors[category] || 'rgba(218, 165, 32, 0.5)'}`}
                              />
                              <Text
                                fontSize="sm"
                                fontWeight="600"
                                color="white"
                              >
                                {categoryLabels[category] || category}
                              </Text>
                              <Badge
                                bg="rgba(255, 255, 255, 0.1)"
                                color="rgba(255, 255, 255, 0.8)"
                                borderRadius="full"
                                fontSize="xs"
                                px={2}
                                py={1}
                              >
                                {getPercentage(amount, totalExpenses)}%
                              </Badge>
                            </HStack>
                            <Text
                              fontWeight="700"
                              color={categoryColors[category] || 'rgba(218, 165, 32, 0.9)'}
                              fontSize="sm"
                            >
                              {formatCurrency(amount)}
                            </Text>
                          </HStack>
                          <Progress
                            value={getPercentage(amount, totalExpenses)}
                            bg="rgba(255, 255, 255, 0.1)"
                            sx={{
                              '& > div': {
                                bg: categoryColors[category] || 'rgba(218, 165, 32, 0.9)',
                                boxShadow: `0 0 10px ${categoryColors[category] || 'rgba(218, 165, 32, 0.5)'}`
                              }
                            }}
                            size="sm"
                            borderRadius="full"
                          />
                        </Box>
                      </MotionBox>
                    ))}
                  </VStack>
                ) : (
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    textAlign="center"
                    py={8}
                  >
                    <Icon as={Activity} boxSize={12} color="rgba(255, 255, 255, 0.3)" mb={4} />
                    <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                      No hay datos de gastos para mostrar
                    </Text>
                  </MotionBox>
                )}
              </VStack>
            </Box>
          </MotionBox>

          {/* Monthly Progress */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Savings Progress */}
            <MotionBox
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <Box
                p={6}
                bg="linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)"
                borderRadius="2xl"
                border="1px solid rgba(34, 197, 94, 0.3)"
                _hover={{
                  boxShadow: "0 8px 30px rgba(34, 197, 94, 0.2)",
                  borderColor: "rgba(34, 197, 94, 0.5)"
                }}
                transition="all 0.3s ease"
              >
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3}>
                    <MotionBox
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box
                        p={3}
                        bg="rgba(34, 197, 94, 0.9)"
                        borderRadius="xl"
                        boxShadow="0 4px 15px rgba(34, 197, 94, 0.2)"
                        border="2px solid rgba(255, 255, 255, 0.1)"
                      >
                        <Icon as={Target} boxSize={5} color="white" />
                      </Box>
                    </MotionBox>
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="md"
                        fontWeight="700"
                        color="white"
                        letterSpacing="-0.02em"
                      >
                        Progreso de Ahorro
                      </Text>
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                        Meta mensual
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                        Meta mensual
                      </Text>
                      <Text fontSize="sm" fontWeight="600" color="rgba(34, 197, 94, 0.9)">
                        Q2,000.00
                      </Text>
                    </HStack>

                    <Progress
                      value={Math.min((netBalance / 2000) * 100, 100)}
                      bg="rgba(255, 255, 255, 0.1)"
                      sx={{
                        '& > div': {
                          bg: netBalance >= 2000
                            ? 'rgba(34, 197, 94, 0.9)'
                            : 'rgba(218, 165, 32, 0.9)',
                          boxShadow: netBalance >= 2000
                            ? '0 0 10px rgba(34, 197, 94, 0.5)'
                            : '0 0 10px rgba(218, 165, 32, 0.5)'
                        }
                      }}
                      size="md"
                      borderRadius="full"
                    />

                    <HStack justify="space-between">
                      <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                        Ahorrado: {formatCurrency(Math.max(netBalance, 0))}
                      </Text>
                      <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                        {netBalance >= 2000
                          ? '¡Meta alcanzada!'
                          : `Faltan: ${formatCurrency(2000 - Math.max(netBalance, 0))}`}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>

            {/* Period Summary */}
            <MotionBox
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <Box
                p={6}
                bg="linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
                borderRadius="2xl"
                border="1px solid rgba(168, 85, 247, 0.3)"
                _hover={{
                  boxShadow: "0 8px 30px rgba(168, 85, 247, 0.2)",
                  borderColor: "rgba(168, 85, 247, 0.5)"
                }}
                transition="all 0.3s ease"
              >
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3}>
                    <MotionBox
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box
                        p={3}
                        bg="rgba(168, 85, 247, 0.9)"
                        borderRadius="xl"
                        boxShadow="0 4px 15px rgba(168, 85, 247, 0.2)"
                        border="2px solid rgba(255, 255, 255, 0.1)"
                      >
                        <Icon as={Zap} boxSize={5} color="white" />
                      </Box>
                    </MotionBox>
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="md"
                        fontWeight="700"
                        color="white"
                        letterSpacing="-0.02em"
                      >
                        Resumen del Período
                      </Text>
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                        Estadísticas generales
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                        Transacciones totales
                      </Text>
                      <Badge
                        bg="rgba(168, 85, 247, 0.2)"
                        color="rgba(168, 85, 247, 0.9)"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="600"
                      >
                        {transactions.length}
                      </Badge>
                    </HStack>

                    <HStack justify="space-between">
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                        Promedio por transacción
                      </Text>
                      <Text fontSize="sm" fontWeight="600" color="rgba(168, 85, 247, 0.9)">
                        {formatCurrency(transactions.length > 0
                          ? totalExpenses / transactions.filter(t => t.amount < 0).length || 0
                          : 0)}
                      </Text>
                    </HStack>

                    <HStack justify="space-between">
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                        Transacciones pendientes
                      </Text>
                      <Badge
                        bg="rgba(251, 146, 60, 0.2)"
                        color="rgba(251, 146, 60, 0.9)"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                        fontWeight="600"
                      >
                        {transactions.filter(t => t.status === 'pending').length}
                      </Badge>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>
          </SimpleGrid>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default TransactionAnalytics;