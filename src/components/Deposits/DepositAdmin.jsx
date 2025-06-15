import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Box,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Icon,
  InputGroup,
  InputLeftElement,
  HStack,
  Divider
} from '@chakra-ui/react'
import { CreditCard, DollarSign, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { useDeposits } from '../../shared/hooks/useDeposits'

// Componentes con motion
const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const MotionButton = motion(Button)

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
}

const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 15px rgba(218, 165, 32, 0.2)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(218, 165, 32, 0.4)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: {
    scale: 0.98
  }
}

const DepositAdmin = ({ onSuccess }) => {
  const [numberAccount, setNumberAccount] = useState('')
  const [amount, setAmount] = useState('')
  const { createDeposit, isFetching } = useDeposits()
  const toast = useToast()

  const handleDeposit = async () => {
    if (!numberAccount.trim()) {
      toast({
        title: 'Número de cuenta requerido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast({
        title: 'Monto inválido',
        description: 'Ingresa un monto válido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    const res = await createDeposit({ numberAccount, amount }, onSuccess)
    if (res.success) {
      setNumberAccount('')
      setAmount('')
    }
  }

  const isFormValid = numberAccount.trim() && amount && !isNaN(amount) && parseFloat(amount) > 0

  return (
    <MotionBox
      w="100%"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionVStack spacing={6} align='stretch'>
        {/* Header Section */}
        <MotionBox
          variants={itemVariants}
          textAlign="center"
          pb={4}
        >
          <HStack justify="center" mb={3}>
            <Box
              p={3}
              borderRadius="full"
              bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
              border="1px solid rgba(218, 165, 32, 0.2)"
            >
              <Icon
                as={Shield}
                boxSize={6}
                color="rgba(218, 165, 32, 0.9)"
              />
            </Box>
          </HStack>
          <Text
            fontSize='2xl'
            fontWeight='700'
            color="white"
            letterSpacing="-0.02em"
            mb={2}
          >
            Depósito Administrativo
          </Text>
          <Text
            fontSize="sm"
            color="rgba(255, 255, 255, 0.6)"
            lineHeight="1.6"
          >
            Realiza depósitos a cuentas de usuarios con privilegios administrativos
          </Text>

          {/* Decorative divider */}
          <Box mt={4}>
            <Divider
              borderColor="rgba(218, 165, 32, 0.2)"
              borderWidth="1px"
            />
          </Box>
        </MotionBox>

        {/* Form Fields */}
        <MotionVStack spacing={5} variants={itemVariants}>
          {/* Account Number Field */}
          <FormControl>
            <FormLabel
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="600"
              mb={3}
            >
              <Icon as={CreditCard} boxSize={4} mr={2} display="inline" />
              Número de Cuenta
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon
                  as={CreditCard}
                  color="rgba(218, 165, 32, 0.6)"
                  boxSize={4}
                />
              </InputLeftElement>
              <Input
                placeholder='Ingresa el número de cuenta'
                value={numberAccount}
                onChange={e => setNumberAccount(e.target.value)}
                bg="rgba(26, 26, 26, 0.6)"
                border="1px solid rgba(218, 165, 32, 0.2)"
                borderRadius="xl"
                color="white"
                pl={12}
                _placeholder={{
                  color: "rgba(255, 255, 255, 0.4)"
                }}
                _hover={{
                  borderColor: "rgba(218, 165, 32, 0.4)"
                }}
                _focus={{
                  borderColor: "rgba(218, 165, 32, 0.6)",
                  boxShadow: "0 0 0 1px rgba(218, 165, 32, 0.6)",
                  bg: "rgba(26, 26, 26, 0.8)"
                }}
                transition="all 0.3s ease"
              />
            </InputGroup>
          </FormControl>

          {/* Amount Field */}
          <FormControl>
            <FormLabel
              color="rgba(255, 255, 255, 0.9)"
              fontWeight="600"
              mb={3}
            >
              <Icon as={DollarSign} boxSize={4} mr={2} display="inline" />
              Monto a Depositar
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon
                  as={DollarSign}
                  color="rgba(218, 165, 32, 0.6)"
                  boxSize={4}
                />
              </InputLeftElement>
              <Input
                type='number'
                placeholder='0.00'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min={0}
                step="0.01"
                bg="rgba(26, 26, 26, 0.6)"
                border="1px solid rgba(218, 165, 32, 0.2)"
                borderRadius="xl"
                color="white"
                pl={12}
                _placeholder={{
                  color: "rgba(255, 255, 255, 0.4)"
                }}
                _hover={{
                  borderColor: "rgba(218, 165, 32, 0.4)"
                }}
                _focus={{
                  borderColor: "rgba(218, 165, 32, 0.6)",
                  boxShadow: "0 0 0 1px rgba(218, 165, 32, 0.6)",
                  bg: "rgba(26, 26, 26, 0.8)"
                }}
                transition="all 0.3s ease"
              />
            </InputGroup>
          </FormControl>
        </MotionVStack>

        {/* Action Button */}
        <MotionBox variants={itemVariants} pt={4}>
          <MotionButton
            onClick={handleDeposit}
            isLoading={isFetching}
            isDisabled={!isFormValid}
            loadingText="Procesando..."
            size="lg"
            w="100%"
            h="56px"
            borderRadius="xl"
            bg="linear-gradient(135deg, rgba(218, 165, 32, 0.9) 0%, rgba(218, 165, 32, 0.7) 100%)"
            color="black"
            fontWeight="600"
            fontSize="md"
            border="1px solid rgba(218, 165, 32, 0.3)"
            _hover={{
              bg: "linear-gradient(135deg, rgba(218, 165, 32, 1) 0%, rgba(218, 165, 32, 0.8) 100%)",
              _disabled: {
                bg: "rgba(218, 165, 32, 0.3)"
              }
            }}
            _active={{
              bg: "linear-gradient(135deg, rgba(218, 165, 32, 0.8) 0%, rgba(218, 165, 32, 0.6) 100%)"
            }}
            _disabled={{
              bg: "rgba(218, 165, 32, 0.3)",
              color: "rgba(0, 0, 0, 0.4)",
              cursor: "not-allowed",
              opacity: 0.6
            }}
            variants={buttonVariants}
            initial="rest"
            whileHover={!isFetching && isFormValid ? "hover" : "rest"}
            whileTap={!isFetching && isFormValid ? "tap" : "rest"}
            leftIcon={
              <Icon
                as={isFormValid ? CheckCircle : AlertCircle}
                boxSize={5}
              />
            }
          >
            {isFetching ? 'Procesando Depósito...' : 'Realizar Depósito'}
          </MotionButton>
        </MotionBox>

        {/* Security Notice */}
        <MotionBox
          variants={itemVariants}
          bg="rgba(218, 165, 32, 0.05)"
          border="1px solid rgba(218, 165, 32, 0.2)"
          borderRadius="xl"
          p={4}
          mt={4}
        >
          <HStack spacing={3}>
            <Icon
              as={Shield}
              color="rgba(218, 165, 32, 0.8)"
              boxSize={5}
              flexShrink={0}
            />
            <VStack align="start" spacing={1}>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="rgba(218, 165, 32, 0.9)"
              >
                Transacción Segura
              </Text>
              <Text
                fontSize="xs"
                color="rgba(255, 255, 255, 0.6)"
                lineHeight="1.4"
              >
                Todos los depósitos son procesados de forma segura y quedan registrados en el sistema
              </Text>
            </VStack>
          </HStack>
        </MotionBox>
      </MotionVStack>
    </MotionBox>
  )
}

export default DepositAdmin