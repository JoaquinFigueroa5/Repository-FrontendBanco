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
  ArrowUpIcon,
  ArrowDownIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import NavBar from '../commons/NavBar';

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

const recentTransactions = [
  { id: '001', usuario: 'María García', tipo: 'Transferencia', monto: 2500.00, estado: 'Completada', fecha: '2025-06-10 14:30' },
  { id: '002', usuario: 'Carlos López', tipo: 'Depósito', monto: 1200.00, estado: 'Pendiente', fecha: '2025-06-10 13:45' },
  { id: '003', usuario: 'Ana Rodríguez', tipo: 'Retiro', monto: 800.00, estado: 'Completada', fecha: '2025-06-10 12:20' },
  { id: '004', usuario: 'Luis Martín', tipo: 'Pago', monto: 350.00, estado: 'Fallida', fecha: '2025-06-10 11:15' },
  { id: '005', usuario: 'Sofia Chen', tipo: 'Transferencia', monto: 5000.00, estado: 'En revisión', fecha: '2025-06-10 10:00' },
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

const TransactionTable = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada': return 'green';
      case 'Pendiente': return 'yellow';
      case 'Fallida': return 'red';
      case 'En revisión': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <MotionCard
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <CardHeader>
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
      <CardBody pt={0}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Usuario</Th>
              <Th>Tipo</Th>
              <Th isNumeric>Monto</Th>
              <Th>Estado</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentTransactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td fontFamily="mono" fontSize="sm">
                  #{transaction.id}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Avatar size="sm" name={transaction.usuario} />
                    <Text fontSize="sm">{transaction.usuario}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Text fontSize="sm">{transaction.tipo}</Text>
                </Td>
                <Td isNumeric>
                  <Text fontSize="sm" fontWeight="semibold">
                    ${transaction.monto.toLocaleString()}
                  </Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={getStatusColor(transaction.estado)}
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                  >
                    {transaction.estado}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="xs" color="gray.500">
                    {transaction.fecha}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      icon={<ViewIcon />}
                      aria-label="Ver"
                    />
                    <IconButton
                      size="xs"
                      variant="ghost"
                      icon={<EditIcon />}
                      aria-label="Editar"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

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
          <TransactionTable />
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