import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Flex,
    Icon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Card,
    CardBody,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Badge,
    Avatar,
    AvatarGroup,
    Divider,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure
} from '@chakra-ui/react';
import {
    FiUsers,
    FiTrendingUp,
    FiSettings,
    FiSearch,
    FiFilter,
    FiPlus,
    FiMoreVertical,
    FiEye,
    FiEdit,
    FiTrash2,
    FiUserPlus,
    FiActivity,
    FiShield
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import GetUser from '../components/User/GetUser';
import useUser from '../shared/hooks/useGetUsers';
import NavBar from '../components/commons/NavBar';

// Componentes Motion
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const UserPage = () => {
    const { users } = useUser();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Datos estadísticos
    const totalUsers = users.length;
    const adminUsers = users.filter(user => user.role === 'ADMIN_ROLE').length;
    const activeUsers = users.filter(user => user.status === true).length || totalUsers;

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const StatCard = ({ title, value, change, icon, gradient, iconBg, changeColor }) => (
        <MotionCard
            variants={itemVariants}
            whileHover="hover"
            bg="rgba(0, 0, 0, 0.85)"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="rgba(255, 215, 0, 0.2)"
            borderRadius="24px"
            overflow="hidden"
            position="relative"
            _hover={{
                borderColor: "rgba(255, 215, 0, 0.4)",
                shadow: "0 20px 40px rgba(255, 215, 0, 0.1)"
            }}
            transition="all 0.3s ease"
        >
            {/* Efecto de brillo animado */}
            <Box
                position="absolute"
                top={0}
                left="-100%"
                w="100%"
                h="2px"
                bg={gradient}
                animation="shimmer 3s infinite"
                sx={{
                    '@keyframes shimmer': {
                        '0%': { left: '-100%' },
                        '100%': { left: '100%' }
                    }
                }}
            />

            <CardBody p={8}>
                <HStack justify="space-between" mb={6}>
                    <Box>
                        <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm" fontWeight="600" letterSpacing="wide">
                            {title}
                        </Text>
                        <Text color="gold" fontSize="3xl" fontWeight="900" mt={2}>
                            {value}
                        </Text>
                    </Box>
                    <Box
                        bg={iconBg}
                        p={4}
                        borderRadius="16px"
                        border="1px solid rgba(255, 215, 0, 0.3)"
                    >
                        <Icon as={icon} w={6} h={6} color="gold" />
                    </Box>
                </HStack>

                <HStack spacing={2}>
                    <Icon as={FiTrendingUp} color={changeColor} />
                    <Text color={changeColor} fontSize="sm" fontWeight="600">
                        {change}
                    </Text>
                </HStack>
            </CardBody>
        </MotionCard>
    );

    return (
        <>
            <NavBar />
            <Box minH="100vh" bg="radial-gradient(ellipse at top, #1a1a1a 0%, #000000 70%)">
                {/* Hero Section con partículas doradas */}
                <Box position="relative" overflow="hidden">
                    {/* Partículas de fondo animadas */}
                    {[...Array(15)].map((_, i) => (
                        <MotionBox
                            key={i}
                            position="absolute"
                            w="4px"
                            h="4px"
                            bg="gold"
                            borderRadius="full"
                            opacity={0.3}
                            animate={{
                                y: [-20, -100],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                        />
                    ))}

                    <Container maxW="7xl" py={20} position="relative" zIndex={1}>
                        <MotionBox
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <VStack spacing={8} align="center" textAlign="center">
                                <Box>
                                    <Heading
                                        size="3xl"
                                        fontWeight="900"
                                        bgGradient="linear(to-r, white, gold, white)"
                                        bgClip="text"
                                        letterSpacing="tight"
                                        mb={4}
                                    >
                                        Centro de Control de Usuarios
                                    </Heading>
                                    <Text
                                        fontSize="xl"
                                        color="rgba(255, 255, 255, 0.8)"
                                        maxW="600px"
                                        mx="auto"
                                        lineHeight="tall"
                                    >
                                        Administra, monitorea y controla todos los usuarios de tu plataforma con herramientas avanzadas
                                    </Text>
                                </Box>

                                {/* Avatares de usuarios recientes */}
                                <HStack spacing={4}>
                                    <AvatarGroup size="lg" max={5}>
                                        <Avatar bg="gold" color="black" name="Usuario 1" />
                                        <Avatar bg="gold" color="black" name="Usuario 2" />
                                        <Avatar bg="gold" color="black" name="Usuario 3" />
                                        <Avatar bg="gold" color="black" name="Usuario 4" />
                                        <Avatar bg="gold" color="black" name="Usuario 5" />
                                    </AvatarGroup>
                                    <VStack align="start" spacing={0} ml={4}>
                                        <Text color="white" fontWeight="bold">
                                            +{totalUsers} usuarios
                                        </Text>
                                        <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                                            registrados
                                        </Text>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </MotionBox>
                    </Container>
                </Box>

                <Container maxW="7xl" py={12}>
                    {/* Estadísticas */}
                    <MotionBox
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        mb={12}
                    >
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                            <StatCard
                                title="TOTAL USUARIOS"
                                value={totalUsers}
                                change="+12% este mes"
                                icon={FiUsers}
                                gradient="linear-gradient(90deg, gold, yellow.400)"
                                iconBg="rgba(255, 215, 0, 0.1)"
                                changeColor="green.400"
                            />
                            <StatCard
                                title="ADMINISTRADORES"
                                value={adminUsers}
                                change="Control total"
                                icon={FiShield}
                                gradient="linear-gradient(90deg, gold, orange.400)"
                                iconBg="rgba(255, 215, 0, 0.1)"
                                changeColor="orange.400"
                            />
                            <StatCard
                                title="USUARIOS ACTIVOS"
                                value={activeUsers}
                                change="En línea ahora"
                                icon={FiActivity}
                                gradient="linear-gradient(90deg, green.400, emerald.400)"
                                iconBg="rgba(255, 215, 0, 0.1)"
                                changeColor="green.400"
                            />
                        </SimpleGrid>
                    </MotionBox>

                    {/* Panel de Control Principal */}
                    <MotionCard
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        bg="rgba(0, 0, 0, 0.9)"
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        borderColor="rgba(255, 215, 0, 0.2)"
                        borderRadius="24px"
                        overflow="hidden"
                        position="relative"
                    >
                        {/* Header del panel */}
                        <Box
                            bg="linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)"
                            p={8}
                            borderBottom="1px solid"
                            borderColor="rgba(255, 215, 0, 0.2)"
                        >
                            <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
                                <VStack align="start" spacing={2}>
                                    <HStack spacing={3}>
                                        <Icon as={FiUsers} color="gold" w={6} h={6} />
                                        <Heading size="xl" color="white" fontWeight="800">
                                            Gestión de Usuarios
                                        </Heading>
                                        <Badge
                                            bg="rgba(255, 215, 0, 0.2)"
                                            color="gold"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            fontSize="xs"
                                            fontWeight="700"
                                        >
                                            {totalUsers} ACTIVOS
                                        </Badge>
                                    </HStack>
                                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="md">
                                        Administra perfiles, permisos y actividad de usuarios
                                    </Text>
                                </VStack>
                            </Flex>

                            {/* Barra de búsqueda y filtros */}
                            <HStack spacing={4} mt={6}>
                                <InputGroup flex={1} maxW="400px">
                                    <InputLeftElement>
                                        <Icon as={FiSearch} color="rgba(255, 255, 255, 0.5)" />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Buscar usuarios..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        bg="rgba(255, 255, 255, 0.05)"
                                        border="1px solid"
                                        borderColor="rgba(255, 215, 0, 0.2)"
                                        color="white"
                                        borderRadius="12px"
                                        _placeholder={{ color: "rgba(255, 255, 255, 0.5)" }}
                                        _focus={{
                                            borderColor: "gold",
                                            shadow: "0 0 0 1px gold"
                                        }}
                                    />
                                </InputGroup>

                                <Menu>
                                    <Link to='/accounts' >
                                        <Button
                                            bg="rgba(255, 255, 255, 0.05)"
                                            color="white"
                                            border="1px solid"
                                            borderColor="rgba(255, 215, 0, 0.2)"
                                            borderRadius="12px"
                                            _hover={{
                                                bg: "rgba(255, 215, 0, 0.1)",
                                                borderColor: "gold"
                                            }}
                                        >
                                            Total de cuentas
                                        </Button>
                                    </Link>
                                </Menu>
                            </HStack>
                        </Box>

                        {/* Contenido principal */}
                        <Box p={0} position="relative">
                            <GetUser />
                        </Box>
                    </MotionCard>
                </Container>

                {/* Elementos decorativos flotantes */}
                <Box position="fixed" top="20%" right="5%" zIndex={0}>
                    <MotionBox
                        w="100px"
                        h="100px"
                        border="2px solid"
                        borderColor="rgba(255, 215, 0, 0.1)"
                        borderRadius="full"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                </Box>

                <Box position="fixed" bottom="10%" left="5%" zIndex={0}>
                    <MotionBox
                        w="60px"
                        h="60px"
                        bg="rgba(255, 215, 0, 0.05)"
                        borderRadius="12px"
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [0, 45, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default UserPage;