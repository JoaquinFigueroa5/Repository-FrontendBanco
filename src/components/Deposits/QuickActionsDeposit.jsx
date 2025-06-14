import { 
    Card, 
    CardBody, 
    VStack,
    Text, 
    Grid, 
    Box, 
    Icon,
    useColorModeValue 
} from '@chakra-ui/react'
import { BanknoteArrowUp } from 'lucide-react'

const QuickActionsDeposit = ({ onDepositClick }) => {
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Card my={6}>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2} color={textColor}>
              Acciones Rápidas
            </Text>
            <Text fontSize="sm" color={textColor}>
              Realiza un depósito a tu cuenta de forma rápida y sencilla.
            </Text>
          </Box>
          <Grid templateColumns="1fr" gap={4}>
            <Box
              as="button"
              onClick={onDepositClick}
              p={4}
              borderRadius="xl"
              border="1px"
              borderColor="gray.200"
              _hover={{
                borderColor: 'orange.300',
                boxShadow: 'md',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <VStack spacing={3}>
                <Box
                  p={3}
                  borderRadius="full"
                  bg="orange.50"
                  color="orange.500"
                >
                  <Icon as={BanknoteArrowUp} boxSize={6} />
                </Box>
                <VStack spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                    Depositar
                  </Text>
                  <Text fontSize="xs" color={textColor} textAlign="center">
                    Realiza un depósito a tu propia cuenta
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default QuickActionsDeposit