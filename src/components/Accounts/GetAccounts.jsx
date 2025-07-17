import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Avatar,
    Badge,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Grid,
    GridItem,
    Card,
    CardBody,
    IconButton,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Container,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Progress,
    AvatarBadge,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Eye,
    MoreVertical,
    Star,
    Shield,
    CreditCard,
    Wallet,
    TrendingUp,
    Calendar,
    Users,
    DollarSign,
    Activity,
    Clock,
    ArrowUpRight,
    ChevronRight,
    Settings,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import { useAccount } from '../../shared/hooks/useAccount';
import useGetTransaction from '../../shared/hooks/useGetTransaction';
import NavBar from '../commons/NavBar';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);

const GetAccounts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [sortOrder, setSortOrder] = useState('none');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accountsGen, getAccounts } = useAccount();
    const { transactions, refetch } = useGetTransaction();

    useEffect(() => {
        getAccounts();
    }, [])

    useEffect(() => {
        refetch();
    }, [])

    const filteredAccounts = (accountsGen ?? []).filter(account => {
        if (!account.userId) return false;

        const { name = '', email = '' } = account.userId;
        const matchesSearch =
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === 'all' || account.status === filterStatus;

        return matchesSearch && matchesFilter;
    });


    const getStatusColor = (status) => {
        switch (status) {
            case true: return 'green';
            case 'suspended': return 'red';
            case 'pending': return 'yellow';
            default: return 'gray';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case true: return 'Activa';
            case 'suspended': return 'Suspendida';
            case 'pending': return 'Pendiente';
            default: return 'Desconocido';
        }
    };

    const getTierIcon = (tier) => {
        switch (tier) {
            case true: return <Star size={16} />;
            case 'gold': return <Shield size={16} />;
            case '': return <Wallet size={16} />;
            default: return <CreditCard size={16} />;
        }
    };

    const getTierColor = (tier) => {
        switch (tier) {
            case true: return '#FFD700';
            case 'gold': return '#FFA500';
            case 'true': return '#C0C0C0';
            default: return '#888';
        }
    };

    const getTierGradient = (tier) => {
        switch (tier) {
            case 'premium': return 'linear(to-r, #FFD700, #FFA500, #FFD700)';
            case 'gold': return 'linear(to-r, #FFA500, #FF8C00, #FFA500)';
            case true: return 'linear(to-r, #C0C0C0, #A0A0A0, #C0C0C0)';
            default: return 'linear(to-r, #888, #666, #888)';
        }
    };

    const handleViewAccount = (account) => {
        setSelectedAccount(account);
        onOpen();
    };

    // Estadísticas rápidas
    const stats = {
        totalAccounts: accountsGen.length,
        activeAccounts: accountsGen.filter(a => a.status === true).length,
        totalBalance: (accountsGen ?? []).reduce(
            (sum, acc) => sum + Number(acc.balance?.$numberDecimal ?? 0),

            0
        ),
        avgMonthlyGrowth: (accountsGen ?? []).length
            ? (
                (accountsGen ?? []).reduce(
                    (sum, acc) => sum + Number(acc.balance?.$numberDecimal ?? 0),
                    0
                ) / (accountsGen.length)
            ) * 0.000009
            : 0
    };

    const localReadable = (date) => new Date(date).toLocaleString(
        "es-GT",                                         // español de Guatemala
        {
            timeZone: "America/Guatemala",
            weekday: "long",   // viernes
            year: "numeric",   // 2025
            month: "long",     // julio
            day: "numeric",    // 4
            hour: "2-digit",
            minute: "2-digit"
        }
    );

    const getTransactionCount = (account) => {
        return transactions.reduce(
            (acc, t) => t.accountId.userId.name === account ? acc + 1 : acc,
            0
        );
    }

    const sortedAccounts = useMemo(() => {
        if (sortOrder === 'none') return accountsGen;

        const sorted = [...accountsGen].sort((a, b) => {
            const countA = getTransactionCount(a.userId.name);
            const countB = getTransactionCount(b.userId.name);

            if (sortOrder === 'asc') {
                return countA - countB;
            } else {
                return countB - countA;
            }
        });

        return sorted;
    }, [accountsGen, transactions, sortOrder]);

    const toggleSort = () => {
        if (sortOrder === 'none') {
            setSortOrder('asc');
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder('none');
        }
    };

    const AnimatedIcon = () => {
        return (
            <Box position="relative" w="16px" h="16px" display="flex" alignItems="center" justifyContent="center">
                <AnimatePresence mode="wait">
                    {sortOrder === 'asc' && (
                        <motion.div
                            key="asc"
                            initial={{ opacity: 0, y: -10, scale: 0.8, rotate: -180 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8, rotate: 180 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1],
                                scale: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            style={{ position: 'absolute' }}
                        >
                            <ChevronDown size={16} color="#000000ff" />
                        </motion.div>
                    )}

                    {sortOrder === 'desc' && (
                        <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 10, scale: 0.8, rotate: 180 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, y: -10, scale: 0.8, rotate: -180 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1],
                                scale: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            style={{ position: 'absolute' }}
                        >
                            <ChevronUp size={16} color="#000000ff" />
                        </motion.div>
                    )}

                    {sortOrder === 'none' && (
                        <motion.div
                            key="none"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1],
                                scale: { type: "spring", stiffness: 400, damping: 25 }
                            }}
                            style={{ position: 'absolute' }}
                        >
                            <Box
                                w="16px"
                                h="16px"
                                border="1px solid"
                                borderColor="blackAlpha.900"
                                borderRadius="sm"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        );
    };

    return (
        <>
            <NavBar />
            <Box
                bg="radial-gradient(circle at 30% 70%, #0a0a0a 0%, #1a1a1a 25%, #000000 50%, #1a1a1a 75%, #0a0a0a 100%)"
                minH="100vh"
                position="relative"
                overflow="hidden"
            >
                {/* Efectos de fondo decorativos */}
                <Box
                    position="absolute"
                    top="10%"
                    left="5%"
                    width="300px"
                    height="300px"
                    bg="radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
                    borderRadius="full"
                    filter="blur(80px)"
                    pointerEvents="none"
                />
                <Box
                    position="absolute"
                    bottom="15%"
                    right="10%"
                    width="200px"
                    height="200px"
                    bg="radial-gradient(circle, rgba(255, 165, 0, 0.08) 0%, transparent 70%)"
                    borderRadius="full"
                    filter="blur(60px)"
                    pointerEvents="none"
                />

                <Container maxW="1600px" mx="auto" p={8}>
                    <VStack spacing={10}>
                        {/* Header mejorado */}
                        <MotionBox
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            w="full"
                        >
                            <VStack spacing={6} align="center" mb={8}>
                                <Box textAlign="center" position="relative">
                                    <Text
                                        fontSize="5xl"
                                        fontWeight="900"
                                        bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
                                        bgClip="text"
                                        textShadow="0 0 40px rgba(255, 215, 0, 0.3)"
                                        letterSpacing="tight"
                                    >
                                        Gestión de Cuentas
                                    </Text>
                                    <Text
                                        fontSize="2xl"
                                        fontWeight="300"
                                        bgGradient="linear(to-r, #FFA500, #FFD700)"
                                        bgClip="text"
                                        mt={2}
                                    >
                                        Administración Elite
                                    </Text>
                                </Box>
                                <Text color="gray.400" fontSize="lg" textAlign="center" maxW="600px">
                                    Panel de control avanzado para la gestión integral de cuentas bancarias
                                </Text>
                            </VStack>
                        </MotionBox>

                        {/* Estadísticas rápidas */}
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            w="full"
                        >
                            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} mb={8}>
                                {[
                                    { icon: Users, label: "Total Cuentas", value: stats.totalAccounts, color: "#FFD700" },
                                    { icon: Activity, label: "Activas", value: stats.activeAccounts, color: "#00FF80" },
                                    { icon: DollarSign, label: "Balance Total", value: `Q${stats.totalBalance.toLocaleString()}`, color: "#FFD700" },
                                    { icon: TrendingUp, label: "Crecimiento Promedio", value: `${stats.avgMonthlyGrowth.toFixed(1)}%`, color: "#FFA500" }
                                ].map((stat, index) => (
                                    <MotionBox
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                    >
                                        <Card
                                            bg="linear-gradient(135deg, rgba(26, 32, 44, 0.9) 0%, rgba(45, 55, 72, 0.9) 100%)"
                                            backdropFilter="blur(10px)"
                                            borderColor="rgba(255, 215, 0, 0.3)"
                                            borderWidth="1px"
                                            _hover={{
                                                borderColor: "gold",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 10px 30px rgba(255, 215, 0, 0.2)"
                                            }}
                                            transition="all 0.3s ease"
                                        >
                                            <CardBody p={6}>
                                                <HStack spacing={4}>
                                                    <Box
                                                        p={3}
                                                        bg={`${stat.color}20`}
                                                        borderRadius="lg"
                                                        border="1px solid"
                                                        borderColor={`${stat.color}40`}
                                                    >
                                                        <stat.icon size={24} color={stat.color} />
                                                    </Box>
                                                    <VStack align="start" spacing={1}>
                                                        <Text color="gray.400" fontSize="sm" fontWeight="medium">
                                                            {stat.label}
                                                        </Text>
                                                        <Text color="white" fontSize="xl" fontWeight="bold">
                                                            {stat.value}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </CardBody>
                                        </Card>
                                    </MotionBox>
                                ))}
                            </Grid>
                        </MotionBox>

                        {/* Search and Filters mejorados */}
                        <MotionBox
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            w="full"
                        >
                            <Card
                                bg="linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.95) 100%)"
                                backdropFilter="blur(15px)"
                                borderColor="rgba(255, 215, 0, 0.4)"
                                borderWidth="2px"
                                boxShadow="0 20px 50px rgba(255, 215, 0, 0.15)"
                                position="relative"
                                overflow="hidden"
                            >
                                {/* Efecto de brillo superior */}
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h="2px"
                                    bg="linear-gradient(90deg, transparent, #FFD700, transparent)"
                                />

                                <CardBody p={8}>
                                    <HStack spacing={6} flexWrap="wrap">
                                        <InputGroup flex={1} minW="300px">
                                            <InputLeftElement pointerEvents="none" h="full">
                                                <Search color="#FFD700" size={20} />
                                            </InputLeftElement>
                                            <Input
                                                placeholder="Buscar por nombre o email..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                bg="rgba(0, 0, 0, 0.6)"
                                                borderColor="rgba(255, 215, 0, 0.3)"
                                                color="white"
                                                _focus={{
                                                    borderColor: 'gold',
                                                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                                                    bg: 'rgba(0, 0, 0, 0.8)'
                                                }}
                                                _placeholder={{ color: 'gray.500' }}
                                                fontSize="lg"
                                                h="56px"
                                                borderRadius="xl"
                                            />
                                        </InputGroup>
                                        <Select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            bg="rgba(0, 0, 0, 0.6)"
                                            borderColor="rgba(255, 215, 0, 0.3)"
                                            color="white"
                                            _focus={{
                                                borderColor: 'gold',
                                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
                                            }}
                                            w="280px"
                                            fontSize="lg"
                                            h="56px"
                                            borderRadius="xl"
                                        >
                                            <option value="all">Todos los estados</option>
                                            <option value="active">Activas</option>
                                            <option value="suspended">Suspendidas</option>
                                            <option value="pending">Pendientes</option>
                                        </Select>
                                        <IconButton
                                            icon={<AnimatedIcon />}
                                            bg="linear-gradient(135deg, #FFD700, #FFA500)"
                                            color="black"
                                            _hover={{
                                                bg: 'linear-gradient(135deg, #FFA500, #FFD700)',
                                                transform: 'scale(1.1) rotate(5deg)',
                                                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)'
                                            }}
                                            size="lg"
                                            h="56px"
                                            w="56px"
                                            borderRadius="xl"
                                            aria-label="Filtros avanzados"
                                            transition="all 0.3s ease"
                                            onClick={toggleSort}
                                        >
                                            Ordenar por Transacciones
                                        </ IconButton>
                                    </HStack>
                                </CardBody>
                            </Card>
                        </MotionBox>

                        {/* Accounts Grid mejorado */}
                        <MotionGrid
                            templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
                            gap={8}
                            w="full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <AnimatePresence>
                                {sortedAccounts.map((account, index) => (
                                    <GridItem key={account._id}>
                                        <MotionCard
                                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            bg="linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(45, 55, 72, 0.95) 100%)"
                                            backdropFilter="blur(15px)"
                                            borderColor={hoveredCard === account._id ? "gold" : "rgba(255, 215, 0, 0.3)"}
                                            borderWidth="2px"
                                            position="relative"
                                            overflow="hidden"
                                            onMouseEnter={() => setHoveredCard(account._id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                            _hover={{
                                                transform: 'translateY(-10px) scale(1.02)',
                                                boxShadow: '0 25px 50px rgba(255, 215, 0, 0.25)',
                                            }}
                                            cursor="pointer"
                                        >
                                            {/* Efecto de brillo animado */}
                                            <Box
                                                position="absolute"
                                                top={0}
                                                left={0}
                                                right={0}
                                                h="4px"
                                                bg={`linear-gradient(90deg, transparent, ${getTierColor(account.status)}, transparent)`}
                                                opacity={hoveredCard === account._id ? 1 : 0.7}
                                                transition="opacity 0.3s ease"
                                            />

                                            {/* Efecto de partículas de fondo */}
                                            {hoveredCard === account._id && (
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    left={0}
                                                    right={0}
                                                    bottom={0}
                                                    bg={`radial-gradient(circle at 50% 50%, ${getTierColor(account.status)}10 0%, transparent 70%)`}
                                                    pointerEvents="none"
                                                />
                                            )}

                                            <CardBody p={8}>
                                                <VStack spacing={6} align="stretch">
                                                    {/* User Info mejorado */}
                                                    <HStack justify="space-between" align="start">
                                                        <HStack spacing={4}>
                                                            <Box position="relative">
                                                                <Avatar
                                                                    size="xl"
                                                                    name={`${account.userId.name} ${account.userId.surname}`}
                                                                    src={account.avatar}
                                                                    border="3px solid"
                                                                    borderColor={getTierColor(account.status)}
                                                                    boxShadow={`0 0 20px ${getTierColor(account.status)}40`}
                                                                >
                                                                    <AvatarBadge
                                                                        boxSize="1.25em"
                                                                        bg={getStatusColor(account.status) === 'green' ? 'green.500' :
                                                                            getStatusColor(account.status) === 'red' ? 'red.500' : 'yellow.500'}
                                                                        borderColor="white"
                                                                        borderWidth="2px"
                                                                    />
                                                                </Avatar>
                                                                <Tooltip label={`Tier ${account.status}`} placement="top">
                                                                    <Box
                                                                        position="absolute"
                                                                        top="-8px"
                                                                        right="-8px"
                                                                        bg={getTierColor(account.status)}
                                                                        borderRadius="full"
                                                                        p={2}
                                                                        border="2px solid black"
                                                                        boxShadow={`0 0 15px ${getTierColor(account.status)}60`}
                                                                    >
                                                                        {getTierIcon(account.status)}
                                                                    </Box>
                                                                </Tooltip>
                                                            </Box>
                                                            <VStack align="start" spacing={2}>
                                                                <Text color="white" fontSize="xl" fontWeight="bold">
                                                                    {`${account.userId.name} ${account.userId.surname}`}
                                                                </Text>
                                                                <Text color="gray.400" fontSize="md">
                                                                    {account.userId.email}
                                                                </Text>
                                                                <HStack spacing={2}>
                                                                    <Badge
                                                                        colorScheme={getStatusColor(account.status)}
                                                                        variant="solid"
                                                                        fontSize="xs"
                                                                        px={3}
                                                                        py={1}
                                                                        borderRadius="full"
                                                                    >
                                                                        {getStatusText(account.status)}
                                                                    </Badge>
                                                                    <Badge
                                                                        bg={`${getTierColor(account.status)}20`}
                                                                        color={getTierColor(account.status)}
                                                                        variant="subtle"
                                                                        fontSize="xs"
                                                                        px={3}
                                                                        py={1}
                                                                        borderRadius="full"
                                                                        border="1px solid"
                                                                        borderColor={`${getTierColor(account.status)}40`}
                                                                    >
                                                                        {account.status}
                                                                    </Badge>
                                                                </HStack>
                                                            </VStack>
                                                        </HStack>
                                                    </HStack>

                                                    <Divider borderColor="rgba(255, 215, 0, 0.3)" />

                                                    {/* Account Details mejorado */}
                                                    <VStack spacing={4} align="stretch">
                                                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                                            <Box>
                                                                <Text color="gray.400" fontSize="sm" mb={1}>Cuenta</Text>
                                                                <Text color="white" fontFamily="mono" fontSize="md" fontWeight="medium">
                                                                    {account.accountNumber}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Text color="gray.400" fontSize="sm" mb={1}>ID</Text>
                                                                <Text color="gold" fontSize="md" fontWeight="medium">
                                                                    {account._id}
                                                                </Text>
                                                            </Box>
                                                        </Grid>

                                                        <Box
                                                            p={4}
                                                            bg="rgba(0, 0, 0, 0.4)"
                                                            borderRadius="xl"
                                                            border="1px solid"
                                                            borderColor="rgba(255, 215, 0, 0.2)"
                                                        >
                                                            <HStack justify="space-between" align="center">
                                                                <VStack align="start" spacing={1}>
                                                                    <Text color="gray.400" fontSize="sm">Balance Actual</Text>
                                                                    <Text
                                                                        color="gold"
                                                                        fontSize="2xl"
                                                                        fontWeight="bold"
                                                                        textShadow="0 0 20px rgba(255, 215, 0, 0.5)"
                                                                    >
                                                                        Q{account.balance.$numberDecimal.toLocaleString()}
                                                                    </Text>
                                                                </VStack>
                                                                <VStack align="end" spacing={1}>
                                                                    <HStack>
                                                                        <TrendingUp size={16} color={account.balance.$numberDecimal > 0 ? '#00FF80' : '#FF4444'} />
                                                                        <Text
                                                                            color={account.balance.$numberDecimal > 0 ? 'green.400' : 'red.400'}
                                                                            fontSize="sm"
                                                                            fontWeight="bold"
                                                                        >
                                                                            {account.balance.$numberDecimal > 0 ? '+' : ''}{account.balance.$numberDecimal}
                                                                        </Text>
                                                                    </HStack>
                                                                    <Text color="gray.500" fontSize="xs">Este mes</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </Box>

                                                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                                            <Box>
                                                                <Text color="gray.400" fontSize="sm" mb={1}>Transacciones</Text>
                                                                <HStack>
                                                                    <Text color="white" fontSize="lg" fontWeight="medium">
                                                                        {
                                                                            transactions.reduce(
                                                                                (acc, t) =>
                                                                                    t.accountId.userId.name === account.userId.name ? acc + 1 : acc,
                                                                                0
                                                                            )
                                                                        }
                                                                    </Text>

                                                                    <Activity size={16} color="#FFD700" />
                                                                </HStack>
                                                            </Box>
                                                            <Box>
                                                                <Text color="gray.400" fontSize="sm" mb={1}>Score Crediticio</Text>
                                                                <HStack>
                                                                    <Text color="white" fontSize="lg" fontWeight="medium">
                                                                        PREMIUM
                                                                    </Text>
                                                                    <Box w="2px" h="16px" bg="gold" borderRadius="full" />
                                                                </HStack>
                                                            </Box>
                                                        </Grid>

                                                        <Box>
                                                            <HStack justify="space-between" mb={2}>
                                                                <Text color="gray.400" fontSize="sm">Actividad</Text>
                                                                <Text color="gray.500" fontSize="xs">
                                                                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                                                    {account.balance.$numberDecimal}
                                                                </Text>
                                                            </HStack>
                                                            <Progress
                                                                value={account.status === true ? 100 : account.status === false ? 50 : 25}
                                                                bg="rgba(255, 215, 0, 0.1)"
                                                                sx={{
                                                                    '& > div': {
                                                                        bg: account.status === true ? 'linear-gradient(90deg, #00FF80, #40FF90)' :
                                                                            account.status === false ? 'linear-gradient(90deg, #FFD700, #FFA500)' :
                                                                                'linear-gradient(90deg, #FF4444, #FF6666)'
                                                                    }
                                                                }}
                                                                borderRadius="full"
                                                                h="6px"
                                                            />
                                                        </Box>
                                                    </VStack>

                                                    {/* Action Buttons mejorados */}
                                                    <HStack spacing={3} pt={2}>
                                                        <Button
                                                            bg="linear-gradient(135deg, #FFD700, #FFA500)"
                                                            color="black"
                                                            _hover={{
                                                                bg: 'linear-gradient(135deg, #FFA500, #FFD700)',
                                                                transform: 'scale(1.05)',
                                                                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)'
                                                            }}
                                                            size="md"
                                                            fontWeight="bold"
                                                            leftIcon={<Eye size={16} />}
                                                            rightIcon={<ArrowUpRight size={16} />}
                                                            onClick={() => handleViewAccount(account)}
                                                            flex={1}
                                                            borderRadius="xl"
                                                            h="48px"
                                                            transition="all 0.3s ease"
                                                        >
                                                            Ver Detalles
                                                        </Button>
                                                        <IconButton
                                                            icon={<Settings size={18} />}
                                                            bg="rgba(255, 215, 0, 0.1)"
                                                            color="gold"
                                                            borderColor="rgba(255, 215, 0, 0.3)"
                                                            borderWidth="2px"
                                                            _hover={{
                                                                bg: 'rgba(255, 215, 0, 0.2)',
                                                                transform: 'scale(1.1) rotate(90deg)',
                                                                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                                                            }}
                                                            size="md"
                                                            borderRadius="xl"
                                                            h="48px"
                                                            w="48px"
                                                            aria-label="Configurar cuenta"
                                                            transition="all 0.3s ease"
                                                        />
                                                    </HStack>
                                                </VStack>
                                            </CardBody>
                                        </MotionCard>
                                    </GridItem>
                                ))}
                            </AnimatePresence>
                        </MotionGrid>

                        {/* Empty State */}
                        {filteredAccounts.length === 0 && (
                            <MotionBox
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                textAlign="center"
                                py={20}
                            >
                                <VStack spacing={4}>
                                    <Box
                                        p={6}
                                        bg="rgba(255, 215, 0, 0.1)"
                                        borderRadius="full"
                                        border="2px solid"
                                        borderColor="rgba(255, 215, 0, 0.3)"
                                    >
                                        <Search size={48} color="#FFD700" />
                                    </Box>
                                    <Text color="gray.400" fontSize="xl">
                                        No se encontraron cuentas
                                    </Text>
                                    <Text color="gray.500" fontSize="md">
                                        Intenta ajustar los filtros de búsqueda
                                    </Text>
                                </VStack>
                            </MotionBox>
                        )}

                        {/* Modal mejorado */}
                        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                            <ModalOverlay
                                bg="rgba(0, 0, 0, 0.8)"
                                backdropFilter="blur(10px)"
                            />
                            <ModalContent
                                bg="linear-gradient(135deg, rgba(26, 32, 44, 0.98) 0%, rgba(45, 55, 72, 0.98) 100%)"
                                backdropFilter="blur(20px)"
                                borderColor="gold"
                                borderWidth="2px"
                                boxShadow="0 25px 100px rgba(255, 215, 0, 0.4)"
                                borderRadius="2xl"
                                overflow="hidden"
                            >
                                {/* Header con gradiente */}
                                <Box
                                    bg="linear-gradient(135deg, #FFD700, #FFA500)"
                                    p={1}
                                >
                                    <ModalHeader
                                        bg="linear-gradient(135deg, rgba(26, 32, 44, 0.95), rgba(45, 55, 72, 0.95))"
                                        color="white"
                                        fontSize="2xl"
                                        fontWeight="bold"
                                        borderRadius="xl"
                                        m={1}
                                    >
                                        <HStack spacing={3}>
                                            <Box
                                                p={2}
                                                bg="rgba(255, 215, 0, 0.2)"
                                                borderRadius="lg"
                                            >
                                                <Eye size={24} color="#FFD700" />
                                            </Box>
                                            <Text>Detalles Completos de la Cuenta</Text>
                                        </HStack>
                                    </ModalHeader>
                                </Box>

                                <ModalCloseButton
                                    color="gold"
                                    size="lg"
                                    _hover={{ transform: 'scale(1.1)' }}
                                />

                                <ModalBody p={8}>
                                    {selectedAccount && (
                                        <>
                                            <VStack spacing={8} align="stretch">
                                                {/* User Info Section */}
                                                <HStack spacing={6}>
                                                    <Box position="relative">
                                                        <Avatar
                                                            size="2xl"
                                                            name={`${selectedAccount.userId.name} ${selectedAccount.userId.surname}`}
                                                            src={selectedAccount.avatar}
                                                            border="4px solid"
                                                            borderColor="gold"
                                                            boxShadow="0 0 30px rgba(255, 215, 0, 0.4)"
                                                        />
                                                        <Box
                                                            position="absolute"
                                                            top="-4px"
                                                            right="-4px"
                                                            bg={getTierColor(selectedAccount.status)}
                                                            borderRadius="full"
                                                            p={3}
                                                            border="3px solid black"
                                                            boxShadow={`0 0 20px ${getTierColor(selectedAccount.status)}60`}
                                                        >
                                                            {getTierIcon(selectedAccount.status)}
                                                        </Box>
                                                    </Box>
                                                    <VStack align="start" spacing={3} flex={1}>
                                                        <Text color="white" fontSize="3xl" fontWeight="bold">
                                                            {`${selectedAccount.userId.name} ${selectedAccount.userId.surname}`}
                                                        </Text>
                                                        <Text color="gray.400" fontSize="lg">
                                                            {selectedAccount.userId.email}
                                                        </Text>
                                                        <HStack spacing={3}>
                                                            <Badge
                                                                colorScheme={getStatusColor(selectedAccount.status)}
                                                                size="lg"
                                                                px={4}
                                                                py={2}
                                                                borderRadius="full"
                                                                fontSize="sm"
                                                            >
                                                                {getStatusText(selectedAccount.status)}
                                                            </Badge>
                                                            <Badge
                                                                bg={`${getTierColor(selectedAccount.status)}20`}
                                                                color={getTierColor(selectedAccount.status)}
                                                                size="lg"
                                                                px={4}
                                                                py={2}
                                                                borderRadius="full"
                                                                fontSize="sm"
                                                                border="2px solid"
                                                                borderColor={`${getTierColor(selectedAccount.tier)}40`}
                                                            >
                                                                {selectedAccount.status}
                                                            </Badge>
                                                        </HStack>
                                                        <Text color="gray.500" fontSize="sm">
                                                            <Calendar size={14} style={{ display: 'inline', marginRight: '8px' }} />
                                                            Cliente desde {localReadable(selectedAccount.createdAt)}
                                                        </Text>
                                                    </VStack>
                                                </HStack>

                                                <Divider borderColor="rgba(255, 215, 0, 0.4)" />

                                                {/* Stats Cards */}
                                                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                                    <Card
                                                        bg="rgba(0, 0, 0, 0.4)"
                                                        borderColor="rgba(255, 215, 0, 0.3)"
                                                        borderWidth="2px"
                                                        borderRadius="2xl"
                                                        overflow="hidden"
                                                    >
                                                        <CardBody p={6}>
                                                            <VStack align="start" spacing={3}>
                                                                <HStack>
                                                                    <Box
                                                                        p={2}
                                                                        bg="rgba(255, 215, 0, 0.2)"
                                                                        borderRadius="lg"
                                                                    >
                                                                        <CreditCard size={20} color="#FFD700" />
                                                                    </Box>
                                                                    <Text color="gray.400" fontSize="sm">Número de Cuenta</Text>
                                                                </HStack>
                                                                <Text color="white" fontFamily="mono" fontSize="xl" fontWeight="bold">
                                                                    {selectedAccount.accountNumber}
                                                                </Text>
                                                            </VStack>
                                                        </CardBody>
                                                    </Card>

                                                    <Card
                                                        bg="rgba(0, 0, 0, 0.4)"
                                                        borderColor="rgba(255, 215, 0, 0.3)"
                                                        borderWidth="2px"
                                                        borderRadius="2xl"
                                                        overflow="hidden"
                                                    >
                                                        <CardBody p={6}>
                                                            <VStack align="start" spacing={3}>
                                                                <HStack>
                                                                    <Box
                                                                        p={2}
                                                                        bg="rgba(255, 215, 0, 0.2)"
                                                                        borderRadius="lg"
                                                                    >
                                                                        <Wallet size={20} color="#FFD700" />
                                                                    </Box>
                                                                    <Text color="gray.400" fontSize="sm">Tipo de Cuenta</Text>
                                                                </HStack>
                                                                <Text color="gold" fontSize="xl" fontWeight="bold">
                                                                    PREMIUM
                                                                </Text>
                                                            </VStack>
                                                        </CardBody>
                                                    </Card>

                                                    <Card
                                                        bg="rgba(0, 0, 0, 0.4)"
                                                        borderColor="rgba(255, 215, 0, 0.3)"
                                                        borderWidth="2px"
                                                        borderRadius="2xl"
                                                        overflow="hidden"
                                                    >
                                                        <CardBody p={6}>
                                                            <VStack align="start" spacing={3}>
                                                                <HStack>
                                                                    <Box
                                                                        p={2}
                                                                        bg="rgba(255, 215, 0, 0.2)"
                                                                        borderRadius="lg"
                                                                    >
                                                                        <DollarSign size={20} color="#FFD700" />
                                                                    </Box>
                                                                    <Text color="gray.400" fontSize="sm">Balance Actual</Text>
                                                                </HStack>
                                                                <Text
                                                                    color="gold"
                                                                    fontSize="2xl"
                                                                    fontWeight="bold"
                                                                    textShadow="0 0 20px rgba(255, 215, 0, 0.5)"
                                                                >
                                                                    Q{selectedAccount.balance.$numberDecimal.toLocaleString()}
                                                                </Text>
                                                                <HStack>
                                                                    <TrendingUp size={16} color={selectedAccount.balance.$numberDecimal.toLocaleString() > 0 ? '#00FF80' : '#FF4444'} />
                                                                    <Text
                                                                        color={selectedAccount.balance.$numberDecimal.toLocaleString() > 0 ? 'green.400' : 'red.400'}
                                                                        fontSize="sm"
                                                                        fontWeight="bold"
                                                                    >
                                                                        {selectedAccount.balance.$numberDecimal.toLocaleString() > 0 ? '+' : ''}{selectedAccount.balance.$numberDecimal.toLocaleString()} este mes
                                                                    </Text>
                                                                </HStack>
                                                            </VStack>
                                                        </CardBody>
                                                    </Card>

                                                    <Card
                                                        bg="rgba(0, 0, 0, 0.4)"
                                                        borderColor="rgba(255, 215, 0, 0.3)"
                                                        borderWidth="2px"
                                                        borderRadius="2xl"
                                                        overflow="hidden"
                                                    >
                                                        <CardBody p={6}>
                                                            <VStack align="start" spacing={3}>
                                                                <HStack>
                                                                    <Box
                                                                        p={2}
                                                                        bg="rgba(255, 215, 0, 0.2)"
                                                                        borderRadius="lg"
                                                                    >
                                                                        <Activity size={20} color="#FFD700" />
                                                                    </Box>
                                                                    <Text color="gray.400" fontSize="sm">Actividad</Text>
                                                                </HStack>
                                                                <HStack>
                                                                    <Text color="white" fontSize="lg" fontWeight="medium">
                                                                        {
                                                                            transactions.reduce(
                                                                                (acc, t) =>
                                                                                    t.accountId.userId.name === selectedAccount.userId.name ? acc + 1 : acc,
                                                                                0
                                                                            )
                                                                        }
                                                                    </Text>
                                                                    <Text color="white" fontSize="lg" fontWeight="medium">Transaccion(es)</Text>

                                                                    <Activity size={16} color="#FFD700" />
                                                                </HStack>
                                                                <Text color="gray.500" fontSize="sm">
                                                                    Último acceso: {selectedAccount.lastActivity}
                                                                </Text>
                                                            </VStack>
                                                        </CardBody>
                                                    </Card>
                                                </Grid>

                                                {/* Credit Score */}
                                                <Card
                                                    bg="rgba(0, 0, 0, 0.4)"
                                                    borderColor="rgba(255, 215, 0, 0.3)"
                                                    borderWidth="2px"
                                                    borderRadius="2xl"
                                                >
                                                    <CardBody p={6}>
                                                        <VStack align="start" spacing={4}>
                                                            <HStack>
                                                                <Box
                                                                    p={2}
                                                                    bg="rgba(255, 215, 0, 0.2)"
                                                                    borderRadius="lg"
                                                                >
                                                                    <Star size={20} color="#FFD700" />
                                                                </Box>
                                                                <Text color="gray.400" fontSize="sm">Score Crediticio</Text>
                                                            </HStack>
                                                            <HStack w="full" justify="space-between">
                                                                <Text color="white" fontSize="3xl" fontWeight="bold">
                                                                    PREMIUM
                                                                </Text>
                                                                <Text color="gray.500" fontSize="sm">
                                                                    {900 >= 800 ? 'Excelente' :
                                                                        700 >= 700 ? 'Muy Bueno' :
                                                                            600 >= 600 ? 'Bueno' : 'Regular'}
                                                                </Text>
                                                            </HStack>
                                                            <Progress
                                                                value={selectedAccount.creditScore / 10}
                                                                bg="rgba(255, 215, 0, 0.1)"
                                                                sx={{
                                                                    '& > div': {
                                                                        bg: 800 >= 800 ? 'linear-gradient(90deg, #00FF80, #40FF90)' :
                                                                            selectedAccount.creditScore >= 700 ? 'linear-gradient(90deg, #FFD700, #FFA500)' :
                                                                                selectedAccount.creditScore >= 600 ? 'linear-gradient(90deg, #FFA500, #FF8C00)' :
                                                                                    'linear-gradient(90deg, #FF4444, #FF6666)'
                                                                    }
                                                                }}
                                                                borderRadius="full"
                                                                h="8px"
                                                                w="full"
                                                            />
                                                        </VStack>
                                                    </CardBody>
                                                </Card>
                                            </VStack>





                                            <ModalFooter p={8} pt={0}>
                                                <HStack spacing={4} w="full">
                                                    <Button
                                                        bg="rgba(255, 215, 0, 0.1)"
                                                        color="gold"
                                                        borderColor="rgba(255, 215, 0, 0.3)"
                                                        borderWidth="2px"
                                                        _hover={{
                                                            bg: 'rgba(255, 215, 0, 0.2)',
                                                            transform: 'scale(1.05)',
                                                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                                                        }}
                                                        size="lg"
                                                        fontWeight="bold"
                                                        leftIcon={<Activity size={18} />}
                                                        flex={1}
                                                        borderRadius="xl"
                                                        h="56px"
                                                        as='a'
                                                        href={`/historyTrasactions/${selectedAccount.userId._id}`}
                                                    >
                                                        Ver Transacciones
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        color="gray.400"
                                                        _hover={{
                                                            bg: 'rgba(255, 255, 255, 0.1)',
                                                            color: 'white',
                                                            transform: 'scale(1.05)'
                                                        }}
                                                        size="lg"
                                                        onClick={onClose}
                                                        leftIcon={<ChevronRight size={18} />}
                                                        borderRadius="xl"
                                                        h="56px"
                                                        px={8}
                                                    >
                                                        Cerrar
                                                    </Button>
                                                </HStack>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalBody>

                            </ModalContent>
                        </Modal>
                    </VStack>
                </Container>
            </Box>
        </>
    );
};

export default GetAccounts;