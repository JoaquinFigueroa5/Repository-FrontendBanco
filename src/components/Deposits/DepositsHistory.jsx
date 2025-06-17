import React, { useEffect, useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Avatar,
  Button,
  Icon,
  Divider,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  BanknoteArrowUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  User,
  RefreshCw,
  Loader,
  XCircle,
} from 'lucide-react'
import { useDeposits } from '../../shared/hooks/useDeposits'
import { useAccount } from '../../shared/hooks/useAccount'
import useUserStore from '../../context/UserStore'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
}

const MAX_HEIGHT = 780

const DepositsHistory = ({ refresh = 0 }) => {
  const { deposits, isFetching, error, getMyDeposits, revertDeposit, fetchDeposits } = useDeposits()
  const { account } = useAccount();
  const { user } = useUserStore();

  const [tick, setTick] = useState(0)
  const [reverting, setReverting] = useState({})

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  if (user?.role !== "ADMIN_ROLE") {
    useEffect(() => {
      getMyDeposits(account?._id)
    }, [account?._id])
  }

  const formatCurrency = (amount) => {
    const value = parseFloat(amount?.toString?.() || amount)

    if (isNaN(value)) return 'Q0.00'
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getSecondsLeft = (createdAt) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diff = 60 - Math.floor((now - created) / 1000)
    return diff > 0 ? diff : 0
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Hoy'
    if (diffDays === 2) return 'Ayer'
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRevertDeposit = async (depositId) => {
    setReverting(prev => ({ ...prev, [depositId]: true }))
    try {
      await revertDeposit(depositId);
      fetchDeposits();
    } finally {
      setReverting(prev => ({ ...prev, [depositId]: false }))
    }
  }

  const sortedDeposits = [...deposits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const getDepositConfig = (deposit) => {
    if (deposit.reversed) {
      return {
        icon: XCircle,
        color: 'rgba(239, 68, 68, 0.9)', // Red
        bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        shadowColor: 'rgba(239, 68, 68, 0.2)',
        statusText: 'Revertido',
        statusBadge: 'red'
      }
    }
    return {
      icon: BanknoteArrowUp,
      color: 'rgba(34, 197, 94, 0.9)', // Green
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      shadowColor: 'rgba(34, 197, 94, 0.2)',
      statusText: 'Completado',
      statusBadge: 'green'
    }
  }

  return (
    <Box
      bg="black"
      borderRadius="3xl"
      border="2px solid rgba(218, 165, 32, 0.2)"
      overflow="hidden"
      p={8}
      maxH={`${MAX_HEIGHT}px`}
      overflowY="auto"
      boxShadow="0 0 40px rgba(218, 165, 32, 0.1)"
      minW="320px"
    >
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={6}
      >
        <HStack justify="space-between" align="center" mb={4}>
          <HStack spacing={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
              border="1px solid rgba(218, 165, 32, 0.2)"
            >
              <Icon as={Wallet} boxSize={5} color="rgba(218, 165, 32, 0.9)" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text
                fontSize="xl"
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
              >
                Historial de Depósitos
              </Text>
              <Text fontSize="sm" color="rgba(255, 255, 255, 0.6)">
                Últimos depósitos recibidos
              </Text>
            </VStack>
          </HStack>
          <Badge
            bg="rgba(218, 165, 32, 0.1)"
            color="rgba(218, 165, 32, 0.9)"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="600"
          >
            {sortedDeposits?.length || 0} Total
          </Badge>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            textAlign="center"
            pt={6}
          >
            <Button
              onClick={() => fetchDeposits()}
              bg="rgba(218, 165, 32, 0.1)"
              border="1px solid rgba(218, 165, 32, 0.3)"
              color="rgba(218, 165, 32, 0.9)"
              _hover={{
                bg: "rgba(218, 165, 32, 0.2)",
                borderColor: "rgba(218, 165, 32, 0.5)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(218, 165, 32, 0.2)"
              }}
              _active={{
                transform: "translateY(0px)"
              }}
              transition="all 0.2s"
              size="sm"
              borderRadius="full"
              fontWeight="600"
              leftIcon={<RefreshCw size={14} />}
            >
              Recargar depósitos
            </Button>
          </MotionBox>
        </HStack>
        <Divider borderColor="rgba(218, 165, 32, 0.2)" />
      </MotionBox>

      {/* Content */}
      {isFetching ? (
        <MotionFlex
          justify="center"
          align="center"
          height="200px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VStack spacing={4}>
            <Box position="relative">
              <Spinner
                size="xl"
                color="rgba(218, 165, 32, 0.8)"
                thickness="3px"
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                as={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Icon as={Wallet} boxSize={6} color="rgba(218, 165, 32, 0.6)" />
              </Box>
            </Box>
            <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
              Cargando depósitos...
            </Text>
          </VStack>
        </MotionFlex>
      ) : error ? (
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          textAlign="center"
          py={12}
        >
          <Icon as={AlertCircle} boxSize={12} color="rgba(239, 68, 68, 0.9)" mb={4} />
          <Text color="rgba(239, 68, 68, 0.9)" fontSize="lg" fontWeight="600">
            Error: {error}
          </Text>
        </MotionBox>
      ) : sortedDeposits.length === 0 ? (
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          textAlign="center"
          py={12}
        >
          <Icon as={Wallet} boxSize={12} color="rgba(255, 255, 255, 0.3)" mb={4} />
          <Text color="rgba(255, 255, 255, 0.6)" fontSize="lg">
            No se encontraron depósitos
          </Text>
        </MotionBox>
      ) : (
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={4} align="stretch">
            {sortedDeposits.map((deposit, idx) => {
              const secondsLeft = deposit.createdAt ? getSecondsLeft(deposit.createdAt) : 0
              const config = getDepositConfig(deposit)

              return (
                <MotionBox
                  key={deposit._id || idx}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <Box
                    p={6}
                    bg={config.bgGradient}
                    borderRadius="2xl"
                    border={`1px solid ${config.borderColor}`}
                    _hover={{
                      boxShadow: `0 8px 30px ${config.shadowColor}`,
                      borderColor: config.color
                    }}
                    transition="all 0.3s ease"
                    position="relative"
                    overflow="hidden"
                  >
                    <Flex justify="space-between" align="start" position="relative">
                      <HStack spacing={4} flex="1">
                        {/* Deposit Icon */}
                        <MotionBox
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Box
                            p={3}
                            bg={config.color}
                            borderRadius="xl"
                            boxShadow={`0 4px 15px ${config.shadowColor}`}
                            border="2px solid rgba(255, 255, 255, 0.1)"
                          >
                            <Icon as={config.icon} boxSize={5} color="white" />
                          </Box>
                        </MotionBox>

                        {/* Deposit Details */}
                        <VStack align="start" spacing={2} flex="1">
                          <HStack spacing={2} flexWrap="wrap">
                            <Text
                              fontWeight="700"
                              color="white"
                              fontSize="md"
                              letterSpacing="-0.02em"
                            >
                              Depósito recibido
                            </Text>
                            <Badge
                              colorScheme={config.statusBadge}
                              variant="subtle"
                              fontSize="xs"
                              borderRadius="full"
                            >
                              {config.statusText}
                            </Badge>
                          </HStack>

                          {/* Account Details */}
                          <VStack align="start" spacing={1}>
                            <HStack spacing={2}>
                              <Icon as={Wallet} boxSize={3} color="rgba(255, 255, 255, 0.6)" />
                              <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                                Cuenta destino: {deposit.numberAccount?.accountNumber || 'Desconocido'}
                              </Text>
                            </HStack>
                            <HStack spacing={2}>
                              <Icon as={User} boxSize={3} color="rgba(255, 255, 255, 0.6)" />
                              <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)">
                                Titular: {deposit.accountHolder || 'Desconocido'}
                              </Text>
                            </HStack>
                          </VStack>

                          {/* Date and Time */}
                          <HStack spacing={3} color="rgba(255, 255, 255, 0.6)">
                            <HStack spacing={1}>
                              <Icon as={Clock} boxSize={3} />
                              <Text fontSize="xs" fontWeight="500">
                                {deposit.createdAt ? formatDate(deposit.createdAt) : 'Fecha desconocida'}
                              </Text>
                            </HStack>
                            <Text fontSize="xs">•</Text>
                            <Text fontSize="xs" fontWeight="500">
                              {deposit.createdAt ? formatTime(deposit.createdAt) : '--:--'}
                            </Text>
                          </HStack>
                        </VStack>
                      </HStack>

                      {/* Amount and Actions */}
                      <VStack align="end" spacing={2}>
                        <MotionBox
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Text
                            fontSize="xl"
                            fontWeight="900"
                            color={config.color}
                            textShadow={`0 0 10px ${config.shadowColor}`}
                            letterSpacing="-0.02em"
                          >
                            +{formatCurrency(deposit?.amount?.$numberDecimal)}
                          </Text>
                        </MotionBox>

                        {/* Action Buttons */}
                        <VStack spacing={2} align="end">
                          {/* Cancel Button */}
                          {secondsLeft > 0 && !deposit.reversed && (
                            <MotionBox
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="xs"
                                bg="rgba(239, 68, 68, 0.1)"
                                border="1px solid rgba(239, 68, 68, 0.3)"
                                color="rgba(239, 68, 68, 0.9)"
                                _hover={{
                                  bg: "rgba(239, 68, 68, 0.2)",
                                  borderColor: "rgba(239, 68, 68, 0.5)",
                                }}
                                _active={{
                                  transform: "scale(0.95)"
                                }}
                                borderRadius="full"
                                fontWeight="600"
                                fontSize="xs"
                                px={3}
                                onClick={() => handleRevertDeposit(deposit?._id)}
                                isLoading={reverting[deposit._id]}
                                loadingText={`${secondsLeft}s`}
                                leftIcon={reverting[deposit._id] ? <Loader size={12} /> : <XCircle size={12} />}
                              >
                                Cancelar ({secondsLeft}s)
                              </Button>
                            </MotionBox>
                          )}

                          {/* Status Badge */}
                          <HStack spacing={1}>
                            <Icon as={CheckCircle2} boxSize={3} color={config.color} />
                            <Text fontSize="xs" color="rgba(255, 255, 255, 0.5)" fontWeight="500">
                              {config.statusText}
                            </Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </Flex>
                  </Box>
                </MotionBox>
              )
            })}
          </VStack>
        </MotionBox>
      )}
    </Box>
  )
}

export default DepositsHistory