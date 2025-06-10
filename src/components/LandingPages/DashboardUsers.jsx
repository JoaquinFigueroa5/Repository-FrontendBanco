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

const DashboardUsers = () => {

  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen: isTransferOpen, onOpen: onTransferOpen, onClose: onTransferClose } = useDisclosure();
  const { isOpen: isQuickPayOpen, onOpen: onQuickPayOpen, onClose: onQuickPayClose } = useDisclosure();
  const toast = useToast();

  // Estados para transacciones
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferConcept, setTransferConcept] = useState('');
  const [quickPayAmount, setQuickPayAmount] = useState('');
  const [selectedFavorite, setSelectedFavorite] = useState('');

  // Datos simulados
  const [balance] = useState(25847.50);
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

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, blue.900, purple.900, pink.900)'
  );

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleTransfer = () => {
    if (!transferAmount || !transferTo || !transferConcept) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: 'expense',
      amount: parseFloat(transferAmount),
      description: `Transferencia a ${transferTo} - ${transferConcept}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Transferencia'
    };

    setTransactions([newTransaction, ...transactions]);
    setTransferAmount('');
    setTransferTo('');
    setTransferConcept('');
    onTransferClose();

    toast({
      title: 'Transferencia exitosa',
      description: `Se transfirieron $${transferAmount} correctamente`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
      <Box minH="100vh" bg={bgGradient} p={4}>
        <Container maxW="7xl">
          {/* Header */}
          <Flex justify="space-between" align="center" mb={8} pt={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                ¡Hola, Ana! 👋
              </Text>
              <Text color="gray.600" fontSize="sm">
                Bienvenida de vuelta a tu banco digital
              </Text>
            </VStack>
            <HStack spacing={3}>
              <IconButton
                icon={<Settings size={20} />}
                variant="ghost"
                borderRadius="full"
                size="lg"
              />
              <Avatar size="md" name="Ana López" bg="purple.500" />
            </HStack>
          </Flex>

          {/* Balance Cards */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
            <GridItem>
              <Card bg={cardBg} shadow="xl" borderRadius="2xl" overflow="hidden">
                <CardBody p={6}>
                  <HStack justify="space-between" mb={4}>
                    <HStack spacing={3}>
                      <Box p={2} bg="blue.100" borderRadius="lg">
                        <Wallet size={20} color="#3182CE" />
                      </Box>
                      <Text fontWeight="semibold" color={textColor}>Cuenta Principal</Text>
                    </HStack>
                    <IconButton
                      icon={showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                    />
                  </HStack>
                  <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                    {showBalance ? `$${balance.toLocaleString()}` : '••••••'}
                  </Text>
                  <Text fontSize="sm" color="gray.500">GTQ • Disponible</Text>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card bg={cardBg} shadow="xl" borderRadius="2xl">
                <CardBody p={6}>
                  <HStack spacing={3} mb={4}>
                    <Box p={2} bg="green.100" borderRadius="lg">
                      <TrendingUp size={20} color="#38A169" />
                    </Box>
                    <Text fontWeight="semibold" color={textColor}>Ahorros</Text>
                  </HStack>
                  <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                    ${savingsBalance.toLocaleString()}
                  </Text>
                  <HStack spacing={1}>
                    <Text fontSize="sm" color="green.500">+2.1%</Text>
                    <Text fontSize="sm" color="gray.500">este mes</Text>
                  </HStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card bg={cardBg} shadow="xl" borderRadius="2xl">
                <CardBody p={6}>
                  <HStack spacing={3} mb={4}>
                    <Box p={2} bg="purple.100" borderRadius="lg">
                      <CreditCard size={20} color="#805AD5" />
                    </Box>
                    <Text fontWeight="semibold" color={textColor}>Crédito</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    ${(creditLimit - creditUsed).toLocaleString()}
                  </Text>
                  <Progress
                    value={(creditUsed / creditLimit) * 100}
                    colorScheme="purple"
                    size="sm"
                    borderRadius="full"
                    mt={2}
                  />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    ${creditUsed.toLocaleString()} de ${creditLimit.toLocaleString()}
                  </Text>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          {/* Quick Actions */}
          <Card bg={cardBg} shadow="xl" borderRadius="2xl" mb={8}>
            <CardHeader>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>Acciones Rápidas</Text>
            </CardHeader>
            <CardBody pt={0}>
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
                <Button
                  leftIcon={<Send size={20} />}
                  colorScheme="blue"
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  p={6}
                  onClick={onTransferOpen}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Transferir
                </Button>
                <Button
                  leftIcon={<Users size={20} />}
                  colorScheme="green"
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  p={6}
                  onClick={onQuickPayOpen}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Pago Rápido
                </Button>
                <Button
                  leftIcon={<DollarSign size={20} />}
                  colorScheme="purple"
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  p={6}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Recargar
                </Button>
                <Button
                  onClick={() => navigate('/transactions')}
                  leftIcon={<History size={20} />}
                  colorScheme="orange"
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  p={6}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                  
                >
                  Historial
                </Button>
              </Grid>
            </CardBody>
          </Card>

          {/* Main Content Tabs */}
          <Card bg={cardBg} shadow="xl" borderRadius="2xl">
            <Tabs index={activeTab} onChange={setActiveTab}>
              <CardHeader>
                <TabList border="none">
                  <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>
                    Transacciones Recientes
                  </Tab>
                  <Tab _selected={{ color: 'purple.500', borderColor: 'purple.500' }}>
                    Cuentas Favoritas
                  </Tab>
                </TabList>
              </CardHeader>

              <TabPanels>
                {/* Transacciones Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    {transactions.slice(0, 5).map((transaction) => (
                      <Box
                        key={transaction.id}
                        p={4}
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="xl"
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                        transition="all 0.2s"
                      >
                        <Flex justify="space-between" align="center">
                          <HStack spacing={3}>
                            <Box
                              p={2}
                              bg={transaction.type === 'income' ? 'green.100' : 'red.100'}
                              borderRadius="lg"
                            >
                              {transaction.type === 'income' ?
                                <ArrowDownLeft size={20} color="#38A169" /> :
                                <ArrowUpRight size={20} color="#E53E3E" />
                              }
                            </Box>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="semibold" color={textColor}>
                                {transaction.description}
                              </Text>
                              <HStack spacing={2}>
                                <Badge
                                  colorScheme={transaction.type === 'income' ? 'green' : 'red'}
                                  borderRadius="full"
                                  px={2}
                                  py={1}
                                >
                                  {transaction.category}
                                </Badge>
                                <Text fontSize="sm" color="gray.500">
                                  {transaction.date}
                                </Text>
                              </HStack>
                            </VStack>
                          </HStack>
                          <VStack align="end" spacing={1}>
                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              color={transaction.type === 'income' ? 'green.500' : 'red.500'}
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
                <TabPanel>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    {favoriteAccounts.map((account) => (
                      <Box
                        key={account.id}
                        p={4}
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="xl"
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.600'), transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                        cursor="pointer"
                      >
                        <HStack spacing={4}>
                          <Avatar name={account.avatar} size="md" bg="blue.500" />
                          <VStack align="start" spacing={1} flex="1">
                            <HStack>
                              <Text fontWeight="bold" color={textColor}>{account.name}</Text>
                              <IconButton
                                icon={<Star size={16} />}
                                variant="ghost"
                                size="sm"
                                color="yellow.500"
                              />
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {account.account} • {account.bank}
                            </Text>
                          </VStack>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            borderRadius="lg"
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
          </Card>

          {/* Modal de Transferencia */}
          <Modal isOpen={isTransferOpen} onClose={onTransferClose} size="md">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent borderRadius="2xl">
              <ModalHeader>Nueva Transferencia</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Destinatario</FormLabel>
                    <Input
                      placeholder="Nombre o número de cuenta"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      borderRadius="lg"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monto</FormLabel>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      borderRadius="lg"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Concepto</FormLabel>
                    <Textarea
                      placeholder="Descripción de la transferencia"
                      value={transferConcept}
                      onChange={(e) => setTransferConcept(e.target.value)}
                      borderRadius="lg"
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    borderRadius="lg"
                    onClick={handleTransfer}
                  >
                    Transferir
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Modal de Pago Rápido */}
          <Modal isOpen={isQuickPayOpen} onClose={onQuickPayClose} size="md">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent borderRadius="2xl">
              <ModalHeader>Pago Rápido</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Contacto Favorito</FormLabel>
                    <Select
                      placeholder="Seleccionar contacto"
                      value={selectedFavorite}
                      onChange={(e) => setSelectedFavorite(e.target.value)}
                      borderRadius="lg"
                    >
                      {favoriteAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.account}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Monto</FormLabel>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={quickPayAmount}
                      onChange={(e) => setQuickPayAmount(e.target.value)}
                      borderRadius="lg"
                    />
                  </FormControl>
                  <Button
                    colorScheme="green"
                    size="lg"
                    width="full"
                    borderRadius="lg"
                    onClick={handleQuickPay}
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