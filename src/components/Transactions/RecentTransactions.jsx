import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Flex,
  HStack,
  Text,
  Spinner,
  Icon,
  Badge,
  Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useGetUserTransactions } from '../../shared/hooks/useGetUserTransactions';

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

const RecentTransactions = () => {
  const { transactions, loading, error } = useGetUserTransactions();

  const getTransactionConfig = (type) => {
    if (type === 'received') {
      return {
        icon: ArrowDownLeft,
        trendIcon: TrendingUp,
        color: 'rgba(34, 197, 94, 0.9)', // Green
        bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        shadowColor: 'rgba(34, 197, 94, 0.2)',
        prefix: '+',
        label: 'Recibido',
        badgeColor: 'green'
      };
    } else {
      return {
        icon: ArrowUpRight,
        trendIcon: TrendingDown,
        color: 'rgba(239, 68, 68, 0.9)', // Red
        bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        shadowColor: 'rgba(239, 68, 68, 0.2)',
        prefix: '-',
        label: 'Enviado',
        badgeColor: 'red'
      };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoy';
    if (diffDays === 2) return 'Ayer';
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`;

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <Icon as={Clock} boxSize={5} color="rgba(218, 165, 32, 0.9)" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text
                fontSize="xl"
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
              >
                Transacciones Recientes
              </Text>
              <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                Últimas 5 transacciones
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
            {transactions?.length || 0} Total
          </Badge>
        </HStack>
        <Divider borderColor="rgba(218, 165, 32, 0.2)" />
      </MotionBox>

      <Tabs variant="unstyled">
        <TabPanels>
          <TabPanel p={0}>
            {loading ? (
              <MotionFlex
                justify="center"
                align="center"
                height="200px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4}>
                  <Box position="relative">
                    <Spinner
                      size="xl"
                      color="rgba(218, 165, 32, 0.8)"
                      thickness="3px"
                    />
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      as={motion.div}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon as={Clock} boxSize={6} color="rgba(218, 165, 32, 0.6)" />
                    </Box>
                  </Box>
                  <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                    Cargando transacciones...
                  </Text>
                </VStack>
              </MotionFlex>
            ) : error ? (
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                textAlign="center"
                py={12}
              >
                <Text color="rgba(239, 68, 68, 0.9)" fontSize="lg" fontWeight="600">
                  {error}
                </Text>
              </MotionBox>
            ) : (
              <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <VStack spacing={4} align="stretch">
                  {transactions?.length === 0 ? (
                    <MotionBox
                      variants={itemVariants}
                      textAlign="center"
                      py={12}
                    >
                      <Icon as={Clock} boxSize={12} color="rgba(255, 255, 255, 0.3)" mb={4} />
                      <Text color="rgba(255, 255, 255, 0.6)" fontSize="lg">
                        No hay transacciones recientes
                      </Text>
                    </MotionBox>
                  ) : (
                    transactions.slice(0, 5).map((transaction, index) => {
                      const config = getTransactionConfig(transaction.type);

                      return (
                        <MotionBox
                          key={`transaction-${transaction._id ?? index}`}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 300, damping: 20 }
                          }}
                        >
                          <Box
                            p={6}
                            bg={config.bgGradient}
                            borderRadius="2xl"
                            border={`1px solid ${config.borderColor}`}
                            _hover={{
                              boxShadow: `0 8px 30px ${config.shadowColor}`,
                              borderColor: config.color
                            }}
                            transition="all 0.3s ease"
                            position="relative"
                            overflow="hidden"
                          >
                            {/* Decorative background pattern */}
                            <Box
                              position="absolute"
                              top="-50%"
                              right="-50%"
                              w="100%"
                              h="100%"
                              opacity={0.03}
                              as={motion.div}
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <Icon as={config.trendIcon} boxSize="full" />
                            </Box>

                            <Flex justify="space-between" align="center" position="relative">
                              <HStack spacing={4}>
                                {/* Transaction Icon */}
                                <MotionBox
                                  whileHover={{ rotate: 5, scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Box
                                    p={3}
                                    bg={config.color}
                                    borderRadius="xl"
                                    boxShadow={`0 4px 15px ${config.shadowColor}`}
                                    border="2px solid rgba(255, 255, 255, 0.1)"
                                  >
                                    <Icon as={config.icon} size={20} color="white" />
                                  </Box>
                                </MotionBox>

                                {/* Transaction Details */}
                                <VStack align="start" spacing={2}>
                                  <HStack spacing={2}>
                                    <Text
                                      fontWeight="700"
                                      color="white"
                                      fontSize="lg"
                                      letterSpacing="-0.02em"
                                    >
                                      {transaction.details}
                                    </Text>
                                    <Badge
                                      colorScheme={config.badgeColor}
                                      variant="subtle"
                                      fontSize="xs"
                                      borderRadius="full"
                                    >
                                      {config.label}
                                    </Badge>
                                  </HStack>

                                  <HStack spacing={3} color="rgba(255, 255, 255, 0.6)">
                                    <HStack spacing={1}>
                                      <Icon as={Clock} boxSize={3} />
                                      <Text fontSize="xs" fontWeight="500">
                                        {formatDate(transaction.createdAt)}
                                      </Text>
                                    </HStack>
                                    <Text fontSize="xs">•</Text>
                                    <Text fontSize="xs" fontWeight="500">
                                      {formatTime(transaction.createdAt)}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </HStack>

                              {/* Amount Display */}
                              <VStack align="end" spacing={1}>
                                <MotionBox
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Text
                                    fontSize="xl"
                                    fontWeight="900"
                                    color={config.color}
                                    textShadow={`0 0 10px ${config.shadowColor}`}
                                    letterSpacing="-0.02em"
                                  >
                                    {config.prefix}Q
                                    {Number(transaction.amount.$numberDecimal).toLocaleString('es-ES', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </Text>
                                </MotionBox>

                                <HStack spacing={1}>
                                  <Icon as={CheckCircle2} boxSize={3} color={config.color} />
                                  <Text fontSize="xs" color="rgba(255, 255, 255, 0.5)" fontWeight="500">
                                    Completado
                                  </Text>
                                </HStack>
                              </VStack>
                            </Flex>
                          </Box>
                        </MotionBox>
                      );
                    })
                  )}
                </VStack>
              </MotionBox>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RecentTransactions;