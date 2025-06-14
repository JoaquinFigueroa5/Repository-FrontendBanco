import { useState } from 'react'
import { 
    Box, 
    Card, 
    CardBody,
    VStack, 
    Text, 
    FormControl, 
    FormLabel, 
    Input, 
    Button, 
    useToast 
} from '@chakra-ui/react'
import { useAccount } from '../../shared/hooks/useAccount'
import { useDeposits } from '../../shared/hooks/useDeposits'

const DepositUsers = ({ onSuccess }) => {
  const { account, loading } = useAccount()
  const { createDeposit, isFetching } = useDeposits()
  const [amount, setAmount] = useState('')
  const toast = useToast()

  const handleDeposit = async () => {
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
    const res = await createDeposit(
      { numberAccount: account?.accountNumber, amount },
      onSuccess
    )
    if (res.success) setAmount('')
  }

  if (loading) return <Text>Cargando...</Text>
  if (!account) return <Text>No tienes una cuenta activa.</Text>

  return (
    <Box maxW='sm' mx='auto' mt={10}>
      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <Text fontSize='xl' fontWeight='bold'>Depósito a tu cuenta</Text>
            <FormControl>
              <FormLabel>Número de cuenta</FormLabel>
              <Input value={account.accountNumber} isReadOnly bg='gray.100' />
            </FormControl>
            <FormControl>
              <FormLabel>Monto a depositar</FormLabel>
              <Input
                type='number'
                placeholder='0.00'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min={0}
              />
            </FormControl>
            <Button
              colorScheme='orange'
              onClick={handleDeposit}
              isLoading={isFetching}
              isDisabled={!amount}
              borderRadius='xl'
            >
              Depositar
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default DepositUsers