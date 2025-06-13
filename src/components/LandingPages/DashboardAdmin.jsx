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


const MotionBox = motion(Box);
const MotionCard = motion(Card);

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
  { name: 'Corriente', value: 45, color: '#3182CE' },
  { name: 'Ahorro', value: 35, color: '#38A169' },
  { name: 'Empresarial', value: 15, color: '#D69E2E' },
  { name: 'Premium', value: 5, color: '#9F7AEA' },
];

const alertsData = [
  { id: 1, tipo: 'warning', titulo: 'Transacción Sospechosa', descripcion: 'Actividad inusual detectada en la cuenta ***2847', tiempo: '5 min' },
  { id: 2, tipo: 'error', titulo: 'Fallo del Sistema', descripcion: 'Error en el módulo de pagos - Ticket #2024-001', tiempo: '12 min' },
  { id: 3, tipo: 'success', titulo: 'Backup Completado', descripcion: 'Respaldo diario completado exitosamente', tiempo: '1 hora' },
  { id: 4, tipo: 'info', titulo: 'Mantenimiento Programado', descripcion: 'Mantenimiento del servidor el 15/06 a las 02:00', tiempo: '2 horas' },
];

const StatCard = ({ title, value, change, changeType, icon, color = "blue" }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionCard
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      whileHover={{ y: -4, boxShadow: "xl" }}
      transition={{ duration: 0.2 }}
    >
      <CardBody>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={`${color}.500`}>
              {value}
            </Text>
            <HStack spacing={1} mt={1}>
              {changeType === 'increase' ? (
                <ArrowUpIcon color="green.500" boxSize={3} />
              ) : (
                <ArrowDownIcon color="red.500" boxSize={3} />
              )}
              <Text
                fontSize="sm"
                color={changeType === 'increase' ? 'green.500' : 'red.500'}
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
            p={3}
            borderRadius="full"
            bg={`${color}.50`}
            color={`${color}.500`}
          >
            {icon}
          </Box>
        </Flex>
      </CardBody>
    </MotionCard>
  );
};

const TransactionTable = ({ accountId = '' }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { transactions, loading, error } = useGetTransaction({ accountId, limit: 10, skip: 0 });

  const getStatusColor = (status) => {
  if (typeof status !== 'string') return 'gray';

  switch (status.toLowerCase()) {
    case 'completada':
    case 'completed':
      return 'green';
    case 'pendiente':
    case 'pending':
      return 'yellow';
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
        return 'green';
      case 'transferencia':
        return 'blue';
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
        return <RepeatClockIcon boxSize={5} color="blue.500" />;
      case 'deposito':
        return <ArrowDownIcon boxSize={5} color="green.500" />;
      case 'retiro':
        return <ArrowUpIcon boxSize={5} color="red.500" />;
      case 'compra':
      case 'pago':
        return <CreditCardIcon boxSize={5} color="purple.500" />;
      default:
        return <QuestionOutlineIcon boxSize={5} color="gray.500" />;
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
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      p={6}
    >
      <CardHeader mb={4} px={0}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            Transacciones Recientes
          </Text>
          <HStack spacing={2}>
            <InputGroup size="sm" maxW="200px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Buscar..." />
            </InputGroup>
            <Button size="sm" leftIcon={<DownloadIcon />}>
              Exportar
            </Button>
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody px={0} pt={0}>
        {loading ? (
          <Text textAlign="center" py={4}>
            Cargando transacciones...
          </Text>
        ) : error ? (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : transactions.length === 0 ? (
          <Text textAlign="center" py={4}>
            No hay transacciones recientes
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {transactions.map((transaction) => {
              const icon = getTransactionIcon(transaction);
              const color = getTransactionColor(transaction.type);
              const statusColor = getStatusColor(transaction.status);
              const isPositive = Number(transaction.amount) > 0;
              const amountColor = isPositive ? 'green.600' : 'red.600';

              const userName = transaction.accountId?.userId
                ? `${transaction.accountId.userId.name} ${transaction.accountId.userId.surname}`
                : 'N/A';

              return (
                <Box
                  key={transaction._id}
                  p={4}
                  bg={bgColor}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{ shadow: 'md', borderColor: `${color}.300` }}
                  transition="all 0.2s"
                >
                  <HStack spacing={4} align="start">
                    <Avatar size="md" bg={`${color}.100`} color={`${color}.600`} icon={icon} />
                    <Box flex="1">
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" fontSize="sm">
                            {transaction.details || 'Sin detalles'}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            Usuario: {userName}
                          </Text>
                        </VStack>
                        <VStack spacing={0} align="end">
                          <Text fontSize="md" fontWeight="bold" color={amountColor}>
                            {isPositive ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </Text>
                          <Badge colorScheme={statusColor} variant="solid" fontSize="0.7em" px={2}>
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
                        <Badge variant="subtle" colorScheme={color} fontSize="0.7em">
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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getAlertProps = (tipo) => {
    switch (tipo) {
      case 'warning': return { status: 'warning', icon: WarningIcon };
      case 'error': return { status: 'error', icon: WarningIcon };
      case 'success': return { status: 'success', icon: CheckCircleIcon };
      case 'info': return { status: 'info', icon: InfoIcon };
      default: return { status: 'info', icon: InfoIcon };
    }
  };

  return (
    <MotionCard
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">
          Alertas del Sistema
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3} align="stretch">
          {alertsData.map((alert) => (
            <Alert
              key={alert.id}
              {...getAlertProps(alert.tipo)}
              borderRadius="md"
              variant="left-accent"
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">{alert.titulo}</AlertTitle>
                <AlertDescription fontSize="xs">
                  {alert.descripcion}
                </AlertDescription>
              </Box>
              <Text fontSize="xs" color="gray.500">
                {alert.tiempo}
              </Text>
            </Alert>
          ))}
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

const QuickActions = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const actions = [
    { name: 'Crear Usuario', icon: '👤', color: 'blue' },
    { name: 'Generar Reporte', icon: '📊', color: 'green' },
    { name: 'Configurar Alertas', icon: '🔔', color: 'orange' },
    { name: 'Backup Manual', icon: '💾', color: 'purple' },
    { name: 'Mantenimiento', icon: '🔧', color: 'red' },
    { name: 'Soporte', icon: '🎧', color: 'teal' },
  ];

  return (
    <MotionCard
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">
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
                colorScheme={action.color}
                leftIcon={<Text fontSize="lg">{action.icon}</Text>}
                w="full"
                justifyContent="flex-start"
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
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');


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
    <Box bg={bgColor} minH="100vh" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                Panel de Administración
              </Text>
              <Text color="gray.600">
                Gestión integral de la banca virtual
              </Text>
            </Box>
            <HStack spacing={3}>
              <Select
                size="sm"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                maxW="120px"
              >
                <option value="7d">7 días</option>
                <option value="30d">30 días</option>
                <option value="90d">90 días</option>
                <option value="1y">1 año</option>
              </Select>
              <Button leftIcon={<SettingsIcon />} size="sm">
                Configurar
              </Button>
            </HStack>
          </Flex>
        </MotionBox>

        {/* KPI Cards */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          <StatCard
            title="Usuarios Activos"
            value="2,347"
            change="+12.5%"
            changeType="increase"
            icon={<Text fontSize="2xl">👥</Text>}
            color="blue"
          />
          <StatCard
            title="Transacciones Hoy"
            value="1,248"
            change="+5.2%"
            changeType="increase"
            icon={<Text fontSize="2xl">💳</Text>}
            color="green"
          />
          <StatCard
            title="Volumen Total"
            value="$2.4M"
            change="-2.1%"
            changeType="decrease"
            icon={<Text fontSize="2xl">💰</Text>}
            color="purple"
          />
          <StatCard
            title="Tasa de Error"
            value="0.12%"
            change="-0.05%"
            changeType="increase"
            icon={<Text fontSize="2xl">⚠️</Text>}
            color="red"
          />
        </Grid>

        {/* Charts Section */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Transaction Chart */}
          <MotionCard
            bg={cardBg}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">
                Flujo de Transacciones
              </Text>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="ingresos"
                    stackId="1"
                    stroke="#3182CE"
                    fill="#3182CE"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="egresos"
                    stackId="1"
                    stroke="#E53E3E"
                    fill="#E53E3E"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </MotionCard>

          {/* Account Types */}
          <MotionCard
            bg={cardBg}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </MotionCard>
        </Grid>

        {/* User Growth Chart */}
        <MotionCard
          bg={cardBg}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">
              Crecimiento de Usuarios
            </Text>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#3182CE"
                  strokeWidth={3}
                  dot={{ fill: '#3182CE', strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="activos"
                  stroke="#38A169"
                  strokeWidth={3}
                  dot={{ fill: '#38A169', strokeWidth: 2, r: 6 }}
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
          bg={cardBg}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">
              Estado del Sistema
            </Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              <VStack spacing={2}>
                <Text fontSize="sm" color="gray.600">CPU</Text>
                <Progress value={72} colorScheme="blue" w="full" />
                <Text fontSize="xs">72% - Normal</Text>
              </VStack>
              <VStack spacing={2}>
                <Text fontSize="sm" color="gray.600">Memoria</Text>
                <Progress value={45} colorScheme="green" w="full" />
                <Text fontSize="xs">45% - Óptimo</Text>
              </VStack>
              <VStack spacing={2}>
                <Text fontSize="sm" color="gray.600">Almacenamiento</Text>
                <Progress value={89} colorScheme="orange" w="full" />
                <Text fontSize="xs">89% - Atención</Text>
              </VStack>
            </Grid>
          </CardBody>
        </MotionCard>
      </VStack>
    </Box>
    </>
  );
};

export default DashboardAdmin;