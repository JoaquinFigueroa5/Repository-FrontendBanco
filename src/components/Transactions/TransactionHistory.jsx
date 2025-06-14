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
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useGetUserTransactions } from '../../shared/hooks/useGetUserTransactions'; // Cambia la ruta según corresponda

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Aquí usamos el hook que trae las transacciones del usuario logueado
  const { transactions, loading, error, refetch } = useGetUserTransactions();

  // Convierte Decimal128 a número float para facilitar comparaciones y formateo
  const normalizeAmount = (amount) => {
    if (!amount) return 0;
    if (typeof amount === 'object' && '$numberDecimal' in amount) {
      return parseFloat(amount.$numberDecimal);
    }
    return Number(amount);
  };

  // Normalizamos type y status para filtros, y amount para uso interno
  const normalizedTransactions = transactions.map(t => ({
    ...t,
    amount: normalizeAmount(t.amount),
    type: typeof t.type === 'string' ? t.type.toLowerCase() : '',
    // tu status es booleano true/false, lo convertimos a texto para filtros
    status: t.status === true ? 'completed' : 'failed',
  }));

  const getTransactionIcon = (type, amount) => {
    switch (type) {
      case 'transferencia':
      case 'transfer':
        return amount > 0 ? ArrowDownLeft : ArrowUpRight;
      case 'payment':
        return CreditCard;
      case 'deposit':
        return ArrowDownLeft;
      case 'withdrawal':
        return Banknote;
      default:
        return CreditCard;
    }
  };

  const getTransactionColor = (type, amount) => {
    if (type === 'deposit' || amount > 0) return 'green';
    if (type === 'transfer' || type === 'transferencia') return 'blue';
    if (type === 'payment') return 'orange';
    return 'red';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'yellow';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallida';
      default: return 'Desconocido';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
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
    <VStack spacing={6} align="stretch">
      {/* Filtros */}
      <HStack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search color="gray.400" size={18} />
          </InputLeftElement>
          <Input
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={bgColor}
          />
        </InputGroup>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          bg={bgColor}
          minW="150px"
        >
          <option value="all">Todos los tipos</option>
          <option value="transfer">Transferencia</option>
          <option value="payment">Pagos</option>
          <option value="deposit">Depósitos</option>
          <option value="withdrawal">Retiros</option>
        </Select>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          bg={bgColor}
          minW="150px"
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Completada</option>
          <option value="pending">Pendiente</option>
          <option value="failed">Fallida</option>
        </Select>
      </HStack>

      {/* Lista de transacciones */}
      <VStack spacing={3} align="stretch">
        {loading ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">Cargando transacciones...</Text>
          </Box>
        ) : error ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">Error: {error}</Text>
          </Box>
        ) : filteredTransactions.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No se encontraron transacciones</Text>
          </Box>
        ) : (
          filteredTransactions.map((transaction) => {
            const Icon = getTransactionIcon(transaction.type, transaction.amount);
            const color = getTransactionColor(transaction.type, transaction.amount);

            return (
              <Box
                key={transaction._id}
                p={4}
                bg={bgColor}
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                _hover={{
                  shadow: 'md',
                  borderColor: `${color}.300`,
                }}
                transition="all 0.2s"
              >
                <HStack spacing={4} align="start">
                  <Avatar
                    size="md"
                    bg={`${color}.100`}
                    color={`${color}.600`}
                    icon={<Icon size={22} />}
                  />
                  <Box flex="1">
                    <HStack justify="space-between" align="start">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium" fontSize="sm" color={useColorModeValue('gray.800', 'gray.200')}>
                          {typeof transaction.details === 'string' ? transaction.details : JSON.stringify(transaction.details) || 'Sin detalles'}
                        </Text>
                        {transaction.accountId && (
                          <Text fontSize="xs" color="gray.500">
                            Cuenta origen: {transaction.accountId.accountNumber || 'N/A'} - {transaction.accountId.userId?.name} {transaction.accountId.userId?.surname}
                          </Text>
                        )}
                        {transaction.destinationAccountId && (
                          <Text fontSize="xs" color="gray.500">
                            Cuenta destino: {transaction.destinationAccountId.accountNumber || 'N/A'} - {transaction.destinationAccountId.userId?.name} {transaction.destinationAccountId.userId?.surname}
                          </Text>
                        )}
                      </VStack>
                      <VStack spacing={0} align="end">
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          color={transaction.amount > 0 ? 'green.600' : 'red.600'}
                        >
                          {transaction.amount > 0 ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </Text>
                        <Badge
                          colorScheme={getStatusColor(transaction.status)}
                          variant="solid"
                          fontSize="0.7em"
                          px={2}
                        >
                          {getStatusText(transaction.status)}
                        </Badge>
                      </VStack>
                    </HStack>
                    <HStack justify="space-between" align="center" mt={2}>
                      <Text fontSize="xs" color="gray.500">
                        {transaction.createdAt && !isNaN(new Date(transaction.createdAt))
                          ? format(new Date(transaction.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
                          : 'Fecha inválida'}
                      </Text>
                      <Badge variant="subtle" colorScheme={color} fontSize="0.7em" textTransform="capitalize">
                        {transaction.type || 'desconocido'}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            );
          })
        )}
      </VStack>

      {/* Botón cargar más */}
      {filteredTransactions.length > 0 && (
        <Box textAlign="center" pt={4}>
          <Button variant="outline" size="sm" onClick={refetch}>
            Recargar transacciones
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default TransactionHistory;
