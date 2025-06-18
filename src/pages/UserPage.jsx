import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    Flex,
    Icon,
    useColorModeValue,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Card,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useToast
} from '@chakra-ui/react';
import {
    FiUsers,
    FiUserPlus,
    FiTrendingUp,
    FiSettings,
    FiHome,
    FiUser
} from 'react-icons/fi';
import GetUser from '../components/User/GetUser';
import useUser from '../shared/hooks/useGetUsers';
import NavBar from '../components/commons/NavBar';

const UserPage = () => {
    const { users } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [newUser, setNewUser] = React.useState({
        name: '',
        email: '',
        phone: '',
        role: ''
    });

    const bgGradient = useColorModeValue(
        'linear(to-br, gray.50, white, gray.100)',
        'linear(to-br, gray.900, gray.800, gray.900)'
    );

    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.300');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateUser = () => {
        // Aquí iría la lógica para crear un nuevo usuario
        toast({
            title: "Usuario creado",
            description: "El nuevo usuario ha sido creado exitosamente.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
        });
        setNewUser({ name: '', email: '', phone: '', role: '' });
        onClose();
    };

    const totalUsers = users.length;
    const adminUsers = users.filter(user => user.role === 'admin').length;
    const activeUsers = users.filter(user => user.status === 'active').length || totalUsers;

    return (
        <>
        <NavBar/>
            <Box minH="100vh" bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)">
                {/* Header Section */}
                <Box
                    bg="linear-gradient(135deg, #000000 0%, #333333 50%, #000000 100%)"
                    color="white"
                    py={12}
                    position="relative"
                    overflow="hidden"
                >
                    {/* Elementos decorativos de fondo */}
                    <Box
                        position="absolute"
                        top="-50px"
                        right="-50px"
                        w="200px"
                        h="200px"
                        bg="gold"
                        borderRadius="full"
                        opacity="0.1"
                        filter="blur(40px)"
                    />
                    <Box
                        position="absolute"
                        bottom="-30px"
                        left="-30px"
                        w="150px"
                        h="150px"
                        bg="gold"
                        borderRadius="full"
                        opacity="0.15"
                        filter="blur(30px)"
                    />

                    <Container maxW="7xl" position="relative" zIndex={1}>
                        <VStack spacing={6} align="start">

                            <Flex justify="space-between" align="flex-end" w="full" flexWrap="wrap" gap={4}>
                                <VStack align="start" spacing={2}>
                                    <Heading
                                        size="2xl"
                                        fontWeight="black"
                                        bgGradient="linear(to-r, white, gold)"
                                        bgClip="text"
                                        letterSpacing="tight"
                                    >
                                        Gestión de Usuarios
                                    </Heading>
                                    <Text
                                        fontSize="lg"
                                        color="gray.300"
                                        maxW="500px"
                                        lineHeight="tall"
                                    >
                                        Administra y controla todos los usuarios de tu plataforma desde un solo lugar
                                    </Text>
                                </VStack>
                            </Flex>
                        </VStack>
                    </Container>
                </Box>

                {/* Stats Section */}
                <Container maxW="7xl" py={8}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
                        <Card
                            bg={cardBg}
                            shadow="2xl"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="gray.100"
                            overflow="hidden"
                            position="relative"
                            _hover={{ transform: "translateY(-4px)", shadow: "3xl" }}
                            transition="all 0.3s ease"
                        >
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                h="4px"
                                bg="linear-gradient(90deg, gold, yellow.400)"
                            />
                            <CardBody p={6}>
                                <Stat>
                                    <HStack justify="space-between" mb={2}>
                                        <StatLabel color={mutedColor} fontSize="sm" fontWeight="medium">
                                            Total Usuarios
                                        </StatLabel>
                                        <Icon
                                            as={FiUsers}
                                            w={6}
                                            h={6}
                                            color="gold"
                                            p={1}
                                            bg="yellow.50"
                                            borderRadius="md"
                                        />
                                    </HStack>
                                    <StatNumber color={textColor} fontSize="3xl" fontWeight="black">
                                        {totalUsers}
                                    </StatNumber>
                                    <StatHelpText color="green.500" fontWeight="medium">
                                        <Icon as={FiTrendingUp} mr={1} />
                                        +12% este mes
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>

                        <Card
                            bg={cardBg}
                            shadow="2xl"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="gray.100"
                            overflow="hidden"
                            position="relative"
                            _hover={{ transform: "translateY(-4px)", shadow: "3xl" }}
                            transition="all 0.3s ease"
                        >
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                h="4px"
                                bg="linear-gradient(90deg, black, gray.600)"
                            />
                            <CardBody p={6}>
                                <Stat>
                                    <HStack justify="space-between" mb={2}>
                                        <StatLabel color={mutedColor} fontSize="sm" fontWeight="medium">
                                            Administradores
                                        </StatLabel>
                                        <Icon
                                            as={FiSettings}
                                            w={6}
                                            h={6}
                                            color="black"
                                            p={1}
                                            bg="gray.100"
                                            borderRadius="md"
                                        />
                                    </HStack>
                                    <StatNumber color={textColor} fontSize="3xl" fontWeight="black">
                                        {adminUsers}
                                    </StatNumber>
                                    <StatHelpText color="blue.500" fontWeight="medium">
                                        Usuarios activos
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>

                        <Card
                            bg={cardBg}
                            shadow="2xl"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="gray.100"
                            overflow="hidden"
                            position="relative"
                            _hover={{ transform: "translateY(-4px)", shadow: "3xl" }}
                            transition="all 0.3s ease"
                        >
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                h="4px"
                                bg="linear-gradient(90deg, green.400, green.600)"
                            />
                            <CardBody p={6}>
                                <Stat>
                                    <HStack justify="space-between" mb={2}>
                                        <StatLabel color={mutedColor} fontSize="sm" fontWeight="medium">
                                            Usuarios Activos
                                        </StatLabel>
                                        <Icon
                                            as={FiTrendingUp}
                                            w={6}
                                            h={6}
                                            color="green.500"
                                            p={1}
                                            bg="green.50"
                                            borderRadius="md"
                                        />
                                    </HStack>
                                    <StatNumber color={textColor} fontSize="3xl" fontWeight="black">
                                        {activeUsers}
                                    </StatNumber>
                                    <StatHelpText color="green.500" fontWeight="medium">
                                        En línea ahora
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                    </SimpleGrid>

                    {/* Main Content */}
                    <Card
                        bg={cardBg}
                        shadow="2xl"
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="gray.100"
                        overflow="hidden"
                    >
                        <Box
                            bg="linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%)"
                            p={6}
                            borderBottom="1px solid"
                            borderColor="gray.100"
                        >
                            <HStack justify="space-between" align="center">
                                <VStack align="start" spacing={1}>
                                    <Heading size="lg" color={textColor} fontWeight="bold">
                                        Lista de Usuarios
                                    </Heading>
                                    <Text color={mutedColor} fontSize="sm">
                                        Administra la información de todos los usuarios registrados
                                    </Text>
                                </VStack>
                                <HStack spacing={3}>
                                    <Text fontSize="sm" color={mutedColor}>
                                        {totalUsers} usuarios encontrados
                                    </Text>
                                </HStack>
                            </HStack>
                        </Box>

                        <Box p={0}>
                            <GetUser />
                        </Box>
                    </Card>
                </Container>

                {/* Modal para crear nuevo usuario */}
                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                    <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.200">
                        <ModalHeader
                            bg="linear-gradient(135deg, #000000 0%, #333333 100%)"
                            color="white"
                            borderTopRadius="2xl"
                            py={6}
                        >
                            <VStack align="start" spacing={2}>
                                <Heading size="md" fontWeight="bold">
                                    Crear Nuevo Usuario
                                </Heading>
                                <Text fontSize="sm" color="gray.300">
                                    Completa la información para registrar un nuevo usuario
                                </Text>
                            </VStack>
                        </ModalHeader>
                        <ModalCloseButton color="white" />

                        <ModalBody p={8}>
                            <VStack spacing={6}>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                                    <FormControl>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="semibold"
                                            fontSize="sm"
                                            textTransform="uppercase"
                                            letterSpacing="wide"
                                        >
                                            Nombre Completo
                                        </FormLabel>
                                        <Input
                                            name="name"
                                            value={newUser.name}
                                            onChange={handleInputChange}
                                            placeholder="Ingresa el nombre completo"
                                            size="lg"
                                            borderRadius="xl"
                                            borderColor="gray.300"
                                            bg="gray.50"
                                            _focus={{
                                                borderColor: "gold",
                                                boxShadow: "0 0 0 1px gold",
                                                bg: "white"
                                            }}
                                            _hover={{ borderColor: "gray.400" }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="semibold"
                                            fontSize="sm"
                                            textTransform="uppercase"
                                            letterSpacing="wide"
                                        >
                                            Correo Electrónico
                                        </FormLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={newUser.email}
                                            onChange={handleInputChange}
                                            placeholder="usuario@ejemplo.com"
                                            size="lg"
                                            borderRadius="xl"
                                            borderColor="gray.300"
                                            bg="gray.50"
                                            _focus={{
                                                borderColor: "gold",
                                                boxShadow: "0 0 0 1px gold",
                                                bg: "white"
                                            }}
                                            _hover={{ borderColor: "gray.400" }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="semibold"
                                            fontSize="sm"
                                            textTransform="uppercase"
                                            letterSpacing="wide"
                                        >
                                            Número de Teléfono
                                        </FormLabel>
                                        <Input
                                            name="phone"
                                            value={newUser.phone}
                                            onChange={handleInputChange}
                                            placeholder="+502 1234-5678"
                                            size="lg"
                                            borderRadius="xl"
                                            borderColor="gray.300"
                                            bg="gray.50"
                                            _focus={{
                                                borderColor: "gold",
                                                boxShadow: "0 0 0 1px gold",
                                                bg: "white"
                                            }}
                                            _hover={{ borderColor: "gray.400" }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel
                                            color="gray.700"
                                            fontWeight="semibold"
                                            fontSize="sm"
                                            textTransform="uppercase"
                                            letterSpacing="wide"
                                        >
                                            Rol del Usuario
                                        </FormLabel>
                                        <Input
                                            name="role"
                                            value={newUser.role}
                                            onChange={handleInputChange}
                                            placeholder="admin, usuario, etc."
                                            size="lg"
                                            borderRadius="xl"
                                            borderColor="gray.300"
                                            bg="gray.50"
                                            _focus={{
                                                borderColor: "gold",
                                                boxShadow: "0 0 0 1px gold",
                                                bg: "white"
                                            }}
                                            _hover={{ borderColor: "gray.400" }}
                                        />
                                    </FormControl>
                                </SimpleGrid>

                                {/* Información adicional */}
                                <Box
                                    w="full"
                                    p={4}
                                    bg="blue.50"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="blue.100"
                                >
                                    <HStack spacing={3}>
                                        <Icon as={FiUsers} color="blue.500" />
                                        <VStack align="start" spacing={1}>
                                            <Text fontSize="sm" fontWeight="semibold" color="blue.800">
                                                Información Importante
                                            </Text>
                                            <Text fontSize="xs" color="blue.600">
                                                El nuevo usuario recibirá un correo de bienvenida con las instrucciones para activar su cuenta.
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </VStack>
                        </ModalBody>

                        <ModalFooter
                            bg="gray.50"
                            borderBottomRadius="2xl"
                            p={6}
                        >
                            <HStack spacing={4} w="full" justify="flex-end">
                                <Button
                                    onClick={onClose}
                                    size="lg"
                                    bg="white"
                                    color="gray.700"
                                    border="2px solid"
                                    borderColor="gray.300"
                                    _hover={{
                                        bg: "gray.100",
                                        borderColor: "gray.400",
                                        transform: "translateY(-1px)"
                                    }}
                                    _active={{ transform: "translateY(0)" }}
                                    transition="all 0.2s"
                                    px={8}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleCreateUser}
                                    size="lg"
                                    bg="linear-gradient(135deg, gold 0%, yellow.400 100%)"
                                    color="black"
                                    fontWeight="bold"
                                    _hover={{
                                        bg: "linear-gradient(135deg, yellow.400 0%, gold 100%)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 20px rgba(255, 215, 0, 0.4)"
                                    }}
                                    _active={{ transform: "translateY(0)" }}
                                    transition="all 0.3s ease"
                                    px={8}
                                    leftIcon={<FiUserPlus />}
                                >
                                    Crear Usuario
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default UserPage;