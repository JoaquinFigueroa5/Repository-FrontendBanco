import { motion } from 'framer-motion'
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
    useDisclosure,
    VStack,
    Icon,
    Heading
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { useState } from 'react'

// Componentes con motion
const MotionBox = motion(Box)
const MotionGrid = motion(Grid)
const MotionGridItem = motion(GridItem)
const MotionContainer = motion(Container)

// Variantes de animación
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.6
        }
    }
}

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: -50
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
}

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
            <MotionBox
                minH="100vh"
                bg="linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d2d2d 100%)"
                position="relative"
                overflow="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Elementos decorativos de fondo */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    opacity={0.03}
                    bgImage="radial-gradient(circle at 25% 25%, rgba(218, 165, 32, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(218, 165, 32, 0.05) 0%, transparent 50%)"
                    pointerEvents="none"
                />

                {/* Líneas decorativas */}
                <Box
                    position="absolute"
                    top="0"
                    left="20%"
                    w="1px"
                    h="100%"
                    bg="linear-gradient(180deg, transparent 0%, rgba(218, 165, 32, 0.1) 50%, transparent 100%)"
                    opacity={0.3}
                />
                <Box
                    position="absolute"
                    top="0"
                    right="20%"
                    w="1px"
                    h="100%"
                    bg="linear-gradient(180deg, transparent 0%, rgba(218, 165, 32, 0.1) 50%, transparent 100%)"
                    opacity={0.3}
                />

                <MotionContainer
                    maxW="container.xl"
                    py={12}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <MotionGrid
                        templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
                        gap={8}
                    >
                        {/* Columna Izquierda */}
                        <MotionGridItem variants={itemVariants}>
                            <VStack spacing={6} align="stretch">
                                <MotionBox
                                    bg="linear-gradient(180deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)"
                                    borderRadius="2xl"
                                    border="1px solid rgba(218, 165, 32, 0.2)"
                                    backdropFilter="blur(20px)"
                                    overflow="hidden"
                                    position="relative"
                                    whileHover={{
                                        borderColor: "rgba(218, 165, 32, 0.4)",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        h="2px"
                                        bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.6) 50%, transparent 100%)"
                                    />
                                    <AccountOverview refresh={refresh} />
                                </MotionBox>

                                <MotionBox
                                    bg="linear-gradient(180deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)"
                                    borderRadius="2xl"
                                    border="1px solid rgba(218, 165, 32, 0.2)"
                                    backdropFilter="blur(20px)"
                                    overflow="hidden"
                                    position="relative"
                                    whileHover={{
                                        borderColor: "rgba(218, 165, 32, 0.4)",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        h="2px"
                                        bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.6) 50%, transparent 100%)"
                                    />
                                    <QuickActionsDeposit onDepositClick={onOpen} />
                                </MotionBox>
                            </VStack>
                        </MotionGridItem>

                        {/* Columna Derecha */}
                        <MotionGridItem variants={itemVariants}>
                            <MotionBox
                                bg="linear-gradient(180deg, rgba(26, 26, 26, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)"
                                borderRadius="2xl"
                                border="1px solid rgba(218, 165, 32, 0.2)"
                                backdropFilter="blur(20px)"
                                overflow="hidden"
                                position="relative"
                                h="fit-content"
                                whileHover={{
                                    borderColor: "rgba(218, 165, 32, 0.4)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    h="2px"
                                    bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.6) 50%, transparent 100%)"
                                />
                                <DepositsHistory refresh={refresh} />
                            </MotionBox>
                        </MotionGridItem>
                    </MotionGrid>

                    {/* Modal mejorado */}
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        isCentered
                        motionPreset="none"
                    >
                        <ModalOverlay
                            bg="rgba(0, 0, 0, 0.8)"
                            backdropFilter="blur(8px)"
                        />
                        <MotionBox
                            as={ModalContent}
                            borderRadius="2xl"
                            bg="linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)"
                            border="1px solid rgba(218, 165, 32, 0.3)"
                            backdropFilter="blur(20px)"
                            boxShadow="0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(218, 165, 32, 0.1)"
                            maxW="500px"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ModalHeader
                                color="white"
                                fontSize="xl"
                                fontWeight="600"
                                borderBottom="1px solid rgba(218, 165, 32, 0.2)"
                                pb={4}
                            >
                                💰 Realizar Depósito
                            </ModalHeader>
                            <ModalCloseButton
                                color="rgba(255, 255, 255, 0.7)"
                                _hover={{
                                    color: "white",
                                    bg: "rgba(218, 165, 32, 0.2)"
                                }}
                                borderRadius="full"
                            />
                            <ModalBody pb={6} pt={6}>
                                {user?.role === 'ADMIN_ROLE' && (
                                    <DepositAdmin onSuccess={handleDepositSuccess} />
                                )}
                                {user?.role === 'USER_ROLE' && (
                                    <DepositUsers onSuccess={handleDepositSuccess} />
                                )}
                                {!['ADMIN_ROLE', 'USER_ROLE'].includes(user?.role) && (
                                    <MotionBox
                                        bg="rgba(255, 69, 0, 0.1)"
                                        border="1px solid rgba(255, 69, 0, 0.3)"
                                        borderRadius="xl"
                                        p={6}
                                        textAlign="center"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Icon
                                            as={WarningIcon}
                                            boxSize={8}
                                            color="red.400"
                                            mb={3}
                                        />
                                        <Heading size="md" color="white" mb={2}>
                                            Acceso No Autorizado
                                        </Heading>
                                        <Text color="rgba(255, 255, 255, 0.7)">
                                            No tienes permisos para realizar esta acción
                                        </Text>
                                    </MotionBox>
                                )}
                            </ModalBody>
                        </MotionBox>
                    </Modal>
                </MotionContainer>
            </MotionBox>
        </>
    )
}

export default DepositsPage