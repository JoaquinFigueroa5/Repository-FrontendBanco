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
import TransferModal from '../components/Transactions/TransferModa';

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
                          Historial de depósitos
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