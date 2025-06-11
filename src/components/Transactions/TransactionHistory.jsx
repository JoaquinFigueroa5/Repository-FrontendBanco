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
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft, CreditCard, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useGetTransaction from '../../shared/hooks/useGetTransaction'; // Asegúrate de ajustar la ruta si es necesario

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Usamos el hook personalizado para obtener las transacciones
  const { transactions, total, loading, error } = useGetTransaction({ limit: 20 });

  // Imprimir mensaje en consola dependiendo de las transacciones
  useEffect(() => {
    if (transactions.length > 0) {
      console.log('Transacciones obtenidas:', transactions);
    } else {
      console.log('No hay datos en la base de datos');
    }
  }, [transactions]);

  const getTransactionIcon = (type, amount) => {
    switch (type) {
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
    if (type === 'transfer') return 'blue';
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
      currency: 'MXN'
    }).format(Math.abs(amount));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.recipient && transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <VStack spacing={6} align="stretch">
      {/* Filters */}
      <VStack spacing={4} align="stretch">
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
            <option value="transfer">Transferencias</option>
            <option value="payment">Pagos</option>
            <option value="deposit">Depósitos</option>
            <option value="withdrawal">Retiros</option>
          </Select>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            bg={bgColor}
            minW="130px"
          >
            <option value="all">Todos</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidas</option>
          </Select>
        </HStack>
      </VStack>

      {/* Transaction List */}
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
          filteredTransactions.map((transaction, index) => {
            const Icon = getTransactionIcon(transaction.type, transaction.amount);
            const color = getTransactionColor(transaction.type, transaction.amount);
            
            return (
              <Box
                key={transaction._id}
                p={4}
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
                _hover={{
                  boxShadow: 'md',
                  borderColor: `${color}.200`,
                }}
                transition="all 0.2s"
              >
                <HStack spacing={4} align="center">
                  <Avatar
                    size="md"
                    bg={`${color}.100`}
                    color={`${color}.600`}
                    icon={<Icon size={20} />}
                  />
                  <Box flex="1">
                    <HStack justify="space-between" align="start" mb={1}>
                      <VStack spacing={0} align="start">
                        <Text fontWeight="semibold" fontSize="sm" color="gray.800">
                          {transaction.description}
                        </Text>
                        {transaction.recipient && (
                          <Text fontSize="xs" color="gray.600">
                            Para: {transaction.recipient}
                          </Text>
                        )}
                        {transaction.account && (
                          <Text fontSize="xs" color="gray.500">
                            Cuenta: {transaction.account}
                          </Text>
                        )}
                      </VStack>

                      <VStack spacing={1} align="end">
                        <Text
                          fontWeight="bold"
                          color={transaction.amount > 0 ? 'green.600' : 'red.600'}
                          fontSize="md"
                        >
                          {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </Text>
                        <Badge
                          colorScheme={getStatusColor(transaction.status)}
                          size="sm"
                          variant="subtle"
                        >
                          {getStatusText(transaction.status)}
                        </Badge>
                      </VStack>
                    </HStack>

                    <HStack justify="space-between" align="center">
                      <Text fontSize="xs" color="gray.500">
                        {format(transaction.date, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                      </Text>
                      <Badge variant="outline" colorScheme={color} size="sm">
                        {transaction.category}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            );
          })
        )}
      </VStack>

      {filteredTransactions.length > 0 && (
        <Box textAlign="center" pt={4}>
          <Button variant="outline" size="sm">
            Cargar más transacciones
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default TransactionHistory;