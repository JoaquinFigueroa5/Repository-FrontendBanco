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
  useColorModeValue
} from '@chakra-ui/react';
import NavBar from '../components/commons/NavBar';
import AccountOverview from '../components/Transactions/AccountOverview';
import QuickActions from '../components/Transactions/QuickActions';
import TransactionHistory from '../components/Transactions/TransactionHistory';
import PaymentModal from '../components/Transactions/PaymentModal';
import TransactionAnalytics from '../components/Transactions/TransactionAnalytics';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, blue.900, purple.900, pink.900)'
  );
  const textColor = useColorModeValue('gray.800', 'white');
  
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
    <Box bg={bgGradient} minH="100vh">
      <NavBar/>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Text fontSize="4xl" fontWeight="bold" color={textColor} mb={2}>
              Panel de Transacciones
            </Text>
            <Text fontSize="lg" color={textColor}>
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
              <Card>
                <CardBody>
                  <Tabs variant="enclosed" color={textColor}>
                    <TabList>
                      <Tab>Historial de Transacciones</Tab>
                      <Tab>Análisis Financiero</Tab>
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

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={onPaymentClose}
        onSubmit={handleNewTransaction}
      />
    </Box>
  );
};

export default TransactionsPage;
