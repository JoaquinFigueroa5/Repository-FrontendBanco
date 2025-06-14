import useUserStore from '../context/UserStore'
import DepositUsers from '../components/Deposits/DepositUsers'
import DepositAdmin from '../components/Deposits/DepositAdmin'
import DepositsHistory from '../components/Deposits/DepositsHistory'
import NavBar from '../components/commons/NavBar'
import AccountOverview from '../components/Transactions/AccountOverview'
import QuickActionsDeposit from '../components/Deposits/QuickActionsDeposit'
import { 
    Box, 
    Container, 
    Grid, 
    GridItem, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    Text, 
    useDisclosure 
} from '@chakra-ui/react'
import { useState } from 'react'

const DepositsPage = () => {
    const { user } = useUserStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [refresh, setRefresh] = useState(0)

    if (!user) return null

    const handleDepositSuccess = () => {
        setRefresh(r => r + 1)
        onClose()
    }

    return (
        <>
            <NavBar />
            <Box minH="100vh" bg="gray.50" p={4}>
                <Container maxW="container.xl" py={8}>
                    <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
                        {/* Columna Izquierda */}
                        <GridItem>
                            <AccountOverview refresh={refresh} />
                            <QuickActionsDeposit onDepositClick={onOpen} />
                        </GridItem>
                        {/* Columna Derecha */}
                        <GridItem>
                            <DepositsHistory refresh={refresh}/>
                        </GridItem>
                    </Grid>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent borderRadius="2xl">
                            <ModalHeader>Depósito</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                {user.role === 'ADMIN_ROLE' && <DepositAdmin onSuccess={handleDepositSuccess} />}
                                {user.role === 'USER_ROLE' && <DepositUsers onSuccess={handleDepositSuccess} />}
                                {!['ADMIN_ROLE', 'USER_ROLE'].includes(user.role) && (
                                    <Text>No autorizado</Text>
                                )}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
        </>
    )
}

export default DepositsPage