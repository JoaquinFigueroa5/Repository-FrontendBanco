import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  SearchIcon,
  WarningIcon,
  CheckCircleIcon,
  InfoIcon,
  DownloadIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon,
  PhoneIcon,
  EmailIcon,
  CalendarIcon,
  RepeatClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import NavBar from '../commons/NavBar';
import useGetTransaction from '../../shared/hooks/useGetTransaction'
import { CreditCard, Banknote, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Paleta de colores dorados
const goldColors = {
  50: '#FFFBF0',
  100: '#FFF4D6',
  200: '#FFE9AD',
  300: '#FFDB70',
  400: '#FFC53D',
  500: '#D69E2E', // Dorado principal
  600: '#B7791F',
  700: '#975A16',
  800: '#744210',
  900: '#5F370E',
};

const transactionData = [
  { name: 'Ene', ingresos: 4000, egresos: 2400, transferencias: 3200 },
  { name: 'Feb', ingresos: 3000, egresos: 1398, transferencias: 2800 },
  { name: 'Mar', ingresos: 2000, egresos: 9800, transferencias: 3400 },
  { name: 'Abr', ingresos: 2780, egresos: 3908, transferencias: 4200 },
  { name: 'May', ingresos: 1890, egresos: 4800, transferencias: 3800 },
  { name: 'Jun', ingresos: 2390, egresos: 3800, transferencias: 4100 },
];

const userGrowthData = [
  { name: 'Ene', usuarios: 1200, activos: 980 },
  { name: 'Feb', usuarios: 1450, activos: 1180 },
  { name: 'Mar', usuarios: 1680, activos: 1420 },
  { name: 'Abr', usuarios: 1920, activos: 1650 },
  { name: 'May', usuarios: 2100, activos: 1850 },
  { name: 'Jun', usuarios: 2350, activos: 2100 },
];

const accountTypeData = [
  { name: 'Corriente', value: 45, color: '#D69E2E' },
  { name: 'Ahorro', value: 35, color: '#FFC53D' },
  { name: 'Empresarial', value: 15, color: '#B7791F' },
  { name: 'Premium', value: 5, color: '#FFE9AD' },
];

const alertsData = [
  { id: 1, tipo: 'warning', titulo: 'Transacción Sospechosa', descripcion: 'Actividad inusual detectada en la cuenta ***2847', tiempo: '5 min' },
  { id: 2, tipo: 'error', titulo: 'Fallo del Sistema', descripcion: 'Error en el módulo de pagos - Ticket #2024-001', tiempo: '12 min' },
  { id: 3, tipo: 'success', titulo: 'Backup Completado', descripcion: 'Respaldo diario completado exitosamente', tiempo: '1 hora' },
  { id: 4, tipo: 'info', titulo: 'Mantenimiento Programado', descripcion: 'Mantenimiento del servidor el 15/06 a las 02:00', tiempo: '2 horas' },
];

const StatCard = ({ title, value, change, changeType, icon, color = "yellow" }) => {
  return (
    <MotionCard
      bg="gray.900"
      borderColor="yellow.500"
      borderWidth="1px"
      borderRadius="xl"
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(214, 158, 46, 0.3)",
        borderColor: "yellow.400"
      }}
      transition={{ duration: 0.3 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        bgGradient: 'linear(to-r, yellow.400, yellow.600, yellow.400)',
      }}
    >
      <CardBody p={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="sm" color="gray.400" fontWeight="medium" mb={1}>
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
              {value}
            </Text>
            <HStack spacing={1}>
              {changeType === 'increase' ? (
                <ArrowUpIcon color="yellow.400" boxSize={3} />
              ) : (
                <ArrowDownIcon color="red.400" boxSize={3} />
              )}
              <Text
                fontSize="sm"
                color={changeType === 'increase' ? 'yellow.400' : 'red.400'}
                fontWeight="medium"
              >
                {change}
              </Text>
              <Text fontSize="sm" color="gray.500">
                vs mes anterior
              </Text>
            </HStack>
          </Box>
          <Box
            p={4}
            borderRadius="full"
            bg="rgba(214, 158, 46, 0.1)"
            border="1px solid"
            borderColor="yellow.600"
            color="yellow.400"
            fontSize="2xl"
          >
            {icon}
          </Box>
        </Flex>
      </CardBody>
    </MotionCard>
  );
};

const TransactionTable = ({ accountId = '' }) => {
  const { transactions, loading, error } = useGetTransaction({ accountId, limit: 5, skip: 0 });

  const getStatusColor = (status) => {
    if (typeof status !== 'string') return 'gray';

    switch (status.toLowerCase()) {
      case 'completada':
      case 'completed':
        return 'yellow';
      case 'pendiente':
      case 'pending':
        return 'orange';
      case 'fallida':
      case 'failed':
        return 'red';
      case 'en revisión':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getTransactionColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'deposito':
        return 'yellow';
      case 'transferencia':
        return 'orange';
      case 'pago':
      case 'compra':
        return 'purple';
      case 'retiro':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getTransactionIcon = (transaction) => {
    const type = transaction?.type?.toLowerCase();
    switch (type) {
      case 'transferencia':
        return <RepeatClockIcon boxSize={5} color="yellow.400" />;
      case 'deposito':
        return <ArrowDownIcon boxSize={5} color="yellow.400" />;
      case 'retiro':
        return <ArrowUpIcon boxSize={5} color="red.400" />;
      case 'compra':
      case 'pago':
        return <CreditCard size={20} color="#D69E2E" />;
      default:
        return <InfoIcon boxSize={5} color="gray.400" />;
    }
  };

  const formatCurrency = (amount) => {
    const value = Number(amount);
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(Math.abs(value));
  };

  return (
    <MotionCard
      bg="gray.900"
      borderColor="yellow.600"
      borderWidth="1px"
      borderRadius="xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      p={6}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
    >
      <CardHeader mb={4} px={0}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            Transacciones Recientes
          </Text>
          <HStack spacing={2}>
            <InputGroup size="sm" maxW="200px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar..."
                bg="gray.800"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _focus={{ borderColor: 'yellow.400', boxShadow: '0 0 0 1px #D69E2E' }}
              />
            </InputGroup>
            <Button
              size="sm"
              leftIcon={<DownloadIcon />}
              bg="yellow.500"
              color="black"
              _hover={{ bg: 'yellow.400' }}
              fontWeight="bold"
            >
              Exportar
            </Button>
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody px={0} pt={0}>
        {loading ? (
          <Text textAlign="center" py={4} color="gray.400">
            Cargando transacciones...
          </Text>
        ) : error ? (
          <Alert status="error" borderRadius="md" bg="red.900" borderColor="red.500">
            <AlertIcon color="red.400" />
            <AlertTitle color="red.400">Error:</AlertTitle>
            <AlertDescription color="red.300">{error}</AlertDescription>
          </Alert>
        ) : transactions.length === 0 ? (
          <Text textAlign="center" py={4} color="gray.400">
            No hay transacciones recientes
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {transactions.map((transaction) => {
              const icon = getTransactionIcon(transaction);
              const color = getTransactionColor(transaction.type);
              const statusColor = getStatusColor(transaction.status);
              const isPositive = Number(transaction.amount) > 0;
              const amountColor = isPositive ? 'yellow.400' : 'red.400';

              const userName = transaction.accountId?.userId
                ? `${transaction.accountId.userId.name} ${transaction.accountId.userId.surname}`
                : 'N/A';

              return (
                <Box
                  key={transaction._id}
                  p={4}
                  bg="gray.800"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.700"
                  _hover={{
                    shadow: '0 8px 25px rgba(214, 158, 46, 0.2)',
                    borderColor: 'yellow.500',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                >
                  <HStack spacing={4} align="start">
                    <Avatar
                      size="md"
                      bg="rgba(214, 158, 46, 0.1)"
                      color="yellow.400"
                      icon={icon}
                      border="1px solid"
                      borderColor="yellow.600"
                    />
                    <Box flex="1">
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" fontSize="sm" color="white">
                            {transaction.details || 'Sin detalles'}
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            Usuario: {userName}
                          </Text>
                        </VStack>
                        <VStack spacing={0} align="end">
                          <Text fontSize="md" fontWeight="bold" color={amountColor}>
                            {isPositive ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </Text>
                          <Badge
                            colorScheme={statusColor}
                            variant="solid"
                            fontSize="0.7em"
                            px={2}
                            bg={statusColor === 'yellow' ? 'yellow.500' : undefined}
                            color={statusColor === 'yellow' ? 'black' : undefined}
                          >
                            {transaction.status}
                          </Badge>
                        </VStack>
                      </HStack>
                      <HStack justify="space-between" mt={2}>
                        <Text fontSize="xs" color="gray.500">
                          {transaction.createdAt
                            ? format(new Date(transaction.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
                            : 'Fecha desconocida'}
                        </Text>
                        <Badge
                          variant="outline"
                          colorScheme="yellow"
                          fontSize="0.7em"
                          borderColor="yellow.600"
                          color="yellow.400"
                        >
                          {transaction.type}
                        </Badge>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        )}
      </CardBody>
    </MotionCard>
  );
};

const AlertsPanel = () => {
  const getAlertProps = (tipo) => {
    switch (tipo) {
      case 'warning':
        return {
          status: 'warning',
          icon: WarningIcon,
          bg: 'yellow.900',
          borderColor: 'yellow.500',
          iconColor: 'yellow.400',
          titleColor: 'yellow.300',
          descColor: 'yellow.200'
        };
      case 'error':
        return {
          status: 'error',
          icon: WarningIcon,
          bg: 'red.900',
          borderColor: 'red.500',
          iconColor: 'red.400',
          titleColor: 'red.300',
          descColor: 'red.200'
        };
      case 'success':
        return {
          status: 'success',
          icon: CheckCircleIcon,
          bg: 'green.900',
          borderColor: 'green.500',
          iconColor: 'green.400',
          titleColor: 'green.300',
          descColor: 'green.200'
        };
      case 'info':
        return {
          status: 'info',
          icon: InfoIcon,
          bg: 'blue.900',
          borderColor: 'blue.500',
          iconColor: 'blue.400',
          titleColor: 'blue.300',
          descColor: 'blue.200'
        };
      default:
        return {
          status: 'info',
          icon: InfoIcon,
          bg: 'gray.800',
          borderColor: 'gray.500',
          iconColor: 'gray.400',
          titleColor: 'gray.300',
          descColor: 'gray.200'
        };
    }
  };

  return (
    <MotionCard
      bg="gray.900"
      borderColor="yellow.600"
      borderWidth="1px"
      borderRadius="xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Alertas del Sistema
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3} align="stretch">
          {alertsData.map((alert) => {
            const alertProps = getAlertProps(alert.tipo);
            return (
              <Box
                key={alert.id}
                p={3}
                bg={alertProps.bg}
                borderRadius="md"
                border="1px solid"
                borderColor={alertProps.borderColor}
                borderLeftWidth="4px"
              >
                <Flex align="start" gap={3}>
                  <alertProps.icon color={alertProps.iconColor} boxSize={5} mt={0.5} />
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="medium" color={alertProps.titleColor} mb={1}>
                      {alert.titulo}
                    </Text>
                    <Text fontSize="xs" color={alertProps.descColor}>
                      {alert.descripcion}
                    </Text>
                  </Box>
                  <Text fontSize="xs" color="gray.500">
                    {alert.tiempo}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

const QuickActions = () => {
  const actions = [
    { name: 'Crear Usuario', icon: '👤', color: 'yellow', href: '/register' },
    { name: 'Generar Reporte', icon: '📊', color: 'orange', href: '#' },
    { name: 'Configurar Alertas', icon: '🔔', color: 'yellow', href: '#' },
    { name: 'Backup Manual', icon: '💾', color: 'orange', href: '#' },
    { name: 'Mantenimiento', icon: '🔧', color: 'red', href: '#' },
    { name: 'Soporte', icon: '🎧', color: 'yellow', href: '#' },
  ];

  const navigate = useNavigate();

  const handleNavigate = (href) => {
    navigate(href)
  }

  return (
    <MotionCard
      bg="gray.900"
      borderColor="yellow.600"
      borderWidth="1px"
      borderRadius="xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Acciones Rápidas
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          {actions.map((action, index) => (
            <MotionBox
              key={action.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                borderColor="yellow.600"
                color="yellow.400"
                _hover={{
                  bg: 'yellow.500',
                  color: 'black',
                  borderColor: 'yellow.400'
                }}
                leftIcon={<Text fontSize="lg">{action.icon}</Text>}
                w="full"
                justifyContent="flex-start"
                bg="gray.800"
                onClick={() => handleNavigate(action.href)}
              >
                {action.name}
              </Button>
            </MotionBox>
          ))}
        </Grid>
      </CardBody>
    </MotionCard>
  );
};

const DashboardAdmin = () => {
  const { transactions, loading, error } = useGetTransaction({ accountId: '', limit: 100, skip: 0 });

  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const transaccionesHoy = transactions.filter(t => esDeHoy(t.fecha)).length;
  const volumenTotal = transactions.reduce((acc, t) => acc + Number(t.monto || 0), 0);

  // Función auxiliar ejemplo para fecha (puedes mejorar según formato)
  function esDeHoy(fechaStr) {
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    return fecha.toDateString() === hoy.toDateString();
  }

  return (
    <>
      <NavBar />
      <Box bg="black" minH="100vh" p={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, yellow.400, yellow.600)"
                  bgClip="text"
                  mb={2}
                >
                  Panel de Administración
                </Text>
                <Text color="gray.400" fontSize="lg">
                  Gestión integral de la banca virtual
                </Text>
              </Box>
              <Box
                p={4}
                borderRadius="full"
                bg="rgba(214, 158, 46, 0.1)"
                border="2px solid"
                borderColor="yellow.500"
              >
                <SettingsIcon boxSize={8} color="yellow.400" />
              </Box>
            </Flex>
          </MotionBox>

          {/* KPI Cards */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            <StatCard
              title="Usuarios Activos"
              value="2,347"
              change="+12.5%"
              changeType="increase"
              icon="👥"
              color="yellow"
            />
            <StatCard
              title="Transacciones Hoy"
              value="1,248"
              change="+5.2%"
              changeType="increase"
              icon="💳"
              color="yellow"
            />
            <StatCard
              title="Volumen Total"
              value="$2.4M"
              change="-2.1%"
              changeType="decrease"
              icon="💰"
              color="yellow"
            />
            <StatCard
              title="Tasa de Error"
              value="0.12%"
              change="-0.05%"
              changeType="increase"
              icon="⚠️"
              color="yellow"
            />
          </Grid>

          {/* Charts Section */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            {/* Transaction Chart */}
            <MotionCard
              bg="gray.900"
              borderColor="yellow.600"
              borderWidth="1px"
              borderRadius="xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  Flujo de Transacciones
                </Text>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #D69E2E',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="ingresos"
                      stackId="1"
                      stroke="#D69E2E"
                      fill="#D69E2E"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="egresos"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardBody>
            </MotionCard>

            {/* Account Types */}
            <MotionCard
              bg="gray.900"
              borderColor="yellow.600"
              borderWidth="1px"
              borderRadius="xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  Tipos de Cuenta
                </Text>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={accountTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {accountTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #D69E2E',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </MotionCard>
          </Grid>

          {/* User Growth Chart */}
          <MotionCard
            bg="gray.900"
            borderColor="yellow.600"
            borderWidth="1px"
            borderRadius="xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
          >
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Crecimiento de Usuarios
              </Text>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #D69E2E',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="usuarios"
                    stroke="#D69E2E"
                    strokeWidth={3}
                    dot={{ fill: '#D69E2E', strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activos"
                    stroke="#FFC53D"
                    strokeWidth={3}
                    dot={{ fill: '#FFC53D', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </MotionCard>

          {/* Bottom Section */}
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            <TransactionTable transactions={transactions} loading={loading} error={error} />
            <VStack spacing={4} align="stretch">
              <AlertsPanel />
              <QuickActions />
            </VStack>
          </Grid>

          {/* System Status */}
          <MotionCard
            bg="gray.900"
            borderColor="yellow.600"
            borderWidth="1px"
            borderRadius="xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
          >
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Estado del Sistema
              </Text>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.400" fontWeight="medium">CPU</Text>
                  <Box position="relative" w="full">
                    <Progress
                      value={72}
                      colorScheme="yellow"
                      w="full"
                      h="8px"
                      borderRadius="full"
                      bg="gray.700"
                    />
                  </Box>
                  <HStack>
                    <Text fontSize="xs" color="yellow.400" fontWeight="bold">72%</Text>
                    <Text fontSize="xs" color="gray.500">- Normal</Text>
                  </HStack>
                </VStack>
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.400" fontWeight="medium">Memoria</Text>
                  <Box position="relative" w="full">
                    <Progress
                      value={45}
                      colorScheme="green"
                      w="full"
                      h="8px"
                      borderRadius="full"
                      bg="gray.700"
                    />
                  </Box>
                  <HStack>
                    <Text fontSize="xs" color="green.400" fontWeight="bold">45%</Text>
                    <Text fontSize="xs" color="gray.500">- Óptimo</Text>
                  </HStack>
                </VStack>
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.400" fontWeight="medium">Almacenamiento</Text>
                  <Box position="relative" w="full">
                    <Progress
                      value={89}
                      colorScheme="orange"
                      w="full"
                      h="8px"
                      borderRadius="full"
                      bg="gray.700"
                    />
                  </Box>
                  <HStack>
                    <Text fontSize="xs" color="orange.400" fontWeight="bold">89%</Text>
                    <Text fontSize="xs" color="gray.500">- Atención</Text>
                  </HStack>
                </VStack>
              </Grid>

              {/* Additional System Info */}
              <Divider my={6} borderColor="gray.700" />

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={3}>Servicios Activos</Text>
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">API Gateway</Text>
                      <Badge colorScheme="green" variant="solid">Online</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Base de Datos</Text>
                      <Badge colorScheme="green" variant="solid">Online</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Sistema de Pagos</Text>
                      <Badge colorScheme="yellow" variant="solid" bg="yellow.500" color="black">Advertencia</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Notificaciones</Text>
                      <Badge colorScheme="green" variant="solid">Online</Badge>
                    </HStack>
                  </VStack>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.400" mb={3}>Métricas de Rendimiento</Text>
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Latencia Promedio</Text>
                      <Text fontSize="sm" color="yellow.400" fontWeight="bold">45ms</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Throughput</Text>
                      <Text fontSize="sm" color="yellow.400" fontWeight="bold">1.2K req/s</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Uptime</Text>
                      <Text fontSize="sm" color="green.400" fontWeight="bold">99.98%</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="white">Errores 5xx</Text>
                      <Text fontSize="sm" color="red.400" fontWeight="bold">0.02%</Text>
                    </HStack>
                  </VStack>
                </Box>
              </Grid>
            </CardBody>
          </MotionCard>
        </VStack>
      </Box>
    </>
  );
};

export default DashboardAdmin;