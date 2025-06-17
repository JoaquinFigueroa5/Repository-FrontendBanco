import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Avatar,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
  Icon,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useGetUserTransactions } from '../../shared/hooks/useGetUserTransactions';
import useUserStore from '../../context/UserStore';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const { transactions, loading, error, refetch } = useGetUserTransactions();
  const { user } = useUserStore();

  const normalizeAmount = (amount) => {
    if (!amount) return 0;
    if (typeof amount === 'object' && '$numberDecimal' in amount) {
      return parseFloat(amount.$numberDecimal);
    }
    return Number(amount);
  };

  const normalizedTransactions = transactions.map(t => ({
    ...t,
    amount: normalizeAmount(t.amount),
    type: typeof t.type === 'string' ? t.type.toLowerCase() : '',
    status: t.status === true ? 'completed' : 'failed',
  }));

  const getTransactionConfig = (type, amount) => {
    // Configuración específica para sent/received
    if (type === 'sent') {
      return {
        icon: ArrowUpRight,
        color: 'rgba(239, 68, 68, 0.9)', // Red
        bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        shadowColor: 'rgba(239, 68, 68, 0.2)',
        prefix: '-',
        label: 'Enviado',
        badgeColor: 'red'
      };
    } else if (type === 'received') {
      return {
        icon: ArrowDownLeft,
        color: 'rgba(34, 197, 94, 0.9)', // Green
        bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        shadowColor: 'rgba(34, 197, 94, 0.2)',
        prefix: '+',
        label: 'Recibido',
        badgeColor: 'green'
      };
    }

    // Configuración para otros tipos con dorado
    switch (type) {
      case 'deposito':
        return {
          icon: ArrowDownLeft,
          color: 'rgba(218, 165, 32, 0.9)', // Gold
          bgGradient: 'linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)',
          borderColor: 'rgba(218, 165, 32, 0.3)',
          shadowColor: 'rgba(218, 165, 32, 0.2)',
          prefix: '+',
          label: 'Depósito',
          badgeColor: 'yellow'
        };
      case 'retiro':
        return {
          icon: ArrowUpRight,
          color: 'rgba(251, 146, 60, 0.9)', // Orange
          bgGradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(251, 146, 60, 0.05) 100%)',
          borderColor: 'rgba(251, 146, 60, 0.3)',
          shadowColor: 'rgba(251, 146, 60, 0.2)',
          prefix: '-',
          label: 'Retiro',
          badgeColor: 'orange'
        };
      case 'reversion':
        return {
          icon: Banknote,
          color: 'rgba(168, 85, 247, 0.9)', // Purple
          bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
          borderColor: 'rgba(168, 85, 247, 0.3)',
          shadowColor: 'rgba(168, 85, 247, 0.2)',
          prefix: '+',
          label: 'Reversión',
          badgeColor: 'purple'
        };
      default:
        return {
          icon: CreditCard,
          color: 'rgba(218, 165, 32, 0.9)', // Gold
          bgGradient: 'linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)',
          borderColor: 'rgba(218, 165, 32, 0.3)',
          shadowColor: 'rgba(218, 165, 32, 0.2)',
          prefix: amount > 0 ? '+' : '-',
          label: 'Transacción',
          badgeColor: 'yellow'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle2,
          color: 'rgba(34, 197, 94, 0.9)',
          text: 'Completada',
          badgeColor: 'green'
        };
      case 'pending':
        return {
          icon: Loader,
          color: 'rgba(251, 146, 60, 0.9)',
          text: 'Pendiente',
          badgeColor: 'orange'
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'rgba(239, 68, 68, 0.9)',
          text: 'Fallida',
          badgeColor: 'red'
        };
      default:
        return {
          icon: Clock,
          color: 'rgba(156, 163, 175, 0.9)',
          text: 'Desconocido',
          badgeColor: 'gray'
        };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(Math.abs(amount));
  };

  const filteredTransactions = normalizedTransactions.filter(transaction => {
    const details = typeof transaction.details === 'string' ? transaction.details : JSON.stringify(transaction.details);
    const matchesSearch = details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

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
                Historial de Transacciones
              </Text>
              <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                Todas tus transacciones
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
            {filteredTransactions?.length || 0} Resultados
          </Badge>
        </HStack>
        <Divider borderColor="rgba(218, 165, 32, 0.2)" />
      </MotionBox>

      {/* Filtros */}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        mb={6}
      >
        <VStack spacing={4}>
          <HStack spacing={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
              border="1px solid rgba(218, 165, 32, 0.2)"
            >
              <Icon as={Filter} boxSize={4} color="rgba(218, 165, 32, 0.9)" />
            </Box>
            <Text fontSize="sm" fontWeight="600" color="white">
              Filtros
            </Text>
          </HStack>

          <HStack spacing={4} w="full" flexWrap="wrap">
            <InputGroup flex="1" minW="200px">
              <InputLeftElement pointerEvents="none">
                <Icon as={Search} color="rgba(255, 255, 255, 0.4)" boxSize={4} />
              </InputLeftElement>
              <Input
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="white"
                _placeholder={{ color: "rgba(255, 255, 255, 0.4)" }}
                _hover={{
                  borderColor: "rgba(218, 165, 32, 0.3)",
                  bg: "rgba(255, 255, 255, 0.08)"
                }}
                _focus={{
                  borderColor: "rgba(218, 165, 32, 0.5)",
                  bg: "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 0 0 1px rgba(218, 165, 32, 0.2)"
                }}
              />
            </InputGroup>

            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              minW="150px"
              _hover={{
                borderColor: "rgba(218, 165, 32, 0.3)",
                bg: "rgba(255, 255, 255, 0.08)"
              }}
              _focus={{
                borderColor: "rgba(218, 165, 32, 0.5)",
                bg: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0 0 1px rgba(218, 165, 32, 0.2)"
              }}
            >
              <option value="all" style={{ background: '#1a1a1a', color: 'white' }}>Todos los tipos</option>
              <option value="sent" style={{ background: '#1a1a1a', color: 'white' }}>Enviado</option>
              <option value="received" style={{ background: '#1a1a1a', color: 'white' }}>Recibido</option>
              <option value="deposito" style={{ background: '#1a1a1a', color: 'white' }}>Depósitos</option>
              <option value="retiro" style={{ background: '#1a1a1a', color: 'white' }}>Retiros</option>
            </Select>

            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              minW="150px"
              _hover={{
                borderColor: "rgba(218, 165, 32, 0.3)",
                bg: "rgba(255, 255, 255, 0.08)"
              }}
              _focus={{
                borderColor: "rgba(218, 165, 32, 0.5)",
                bg: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0 0 1px rgba(218, 165, 32, 0.2)"
              }}
            >
              <option value="all" style={{ background: '#1a1a1a', color: 'white' }}>Todos los estados</option>
              <option value="completed" style={{ background: '#1a1a1a', color: 'white' }}>Completada</option>
              <option value="pending" style={{ background: '#1a1a1a', color: 'white' }}>Pendiente</option>
              <option value="failed" style={{ background: '#1a1a1a', color: 'white' }}>Fallida</option>
            </Select>
          </HStack>
        </VStack>
      </MotionBox>

      {/* Lista de transacciones */}
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon as={Loader} boxSize={8} color="rgba(218, 165, 32, 0.8)" />
              </motion.div>
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
          <Icon as={AlertCircle} boxSize={12} color="rgba(239, 68, 68, 0.9)" mb={4} />
          <Text color="rgba(239, 68, 68, 0.9)" fontSize="lg" fontWeight="600">
            Error: {error}
          </Text>
        </MotionBox>
      ) : filteredTransactions.length === 0 ? (
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          textAlign="center"
          py={12}
        >
          <Icon as={Search} boxSize={12} color="rgba(255, 255, 255, 0.3)" mb={4} />
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="lg">
            No se encontraron transacciones
          </Text>
        </MotionBox>
      ) : (
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={4} align="stretch">
            {filteredTransactions.map((transaction) => {
              const config = getTransactionConfig(transaction.type, transaction.amount);
              const statusConfig = getStatusConfig(transaction.status);

              return (
                <MotionBox
                  key={transaction._id}
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
                    <Flex justify="space-between" align="start" position="relative">
                      <HStack spacing={4} flex="1">
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
                            <Icon as={config.icon} boxSize={5} color="white" />
                          </Box>
                        </MotionBox>

                        {/* Transaction Details */}
                        <VStack align="start" spacing={2} flex="1">
                          <HStack spacing={2} flexWrap="wrap">
                            <Text
                              fontWeight="700"
                              color="white"
                              fontSize="md"
                              letterSpacing="-0.02em"
                            >
                              {typeof transaction.details === 'string'
                                ? transaction.details
                                : JSON.stringify(transaction.details) || 'Sin detalles'}
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

                          {/* Account Details */}
                          {transaction.accountId && (
                            <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                              Cuenta origen: {transaction.accountId.accountNumber || 'N/A'} - {transaction.accountId.userId?.name} {transaction.accountId.userId?.surname}
                            </Text>
                          )}
                          {transaction.destinationAccount && (
                            <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                              Cuenta destino: {transaction.destinationAccount.accountNumber || 'N/A'}
                            </Text>
                          )}

                          {/* Date and Time */}
                          <HStack spacing={3} color="rgba(255, 255, 255, 0.6)">
                            <HStack spacing={1}>
                              <Icon as={Clock} boxSize={3} />
                              <Text fontSize="xs" fontWeight="500">
                                {transaction.createdAt && !isNaN(new Date(transaction.createdAt))
                                  ? format(new Date(transaction.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
                                  : 'Fecha inválida'}
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </HStack>

                      {/* Amount and Status */}
                      <VStack align="end" spacing={2}>
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
                            {config.prefix}{formatCurrency(transaction.amount)}
                          </Text>
                        </MotionBox>

                        <HStack spacing={2}>
                          <Icon as={statusConfig.icon} boxSize={3} color={statusConfig.color} />
                          <Badge
                            colorScheme={statusConfig.badgeColor}
                            variant="solid"
                            fontSize="xs"
                            px={2}
                            borderRadius="full"
                          >
                            {statusConfig.text}
                          </Badge>
                        </HStack>
                      </VStack>
                    </Flex>
                  </Box>
                </MotionBox>
              );
            })}
          </VStack>

          {/* Reload Button */}
          {filteredTransactions.length > 0 && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              textAlign="center"
              pt={6}
            >
              <Button
                onClick={refetch}
                bg="rgba(218, 165, 32, 0.1)"
                border="1px solid rgba(218, 165, 32, 0.3)"
                color="rgba(218, 165, 32, 0.9)"
                _hover={{
                  bg: "rgba(218, 165, 32, 0.2)",
                  borderColor: "rgba(218, 165, 32, 0.5)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 15px rgba(218, 165, 32, 0.2)"
                }}
                _active={{
                  transform: "translateY(0px)"
                }}
                transition="all 0.2s"
                size="sm"
                borderRadius="full"
                fontWeight="600"
              >
                Recargar transacciones
              </Button>
            </MotionBox>
          )}
        </MotionBox>
      )}
    </Box>
  );
};

export default TransactionHistory;