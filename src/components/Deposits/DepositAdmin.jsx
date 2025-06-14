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
import { useDeposits } from '../../shared/hooks/useDeposits'

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

  return (
    <Box maxW='sm' mx='auto' mt={10}>
      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <Text fontSize='xl' fontWeight='bold'>Depósito administrativo</Text>
            <FormControl>
              <FormLabel>Número de cuenta</FormLabel>
              <Input
                placeholder='Número de cuenta'
                value={numberAccount}
                onChange={e => setNumberAccount(e.target.value)}
              />
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
              isDisabled={!numberAccount || !amount}
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

export default DepositAdmin