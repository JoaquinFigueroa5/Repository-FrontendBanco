import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Flex,
  HStack,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { ArrowUpRight } from 'lucide-react';
import { useGetUserTransactions } from '../../shared/hooks/useGetUserTransactions';

const RecentTransactions = () => {
  const { transactions, loading, error } = useGetUserTransactions();
  console.log('Transacciones recibidas:', transactions);

  return (
    <Box
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
      borderRadius="3xl"
      border="1px solid rgba(255, 215, 0, 0.1)"
      overflow="hidden"
      p={8}
    >
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
            _selected={{
              color: 'gold',
              borderColor: 'gold',
              borderWidth: '3px'
            }}
            color="gray.400"
            fontWeight="600"
            fontSize="lg"
          >
            Transacciones Recientes
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <Flex justify="center" align="center" height="100px">
                <Spinner size="lg" color="gold" />
              </Flex>
            ) : error ? (
              <Text color="red.300">{error}</Text>
            ) : (
              <VStack spacing={6} align="stretch">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <Box
                    key={`transaction-${transaction._id ?? index}`}
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
                          bg="linear-gradient(135deg, #FFD700, #FFC107)"
                          borderRadius="xl"
                          boxShadow="0 8px 25px rgba(255, 215, 0, 0.3)"
                        >
                          <ArrowUpRight size={20} color="#000" />
                        </Box>
                        <VStack align="start" spacing={2}>
                          <Text fontWeight="700" color="white" fontSize="lg">
                            {transaction.details}
                          </Text>
                          <Text fontSize="sm" color="gray.400" fontWeight="500">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </Text>
                        </VStack>
                      </HStack>
                      <VStack align="end" spacing={1}>
                        <Text
  fontSize="xl"
  fontWeight="900"
  color={transaction.type === 'income' ? '#00FF88' : '#FF4757'}
>
  {transaction.type === 'income' ? '+' : '-'}$
  {Number(transaction.amount.$numberDecimal).toLocaleString()}
</Text>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RecentTransactions;
