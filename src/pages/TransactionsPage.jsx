import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Text,
  Card,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import AccountOverview from '../components/Transactions/AccountOverview';
import QuickActions from '../components/Transactions/QuickActions';
import TransactionHistory from '../components/Transactions/TransactionHistory';
import TransferModal from '../components/Transactions/TransferModal';
import PaymentModal from '../components/Transactions/PaymentModal';
import TransactionAnalytics from '../components/Transactions/TransactionAnalytics';
import NavBar from '../components/commons/NavBar';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'transfer',
      amount: -450.00,
      description: 'Transferencia a Juan Pérez',
      date: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      category: 'transfer',
      recipient: 'Juan Pérez',
      account: '****1234'
    },
    {
      id: '2',
      type: 'payment',
      amount: -189.99,
      description: 'Pago Electricidad - CFE',
      date: new Date('2024-01-14T15:45:00'),
      status: 'completed',
      category: 'utilities',
      recipient: 'CFE'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 3500.00,
      description: 'Depósito de nómina',
      date: new Date('2024-01-13T09:00:00'),
      status: 'completed',
      category: 'income'
    },
    {
      id: '4',
      type: 'transfer',
      amount: -125.50,
      description: 'Transferencia a María González',
      date: new Date('2024-01-12T14:20:00'),
      status: 'completed',
      category: 'transfer',
      recipient: 'María González',
      account: '****5678'
    },
    {
      id: '5',
      type: 'payment',
      amount: -85.00,
      description: 'Pago Teléfono - Telcel',
      date: new Date('2024-01-11T11:10:00'),
      status: 'completed',
      category: 'utilities',
      recipient: 'Telcel'
    },
    {
      id: '6',
      type: 'withdrawal',
      amount: -200.00,
      description: 'Retiro en cajero automático',
      date: new Date('2024-01-10T16:30:00'),
      status: 'completed',
      category: 'other'
    },
    {
      id: '7',
      type: 'payment',
      amount: -45.99,
      description: 'Suscripción Netflix',
      date: new Date('2024-01-09T08:15:00'),
      status: 'completed',
      category: 'entertainment'
    },
    {
      id: '8',
      type: 'transfer',
      amount: -300.00,
      description: 'Transferencia a Carlos Mendoza',
      date: new Date('2024-01-08T12:45:00'),
      status: 'pending',
      category: 'transfer',
      recipient: 'Carlos Mendoza',
      account: '****9012'
    }
  ]);

  const [accountBalance, setAccountBalance] = useState(12485.50);
  const toast = useToast();

  const { isOpen: isTransferOpen, onOpen: onTransferOpen, onClose: onTransferClose } = useDisclosure();
  const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose } = useDisclosure();

  const handleNewTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date(),
      status: 'completed',
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setAccountBalance(prev => prev + transaction.amount);

    toast({
      title: transaction.type === 'transfer' ? 'Transferencia exitosa' : 'Pago procesado',
      description: `${transaction.description} por $${Math.abs(transaction.amount).toFixed(2)}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <NavBar />
      <Box
        bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)"
        minH="100vh"
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
                bgClip="text"
                mb={2}
              >
                Panel de Transacciones
              </Text>
              <Text fontSize="lg" color="gray.300">
                Gestiona tus transferencias, pagos y consulta tu historial bancario
              </Text>
            </Box>

            {/* Main Content */}
            <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
              {/* Left Column */}
              <GridItem>
                <VStack spacing={6} align="stretch">
                  <AccountOverview balance={accountBalance} />
                  <QuickActions
                    onTransferClick={onTransferOpen}
                    onPaymentClick={onPaymentOpen}
                  />
                </VStack>
              </GridItem>

              {/* Right Column */}
              <GridItem>
                <Card
                  bg="rgba(0, 0, 0, 0.8)"
                  border="1px solid"
                  borderColor="rgba(255, 215, 0, 0.3)"
                  backdropFilter="blur(10px)"
                  boxShadow="0 8px 32px rgba(255, 215, 0, 0.15)"
                >
                  <CardBody>
                    <Tabs variant="enclosed">
                      <TabList borderColor="rgba(255, 215, 0, 0.3)">
                        <Tab
                          color="gray.300"
                          _selected={{
                            color: "#FFD700",
                            bg: "rgba(255, 215, 0, 0.1)",
                            borderColor: "#FFD700",
                            borderBottomColor: "rgba(0, 0, 0, 0.8)"
                          }}
                          _hover={{
                            color: "#FFD700",
                            bg: "rgba(255, 215, 0, 0.05)"
                          }}
                        >
                          Historial de Transacciones
                        </Tab>
                        <Tab
                          color="gray.300"
                          _selected={{
                            color: "#FFD700",
                            bg: "rgba(255, 215, 0, 0.1)",
                            borderColor: "#FFD700",
                            borderBottomColor: "rgba(0, 0, 0, 0.8)"
                          }}
                          _hover={{
                            color: "#FFD700",
                            bg: "rgba(255, 215, 0, 0.05)"
                          }}
                        >
                          Análisis Financiero
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel px={0}>
                          <TransactionHistory transactions={transactions} />
                        </TabPanel>
                        <TabPanel px={0}>
                          <TransactionAnalytics transactions={transactions} />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </VStack>
        </Container>

        {/* Modals */}
        <TransferModal
          isOpen={isTransferOpen}
          onClose={onTransferClose}
          onSubmit={handleNewTransaction}
        />
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={onPaymentClose}
          onSubmit={handleNewTransaction}
        />
      </Box>
    </>
  );
};

export default TransactionsPage;