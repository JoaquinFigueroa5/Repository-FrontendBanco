import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Flex,
  useColorModeValue,
  Icon,
  Grid,
  GridItem,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import {
  FaCreditCard,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaEllipsisV,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaPiggyBank,
  FaUniversity,
  FaChartLine
} from 'react-icons/fa';
import NavBar from '../commons/NavBar';
import { useGetTransactionsByUserId } from '../../shared/hooks/useGetTransactionsByUserId ';

const GetUserAccount = () => {
  const { userId } = useParams();

  const { transactions, loading, error } = useGetTransactionsByUserId(userId);

  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountNumber: "**** **** **** 1234",
      accountType: "Cuenta Corriente",
      balance: 25847.50,
      currency: "GTQ",
      bank: "Banco Premium",
      color: "linear-gradient(135deg, #FFD700, #FFA500)",
      icon: FaUniversity,
      lastTransaction: "Hace 2 horas",
      status: "active"
    },
    {
      id: 2,
      accountNumber: "**** **** **** 5678",
      accountType: "Cuenta de Ahorros",
      balance: 15420.75,
      currency: "GTQ",
      bank: "Banco Elite",
      color: "linear-gradient(135deg, #2C1810, #8B4513)",
      icon: FaPiggyBank,
      lastTransaction: "Hace 1 día",
      status: "active"
    },
    {
      id: 3,
      accountNumber: "**** **** **** 9012",
      accountType: "Cuenta de Inversión",
      balance: 89234.20,
      currency: "GTQ",
      bank: "Banco Gold",
      color: "linear-gradient(135deg, #DAA520, #B8860B)",
      icon: FaChartLine,
      lastTransaction: "Hace 3 días",
      status: "active"
    }
  ]);

  const [recentTransactions] = useState([
    { id: 1, type: "income", amount: 2500, description: "Transferencia recibida", date: "2024-01-15" },
    { id: 2, type: "expense", amount: 850, description: "Pago de servicios", date: "2024-01-14" },
    { id: 3, type: "income", amount: 1200, description: "Depósito", date: "2024-01-13" },
    { id: 4, type: "expense", amount: 450, description: "Compra online", date: "2024-01-12" }
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const AccountCard = ({ account, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -5,
          transition: { type: "spring", stiffness: 300 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Box
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="20px"
          p={6}
          position="relative"
          overflow="hidden"
          border="1px solid rgba(255, 215, 0, 0.3)"
          backdropFilter="blur(10px)"
          cursor="pointer"
          onClick={() => {
            setSelectedAccount(account);
            onOpen();
          }}
        >
          {/* Gradient overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            background={account.color}
            opacity={0.1}
            borderRadius="20px"
          />

          {/* Animated background particles */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${isHovered ? '60%' : '20%'} ${isHovered ? '40%' : '80%'}, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
          />

          <VStack align="stretch" spacing={4} position="relative" zIndex={1}>
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Box
                  p={3}
                  borderRadius="full"
                  bg="rgba(255, 215, 0, 0.2)"
                  border="1px solid rgba(255, 215, 0, 0.3)"
                >
                  <Icon as={account.icon} color="gold" size="20px" />
                </Box>
                <VStack align="start" spacing={0}>
                  <Text color="gold" fontSize="lg" fontWeight="bold">
                    {account.accountType}
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    {account.bank}
                  </Text>
                </VStack>
              </HStack>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size="sm"
                  color="gold"
                  _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}
                >
                  <Icon as={FaEllipsisV} />
                </MenuButton>
                <MenuList bg="black" border="1px solid gold">
                  <MenuItem bg="black" color="gold" _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}>
                    Ver detalles
                  </MenuItem>
                  <MenuItem bg="black" color="gold" _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}>
                    Transferir
                  </MenuItem>
                  <MenuItem bg="black" color="gold" _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}>
                    Bloquear
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Box>
              <Text color="gray.400" fontSize="sm" mb={1}>
                Número de cuenta
              </Text>
              <Text color="gold" fontSize="md" fontFamily="mono">
                {account.accountNumber}
              </Text>
            </Box>

            <Box>
              <Text color="gray.400" fontSize="sm" mb={1}>
                Saldo disponible
              </Text>
              <HStack>
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  {showBalance ? `Q${account.balance.toLocaleString()}` : "••••••"}
                </Text>
                <Text color="gold" fontSize="lg">
                  {account.currency}
                </Text>
              </HStack>
            </Box>

            <HStack justify="space-between" pt={2}>
              <Text color="gray.500" fontSize="xs">
                {account.lastTransaction}
              </Text>
              <Badge
                bg="rgba(0, 255, 0, 0.2)"
                color="green.400"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
              >
                {account.status.toUpperCase()}
              </Badge>
            </HStack>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, gold, transparent)',
                transformOrigin: 'left'
              }}
            />
          </VStack>
        </Box>
      </motion.div>
    );
  };

  return (
    <>
      <NavBar />
      <Box minH="100vh" bg="black" p={8}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={cardVariants}>
            <Box mb={8}>
              <HStack justify="space-between" align="center" mb={6}>
                <VStack align="start" spacing={2}>
                  <Text color="white" fontSize="3xl" fontWeight="bold">
                    Transacciones
                  </Text>
                  <Text color="gray.400" fontSize="lg">
                    Gestion de finanzas inteligentes.
                  </Text>
                </VStack>
              </HStack>

              {/* Total Balance Card */}
              <Box
                bg="linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05))"
                borderRadius="20px"
                p={6}
                border="1px solid rgba(255, 215, 0, 0.3)"
                backdropFilter="blur(10px)"
                mb={8}
              >
              </Box>
            </Box>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={cardVariants}>
            <Box
              bg="rgba(0, 0, 0, 0.8)"
              borderRadius="20px"
              p={6}
              border="1px solid rgba(255, 215, 0, 0.3)"
              backdropFilter="blur(10px)"
            >
              <Text color="gold" fontSize="xl" fontWeight="bold" mb={4}>
                Transacciones Recientes
              </Text>

              {loading && (
                <Text color="gray.400">Cargando transacciones...</Text>
              )}

              {error && (
                <Text color="red.400">{error}</Text>
              )}

              {!loading && transactions && transactions.length === 0 && (
                <Text color="gray.400">No hay transacciones para este usuario.</Text>
              )}

              {!loading && transactions && transactions.length > 0 && (
                <VStack spacing={4}>
                  {transactions.slice(0, 10).map((transaction) => {

                    // Extraemos el monto correctamente:
                    const amountRaw = transaction.amount;
                    const amount = amountRaw && amountRaw.$numberDecimal
                      ? parseFloat(amountRaw.$numberDecimal)
                      : 0;

                    return (
                      <motion.div
                        key={transaction._id}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{ width: "100%" }}
                      >
                        <HStack
                          justify="space-between"
                          p={4}
                          borderRadius="10px"
                          bg="rgba(255, 215, 0, 0.05)"
                          border="1px solid rgba(255, 215, 0, 0.1)"
                          _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}
                          transition="all 0.3s ease"
                        >
                          <HStack spacing={3}>
                            <Box
                              p={2}
                              borderRadius="full"
                              bg={
                                transaction.type === 'received'
                                  ? 'rgba(0, 255, 0, 0.2)'
                                  : 'rgba(255, 0, 0, 0.2)'
                              }
                            >
                              <Icon
                                as={transaction.type === 'received' ? FaArrowDown : FaArrowUp}
                                color={transaction.type === 'received' ? 'green.400' : 'red.400'}
                                boxSize={4}
                              />
                            </Box>
                            <VStack align="start" spacing={0}>
                              <Text color="white" fontSize="md" fontWeight="medium">
                                {transaction.details || 'Sin detalles'}
                              </Text>
                              <Text color="gray.400" fontSize="sm">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </Text>
                            </VStack>
                          </HStack>

                          <Text
                            color={transaction.type === 'received' ? 'green.400' : 'red.400'}
                            fontSize="lg"
                            fontWeight="bold"
                          >
                            {transaction.type === 'received' ? '+' : '-'}Q{amount.toFixed(2)}
                          </Text>
                        </HStack>
                      </motion.div>
                    );
                  })}
                </VStack>
              )}
            </Box>
          </motion.div>
        </motion.div>

        {/* Account Details Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent bg="black" border="1px solid gold">
            <ModalHeader color="gold">Detalles de la Cuenta</ModalHeader>
            <ModalCloseButton color="gold" />
            <ModalBody pb={6}>
              {selectedAccount && (
                <VStack spacing={6}>
                  <Box textAlign="center">
                    <Icon as={selectedAccount.icon} color="gold" boxSize={12} mb={4} />
                    <Text color="white" fontSize="2xl" fontWeight="bold">
                      {selectedAccount.accountType}
                    </Text>
                    <Text color="gray.400" fontSize="lg">
                      {selectedAccount.bank}
                    </Text>
                  </Box>

                  <Divider borderColor="gold" />

                  <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
                    <VStack align="start">
                      <Text color="gold" fontSize="sm" fontWeight="medium">
                        NÚMERO DE CUENTA
                      </Text>
                      <Text color="white" fontSize="lg" fontFamily="mono">
                        {selectedAccount.accountNumber}
                      </Text>
                    </VStack>

                    <VStack align="start">
                      <Text color="gold" fontSize="sm" fontWeight="medium">
                        SALDO ACTUAL
                      </Text>
                      <Text color="white" fontSize="lg" fontWeight="bold">
                        ${selectedAccount.balance.toLocaleString()} {selectedAccount.currency}
                      </Text>
                    </VStack>
                  </Grid>

                  <HStack spacing={4} w="full">
                    <Button
                      flex={1}
                      bg="linear-gradient(135deg, #FFD700, #FFA500)"
                      color="black"
                      _hover={{ bg: "linear-gradient(135deg, #FFA500, #FFD700)" }}
                    >
                      Transferir
                    </Button>
                    <Button
                      flex={1}
                      variant="outline"
                      borderColor="gold"
                      color="gold"
                      _hover={{ bg: "rgba(255, 215, 0, 0.1)" }}
                    >
                      Ver historial
                    </Button>
                  </HStack>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default GetUserAccount;