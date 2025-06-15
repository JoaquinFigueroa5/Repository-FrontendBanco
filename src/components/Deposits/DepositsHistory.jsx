import React, { useEffect, useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Avatar,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { BanknoteArrowUp } from 'lucide-react'
import { useDeposits } from '../../shared/hooks/useDeposits'
import { useAccount } from '../../shared/hooks/useAccount'

const MAX_HEIGHT = 780

const DepositsHistory = ({ refresh = 0 }) => {
  const textColor = useColorModeValue('gray.800', 'white')
  const bgColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const depositBg = useColorModeValue('gray.50', 'gray.800')

  const { deposits, isFetching, error, getMyDeposits, revertDeposit } = useDeposits();
  const { account } = useAccount();

  const [, setTick] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    getMyDeposits(account?._id)
  }, [account?._id])

  const formatCurrency = (amount) => {
    const value = parseFloat(amount?.toString?.() || amount);

    if (isNaN(value)) return 'Q0.00';
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(value);
  };



  const getSecondsLeft = (createdAt) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diff = 60 - Math.floor((now - created) / 1000)
    return diff > 0 ? diff : 0
  }

  const sortedDeposits = [...deposits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <Box
      bg={bgColor}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      p={6}
      maxH={`${MAX_HEIGHT}px`}
      overflowY="auto"
      minW="320px"
      shadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Historial de Depósitos
        </Text>
        {isFetching ? (
          <Box textAlign="center" py={8}>
            <Text color={textColor}>Cargando depósitos...</Text>
          </Box>
        ) : error ? (
          <Box textAlign="center" py={8}>
            <Text color={textColor}>Error: {error}</Text>
          </Box>
        ) : sortedDeposits.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color={textColor}>No se encontraron depósitos</Text>
          </Box>
        ) : (
          sortedDeposits.map((deposit, idx) => {
            const secondsLeft = deposit.createdAt ? getSecondsLeft(deposit.createdAt) : 0
            return (
              <Box
                key={deposit._id || idx}
                p={4}
                bg={depositBg}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                _hover={{
                  shadow: 'md',
                  borderColor: `orange.300`,
                }}
                transition="all 0.2s"
              >
                <HStack spacing={4} align="center">
                  <Avatar
                    size="md"
                    bg="orange.100"
                    color="orange.600"
                    icon={<BanknoteArrowUp size={22} />}
                  />
                  <Box flex="1">
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="medium" fontSize="sm" color={textColor}>
                        Depósito recibido
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Cuenta destino: {deposit.accountNumber || 'Desconocido'}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Titular: {deposit.accountHolder || 'Desconocido'}
                      </Text>
                    </VStack>
                  </Box>
                  <VStack spacing={0} align="end">
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color="orange.600"
                    >
                      +{formatCurrency(deposit?.amount.$numberDecimal)}
                    </Text>
                    <Badge colorScheme="orange" variant="solid" fontSize="0.7em" px={2}>
                      Depósito
                    </Badge>
                  </VStack>
                </HStack>
                <HStack justify="space-between" align="center" mt={2}>
                  <Text fontSize="xs" color="gray.500">
                    {deposit.createdAt
                      ? new Date(deposit.createdAt).toLocaleString('es-MX')
                      : 'Fecha desconocida'}
                  </Text>
                  {/* Botón para cancelar si está dentro del minuto y no está revertido */}
                  {secondsLeft > 0 && !deposit.reversed && (
                    <Button
                      size="xs"
                      colorScheme="orange"
                      variant="outline"
                      onClick={async () => {
                        await revertDeposit(deposit._id)
                      }}
                    >
                      Cancelar ({secondsLeft}s)
                    </Button>
                  )}
                  {deposit.reversed && (
                    <Badge colorScheme="red" variant="subtle">Revertido</Badge>
                  )}
                </HStack>
              </Box>
            )
          })
        )}
        <Box textAlign="center" pt={4}>
          <Button variant="solid" colorScheme="orange" size="sm" onClick={() => getMyDeposits(account?._id)}>
            Recargar depósitos
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default DepositsHistory