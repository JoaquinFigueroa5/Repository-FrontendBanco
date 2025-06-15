import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Card,
  CardBody,
  CardHeader,
  Button,
  IconButton,
  Input,
  Select,
  VStack,
  HStack,
  Badge,
  Avatar,
  Divider,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Plus,
  Send,
  Star,
  TrendingUp,
  Wallet,
  Users,
  History,
  Settings
} from 'lucide-react';
import NavBar from '../commons/NavBar';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../context/UserStore';
import TransferModal from '../Transactions/TransferModa';
import useTransfer from '../../shared/hooks/UseTransfer';
import { useAccount } from '../../shared/hooks/useAccount';
const DashboardUsers = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen: isQuickPayOpen, onOpen: onQuickPayOpen, onClose: onQuickPayClose } = useDisclosure();
  const toast = useToast();

  const [quickPayAmount, setQuickPayAmount] = useState('');
  const [selectedFavorite, setSelectedFavorite] = useState('');
  const { account } = useAccount();  

  const [savingsBalance] = useState(12340.00);
  const [creditLimit] = useState(5000.00);
  const [creditUsed] = useState(1250.00);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', amount: 2500.00, description: 'Salario', date: '2025-06-10', category: 'Trabajo' },
    { id: 2, type: 'expense', amount: 150.00, description: 'Supermercado', date: '2025-06-09', category: 'Alimentación' },
    { id: 3, type: 'expense', amount: 45.00, description: 'Gasolina', date: '2025-06-09', category: 'Transporte' },
    { id: 4, type: 'income', amount: 320.00, description: 'Freelance', date: '2025-06-08', category: 'Trabajo' },
    { id: 5, type: 'expense', amount: 89.99, description: 'Netflix', date: '2025-06-07', category: 'Entretenimiento' },
  ]);

  const [favoriteAccounts] = useState([
    { id: 1, name: 'María García', account: '****1234', bank: 'Banco Nacional', avatar: 'MG' },
    { id: 2, name: 'Juan Pérez', account: '****5678', bank: 'Banco Central', avatar: 'JP' },
    { id: 3, name: 'Ana López', account: '****9012', bank: 'Banco Popular', avatar: 'AL' },
    { id: 4, name: 'Carlos Ruiz', account: '****3456', bank: 'Banco Internacional', avatar: 'CR' },
  ]);

  const { user } = useUserStore();

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const {
    transferTo, setTransferTo,
    transferAmount, setTransferAmount,
    transferConcept, setTransferConcept,
    handleTransfer,
    fromAccountId, setFromAccountId,
    loading, error
  } = useTransfer(() => {
    onTransferClose();
    fetchTransactions(); // refresca la lista en UI
  });

  const fetchTransactions = async () => {
    // Llamá a tu API para traer las transacciones y guardalas en estado
    setTransactions(await api.getTransactions());
  };

  const handleQuickPay = () => {
    if (!quickPayAmount || !selectedFavorite) {
      toast({
        title: 'Error',
        description: 'Selecciona un contacto y monto',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const favorite = favoriteAccounts.find(f => f.id.toString() === selectedFavorite);
    const newTransaction = {
      id: transactions.length + 1,
      type: 'expense',
      amount: parseFloat(quickPayAmount),
      description: `Pago rápido a ${favorite.name}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Pago rápido'
    };

    setTransactions([newTransaction, ...transactions]);
    setQuickPayAmount('');
    setSelectedFavorite('');
    onQuickPayClose();

    toast({
      title: 'Pago realizado',
      description: `Pago de $${quickPayAmount} a ${favorite.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <NavBar />
      {/* Fondo con gradiente sofisticado */}
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%)"
        position="relative"
        overflow="hidden"
      >
        {/* Efectos de fondo decorativos */}
        <Box
          position="absolute"
          top="0"
          right="0"
          width="600px"
          height="600px"
          background="radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)"
          borderRadius="full"
          transform="translate(30%, -30%)"
          zIndex="0"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="400px"
          height="400px"
          background="radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)"
          borderRadius="full"
          transform="translate(-30%, 30%)"
          zIndex="0"
        />

        <Container maxW="7xl" position="relative" zIndex="1" p={4}>
          {/* Header Premium */}
          <Flex justify="space-between" align="center" mb={8} pt={6}>
            <VStack align="start" spacing={2}>
              <HStack spacing={3}>
                <Box
                  width="4px"
                  height="40px"
                  bg="linear-gradient(to bottom, #FFD700, #FFA500)"
                  borderRadius="full"
                />
                <VStack align="start" spacing={1}>
                  <Text
                    fontSize="3xl"
                    fontWeight="800"
                    color="white"
                    letterSpacing="tight"
                  >
                    Bienvenid@, {user?.username}
                  </Text>
                  <Text
                    color="gray.400"
                    fontSize="md"
                    fontWeight="500"
                  >
                    Tu centro financiero personal
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <HStack spacing={4}>
              <Box
                p={3}
                bg="rgba(255, 215, 0, 0.1)"
                borderRadius="xl"
                border="1px solid rgba(255, 215, 0, 0.2)"
              >
                <Text fontSize="sm" color="gold" fontWeight="bold">INICIO</Text>
              </Box>
            </HStack>
          </Flex>

          {/* Balance Cards Premium */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={10}>
            {/* Cuenta Principal */}
            <GridItem>
              <Box
                bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                borderRadius="3xl"
                p={8}
                border="1px solid rgba(255, 215, 0, 0.2)"
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(255, 215, 0, 0.25)'
                }}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                {/* Efecto de brillo */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  height="1px"
                  bg="linear-gradient(90deg, transparent, #FFD700, transparent)"
                />

                <HStack justify="space-between" mb={6}>
                  <HStack spacing={4}>
                    <Box
                      p={4}
                      bg="linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                      borderRadius="2xl"
                      boxShadow="0 8px 25px rgba(255, 215, 0, 0.3)"
                    >
                      <Wallet size={24} color="#000" />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="700" color="white" fontSize="lg">
                        Cuenta Principal
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        Disponible
                      </Text>
                    </VStack>
                  </HStack>
                  <IconButton
                    icon={showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                    variant="ghost"
                    color="gold"
                    _hover={{ bg: 'rgba(255, 215, 0, 0.1)' }}
                    onClick={() => setShowBalance(!showBalance)}
                  />
                </HStack>

                <VStack align="start" spacing={2}>
                  <Text
                    fontSize="4xl"
                    fontWeight="900"
                    color="white"
                    letterSpacing="tight"
                  >
                    {showBalance ? '••••••••' : `Q${account?.balance?.$numberDecimal}`}
                  </Text>
                  <HStack spacing={2}>
                    <Text fontSize="sm" color="gold" fontWeight="600">GTQ</Text>
                    <Box width="4px" height="4px" bg="gray.600" borderRadius="full" />
                    <Text fontSize="sm" color="gray.400">Cuenta Premium</Text>
                  </HStack>
                </VStack>
              </Box>
            </GridItem>

            {/* Ahorros */}
            <GridItem>
              <Box
                bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                borderRadius="3xl"
                p={8}
                border="1px solid rgba(255, 215, 0, 0.1)"
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(0, 255, 136, 0.15)'
                }}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                <HStack spacing={4} mb={6}>
                  <Box
                    p={4}
                    bg="linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)"
                    borderRadius="2xl"
                    boxShadow="0 8px 25px rgba(0, 255, 136, 0.2)"
                  >
                    <TrendingUp size={24} color="#000" />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="700" color="white" fontSize="lg">
                      Ahorros
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Rendimiento activo
                    </Text>
                  </VStack>
                </HStack>

                <VStack align="start" spacing={3}>
                  <Text
                    fontSize="3xl"
                    fontWeight="900"
                    color="white"
                    letterSpacing="tight"
                  >
                    ${savingsBalance.toLocaleString()}
                  </Text>
                  <HStack spacing={3}>
                    <HStack spacing={1}>
                      <Text fontSize="sm" color="#00FF88" fontWeight="bold">+2.1%</Text>
                      <Text fontSize="sm" color="gray.400">este mes</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            </GridItem>

            {/* Crédito */}
            <GridItem>
              <Box
                bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                borderRadius="3xl"
                p={8}
                border="1px solid rgba(255, 215, 0, 0.1)"
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(138, 43, 226, 0.15)'
                }}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                <HStack spacing={4} mb={6}>
                  <Box
                    p={4}
                    bg="linear-gradient(135deg, #8A2BE2 0%, #6A1B9A 100%)"
                    borderRadius="2xl"
                    boxShadow="0 8px 25px rgba(138, 43, 226, 0.2)"
                  >
                    <CreditCard size={24} color="#FFF" />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="700" color="white" fontSize="lg">
                      Línea de Crédito
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Disponible
                    </Text>
                  </VStack>
                </HStack>

                <VStack align="start" spacing={4}>
                  <Text
                    fontSize="3xl"
                    fontWeight="900"
                    color="white"
                    letterSpacing="tight"
                  >
                    ${(creditLimit - creditUsed).toLocaleString()}
                  </Text>

                  <Box width="100%">
                    <Progress
                      value={(creditUsed / creditLimit) * 100}
                      bg="rgba(138, 43, 226, 0.1)"
                      borderRadius="full"
                      size="md"
                      sx={{
                        '& > div': {
                          background: 'linear-gradient(90deg, #8A2BE2, #6A1B9A)',
                        }
                      }}
                    />
                    <HStack justify="space-between" mt={2}>
                      <Text fontSize="sm" color="gray.400">
                        Usado: ${creditUsed.toLocaleString()}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Límite: ${creditLimit.toLocaleString()}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </GridItem>
          </Grid>

          {/* Quick Actions */}
          <Box
            bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
            borderRadius="3xl"
            p={8}
            border="1px solid rgba(255, 215, 0, 0.1)"
            mb={10}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="1px"
              bg="linear-gradient(90deg, transparent, #FFD700, transparent)"
            />

            <HStack spacing={4} mb={8}>
              <Box
                width="6px"
                height="30px"
                bg="linear-gradient(to bottom, #FFD700, #FFA500)"
                borderRadius="full"
              />
              <Text fontSize="2xl" fontWeight="800" color="white">
                Acciones Rápidas
              </Text>
            </HStack>

            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
              <Button
                leftIcon={<Send size={22} />}
                bg="linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                color="black"
                size="xl"
                height="80px"
                borderRadius="2xl"
                fontWeight="700"
                fontSize="lg"
                onClick={() => navigate('/transactions')}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(255, 215, 0, 0.4)'
                }}
                _active={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                Transferir
              </Button>

              <Button
                leftIcon={<Users size={22} />}
                bg="linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)"
                color="black"
                size="xl"
                height="80px"
                borderRadius="2xl"
                fontWeight="700"
                fontSize="lg"
                onClick={onQuickPayOpen}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0, 255, 136, 0.4)'
                }}
                _active={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                Pago Rápido
              </Button>

              <Button
                onClick={() => navigate('/deposits')}
                leftIcon={<DollarSign size={22} />}
                bg="linear-gradient(135deg, #8A2BE2 0%, #6A1B9A 100%)"
                color="white"
                size="xl"
                height="80px"
                borderRadius="2xl"
                fontWeight="700"
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(138, 43, 226, 0.4)'
                }}
                _active={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                Depositar
              </Button>

              <Button
                onClick={() => navigate('/transactions')}
                leftIcon={<History size={22} />}
                bg="linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
                color="white"
                size="xl"
                height="80px"
                borderRadius="2xl"
                fontWeight="700"
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(255, 107, 53, 0.4)'
                }}
                _active={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                Historial
              </Button>
            </Grid>
          </Box>

          {/* Main Content Premium */}
          <Box
            bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
            borderRadius="3xl"
            border="1px solid rgba(255, 215, 0, 0.1)"
            overflow="hidden"
          >
            <Tabs index={activeTab} onChange={setActiveTab}>
              <Box p={8} pb={0}>
                <TabList border="none" gap={4}>
                  <Tab
                    color="gray.400"
                    fontWeight="600"
                    fontSize="lg"
                    _selected={{
                      color: 'gold',
                      borderColor: 'gold',
                      borderWidth: '3px'
                    }}
                    _hover={{ color: 'white' }}
                    borderRadius="lg"
                    px={6}
                    py={3}
                  >
                    Transacciones Recientes
                  </Tab>
                  <Tab
                    color="gray.400"
                    fontWeight="600"
                    fontSize="lg"
                    _selected={{
                      color: 'gold',
                      borderColor: 'gold',
                      borderWidth: '3px'
                    }}
                    _hover={{ color: 'white' }}
                    borderRadius="lg"
                    px={6}
                    py={3}
                  >
                    Cuentas Favoritas
                  </Tab>
                </TabList>
              </Box>

              <TabPanels>
                {/* Transacciones Tab */}
                <TabPanel p={8}>
                  <VStack spacing={6} align="stretch">
                    {transactions.slice(0, 5).map((transaction, index) => (
                      <Box
                        key={transaction.id}
                        p={6}
                        bg="linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)"
                        borderRadius="2xl"
                        border="1px solid rgba(255, 255, 255, 0.05)"
                        _hover={{
                          bg: 'rgba(255, 215, 0, 0.05)',
                          border: '1px solid rgba(255, 215, 0, 0.2)',
                          transform: 'translateY(-2px)'
                        }}
                        transition="all 0.3s ease"
                      >
                        <Flex justify="space-between" align="center">
                          <HStack spacing={4}>
                            <Box
                              p={3}
                              bg={transaction.type === 'income'
                                ? 'linear-gradient(135deg, #00FF88, #00CC6A)'
                                : 'linear-gradient(135deg, #FF4757, #FF3742)'
                              }
                              borderRadius="xl"
                              boxShadow={transaction.type === 'income'
                                ? '0 8px 25px rgba(0, 255, 136, 0.3)'
                                : '0 8px 25px rgba(255, 71, 87, 0.3)'
                              }
                            >
                              {transaction.type === 'income' ?
                                <ArrowDownLeft size={20} color="#000" /> :
                                <ArrowUpRight size={20} color="#FFF" />
                              }
                            </Box>
                            <VStack align="start" spacing={2}>
                              <Text fontWeight="700" color="white" fontSize="lg">
                                {transaction.description}
                              </Text>
                              <HStack spacing={3}>
                                <Badge
                                  bg={transaction.type === 'income' ? '#00FF88' : '#FF4757'}
                                  color={transaction.type === 'income' ? 'black' : 'white'}
                                  borderRadius="full"
                                  px={3}
                                  py={1}
                                  fontWeight="600"
                                >
                                  {transaction.category}
                                </Badge>
                                <Text fontSize="sm" color="gray.400" fontWeight="500">
                                  {transaction.date}
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                          <VStack align="end" spacing={1}>
                            <Text
                              fontSize="xl"
                              fontWeight="900"
                              color={transaction.type === 'income' ? '#00FF88' : '#FF4757'}
                            >
                              {transaction.type === 'income' ? '+' : '-'}$
                              {transaction.amount.toLocaleString()}
                            </Text>
                          </VStack>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>

                {/* Cuentas Favoritas Tab */}
                <TabPanel p={8}>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    {favoriteAccounts.map((account) => (
                      <Box
                        key={account.id}
                        p={6}
                        bg="linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)"
                        borderRadius="2xl"
                        border="1px solid rgba(255, 255, 255, 0.05)"
                        _hover={{
                          bg: 'rgba(255, 215, 0, 0.05)',
                          border: '1px solid rgba(255, 215, 0, 0.2)',
                          transform: 'translateY(-2px)'
                        }}
                        transition="all 0.3s ease"
                        cursor="pointer"
                      >
                        <HStack spacing={4}>
                          <Avatar
                            name={account.avatar}
                            size="lg"
                            bg="linear-gradient(135deg, #FFD700, #FFA500)"
                            color="black"
                            fontWeight="bold"
                          />
                          <VStack align="start" spacing={2} flex="1">
                            <HStack>
                              <Text fontWeight="700" color="white" fontSize="lg">
                                {account.name}
                              </Text>
                              <IconButton
                                icon={<Star size={16} />}
                                variant="ghost"
                                size="sm"
                                color="gold"
                                _hover={{ bg: 'rgba(255, 215, 0, 0.1)' }}
                              />
                            </HStack>
                            <Text fontSize="sm" color="gray.400" fontWeight="500">
                              {account.account} • {account.bank}
                            </Text>
                          </VStack>
                          <Button
                            size="md"
                            bg="linear-gradient(135deg, #FFD700, #FFA500)"
                            color="black"
                            borderRadius="xl"
                            fontWeight="700"
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: '0 10px 25px rgba(255, 215, 0, 0.4)'
                            }}
                            transition="all 0.3s ease"
                            onClick={() => {
                              setSelectedFavorite(account.id.toString());
                              onQuickPayOpen();
                            }}
                          >
                            Enviar
                          </Button>
                        </HStack>
                      </Box>
                    ))}
                  </Grid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Modal de Pago Rápido Premium */}
          <Modal isOpen={isQuickPayOpen} onClose={onQuickPayClose} size="md">
            <ModalOverlay backdropFilter="blur(20px)" bg="rgba(0, 0, 0, 0.8)" />
            <ModalContent
              bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              borderRadius="3xl"
              border="1px solid rgba(255, 215, 0, 0.2)"
            >
              <ModalHeader color="white" fontSize="2xl" fontWeight="800">
                Pago Rápido
              </ModalHeader>
              <ModalCloseButton color="gold" />
              <ModalBody pb={8}>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel color="gray.300" fontWeight="600">Contacto Favorito</FormLabel>
                    <Select
                      placeholder="Seleccionar contacto"
                      value={selectedFavorite}
                      onChange={(e) => setSelectedFavorite(e.target.value)}
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="white"
                      _hover={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}
                      _focus={{ border: '2px solid #FFD700', boxShadow: '0 0 0 3px rgba(255, 215, 0, 0.1)' }}
                      p={4}
                      sx={{
                        '& option': {
                          bg: '#2d2d2d',
                          color: 'white'
                        }
                      }}
                    >
                      {favoriteAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.account}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.300" fontWeight="600">Monto</FormLabel>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={quickPayAmount}
                      onChange={(e) => setQuickPayAmount(e.target.value)}
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="white"
                      _hover={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}
                      _focus={{ border: '2px solid #FFD700', boxShadow: '0 0 0 3px rgba(255, 215, 0, 0.1)' }}
                      p={4}
                    />
                  </FormControl>
                  <Button
                    bg="linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)"
                    color="black"
                    size="lg"
                    width="full"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="lg"
                    height="60px"
                    onClick={handleQuickPay}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 35px rgba(0, 255, 136, 0.4)'
                    }}
                    transition="all 0.3s ease"
                  >
                    Enviar Pago
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

export default DashboardUsers;