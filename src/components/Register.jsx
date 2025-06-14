import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    HStack,
    Icon,
    Divider,
    useColorModeValue,
    Center,
    Circle,
    Link,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast
} from "@chakra-ui/react";
import {
    FiUser,
    FiMail,
    FiLock,
    FiPhone,
    FiMapPin,
    FiBriefcase,
    FiDollarSign,
    FiCheck,
    FiStar,
    FiCheckCircle,
    FiAlertCircle
} from "react-icons/fi";

// Importa tu hook real
import { useRegister } from '../shared/hooks'; // Ajusta la ruta según tu estructura
import NavBar from "./commons/NavBar";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        dpi: "",
        address: "",
        work: "",
        income: "",
        email: "",
        password: "",
        phone: ""
    });

    const [validationErrors, setValidationErrors] = useState({});
    const { register, isLoading } = useRegister(); // Usa el hook real
    const toast = useToast();

    const bgGradient = useColorModeValue(
        "linear(to-br, yellow.400, orange.400, red.400)",
        "linear(to-br, yellow.300, orange.300, red.300)"
    );

    const formBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.600", "gray.200");

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Limpiar error de validación cuando el usuario empiece a escribir
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        // Validaciones básicas
        if (!formData.name.trim()) errors.name = "El nombre es requerido";
        if (!formData.surname.trim()) errors.surname = "El apellido es requerido";
        if (!formData.username.trim()) errors.username = "El nombre de usuario es requerido";
        if (!formData.email.trim()) errors.email = "El email es requerido";
        if (!formData.password.trim()) errors.password = "La contraseña es requerida";
        if (!formData.phone.trim()) errors.phone = "El teléfono es requerido";
        if (!formData.dpi.trim()) errors.dpi = "El DPI es requerido";
        if (!formData.address.trim()) errors.address = "La dirección es requerida";
        if (!formData.work.trim()) errors.work = "El trabajo es requerido";
        if (!formData.income.trim()) errors.income = "Los ingresos son requeridos";

        // Validaciones específicas
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Email inválido";
        }

        if (formData.dpi && formData.dpi.length !== 13) {
            errors.dpi = "El DPI debe tener 13 dígitos";
        }

        if (formData.phone && formData.phone.length !== 8) {
            errors.phone = "El teléfono debe tener 8 dígitos";
        }

        if (formData.password && formData.password.length < 6) {
            errors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Error de validación",
                description: "Por favor corrige los errores en el formulario",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await register({ ...formData });
        } catch (err) {
            console.error('Error en el registro:', err);
        }
    };

    const features = [
        { icon: FiCheck, text: "Registro rápido y sencillo" },
        { icon: FiStar, text: "Datos seguros y protegidos" },
        { icon: FiCheck, text: "Acceso inmediato" }
    ];

    return (
        <>
        <NavBar />
        <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>
            {/* Panel izquierdo - Hero Section */}
            <Box
                w={{ base: "full", lg: "50%" }}
                bgGradient={bgGradient}
                position="relative"
                display={{ base: "none", lg: "flex" }}
                alignItems="center"
                justifyContent="center"
                p={12}
                color="white"
            >
                {/* Patrón de fondo */}
                <Box
                    position="absolute"
                    inset={0}
                    opacity={0.1}
                    bgImage="radial-gradient(circle, white 2px, transparent 2px)"
                    bgSize="40px 40px"
                />

                {/* Overlay */}
                <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.500, transparent, blackAlpha.300)"
                />

                {/* Contenido */}
                <VStack spacing={8} zIndex={1} textAlign="center" maxW="md">
                    {/* Ícono principal */}
                    <Circle size={24} bg="whiteAlpha.200" backdropFilter="blur(10px)">
                        <Icon as={FiUser} boxSize={12} />
                    </Circle>

                    <VStack spacing={4}>
                        <Heading size="2xl" fontWeight="bold">
                            Únete a Nosotros
                        </Heading>
                        <Text fontSize="xl" opacity={0.9}>
                            Crea tu cuenta y comienza tu experiencia única con nosotros.
                        </Text>
                    </VStack>

                    {/* Lista de características */}
                    <VStack spacing={4} align="start" w="full">
                        {features.map((feature, index) => (
                            <HStack key={index} spacing={3}>
                                <Box w={2} h={2} bg="yellow.300" rounded="full" />
                                <Text fontSize="lg">{feature.text}</Text>
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
            </Box>

            {/* Panel derecho - Formulario */}
            <Box
                w={{ base: "full", lg: "50%" }}
                bg={useColorModeValue("gray.50", "gray.900")}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={8}
            >
                <Container maxW="4xl" w="full">
                    {/* Header del formulario */}
                    <VStack spacing={6} mb={8} textAlign="center">
                        {/* Logo */}
                        <Circle
                            size={16}
                            bgGradient="linear(to-r, yellow.400, orange.400)"
                            shadow="lg"
                        >
                            <Icon as={FiCheck} boxSize={8} color="white" />
                        </Circle>

                        <VStack spacing={2}>
                            <Heading size="xl" color={useColorModeValue("gray.800", "white")}>
                                Crear Cuenta
                            </Heading>
                            <Text color={textColor}>
                                Completa la información para registrarte
                            </Text>
                        </VStack>
                    </VStack>

                    {/* Formulario */}
                    <Box as="form" onSubmit={handleSubmit}>
                        <VStack spacing={6}>
                            {/* Grid de campos */}
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                {/* Nombre */}
                                <FormControl isRequired isInvalid={validationErrors.name}>
                                    <FormLabel fontWeight="semibold">Nombre</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiUser} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Tu nombre"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.name ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.name ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.name ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.name ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.name && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.name}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* Apellido */}
                                <FormControl isRequired isInvalid={validationErrors.surname}>
                                    <FormLabel fontWeight="semibold">Apellido</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiUser} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Tu apellido"
                                            value={formData.surname}
                                            onChange={(e) => handleInputChange('surname', e.target.value)}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.surname ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.surname ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.surname ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.surname ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.surname && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.surname}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* Username */}
                                <FormControl isRequired isInvalid={validationErrors.username}>
                                    <FormLabel fontWeight="semibold">Nombre de Usuario</FormLabel>
                                    <Input
                                        placeholder="@usuario"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        bg={formBg}
                                        border="1px"
                                        borderColor={validationErrors.username ? "red.300" : "gray.200"}
                                        rounded="xl"
                                        size="lg"
                                        _hover={{ borderColor: validationErrors.username ? "red.400" : "yellow.300" }}
                                        _focus={{ borderColor: validationErrors.username ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.username ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                    />
                                    {validationErrors.username && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.username}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* DPI */}
                                <FormControl isRequired isInvalid={validationErrors.dpi}>
                                    <FormLabel fontWeight="semibold">DPI</FormLabel>
                                    <Input
                                        placeholder="1234567890123"
                                        value={formData.dpi}
                                        onChange={(e) => handleInputChange('dpi', e.target.value.replace(/\D/g, ''))}
                                        maxLength={13}
                                        bg={formBg}
                                        border="1px"
                                        borderColor={validationErrors.dpi ? "red.300" : "gray.200"}
                                        rounded="xl"
                                        size="lg"
                                        _hover={{ borderColor: validationErrors.dpi ? "red.400" : "yellow.300" }}
                                        _focus={{ borderColor: validationErrors.dpi ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.dpi ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                    />
                                    {validationErrors.dpi && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.dpi}
                                        </Text>
                                    )}
                                </FormControl>
                            </SimpleGrid>

                            {/* Dirección - ancho completo */}
                            <FormControl isRequired isInvalid={validationErrors.address}>
                                <FormLabel fontWeight="semibold">Dirección</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={FiMapPin} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Tu dirección completa"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        bg={formBg}
                                        border="1px"
                                        borderColor={validationErrors.address ? "red.300" : "gray.200"}
                                        rounded="xl"
                                        size="lg"
                                        _hover={{ borderColor: validationErrors.address ? "red.400" : "yellow.300" }}
                                        _focus={{ borderColor: validationErrors.address ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.address ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                    />
                                </InputGroup>
                                {validationErrors.address && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {validationErrors.address}
                                    </Text>
                                )}
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                {/* Trabajo */}
                                <FormControl isRequired isInvalid={validationErrors.work}>
                                    <FormLabel fontWeight="semibold">Trabajo</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiBriefcase} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Tu ocupación"
                                            value={formData.work}
                                            onChange={(e) => handleInputChange('work', e.target.value)}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.work ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.work ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.work ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.work ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.work && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.work}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* Ingresos */}
                                <FormControl isRequired isInvalid={validationErrors.income}>
                                    <FormLabel fontWeight="semibold">Ingresos</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiDollarSign} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.income}
                                            onChange={(e) => handleInputChange('income', e.target.value)}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.income ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.income ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.income ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.income ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.income && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.income}
                                        </Text>
                                    )}
                                </FormControl>
                            </SimpleGrid>

                            {/* Email - ancho completo */}
                            <FormControl isRequired isInvalid={validationErrors.email}>
                                <FormLabel fontWeight="semibold">Correo Electrónico</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={FiMail} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        bg={formBg}
                                        border="1px"
                                        borderColor={validationErrors.email ? "red.300" : "gray.200"}
                                        rounded="xl"
                                        size="lg"
                                        _hover={{ borderColor: validationErrors.email ? "red.400" : "yellow.300" }}
                                        _focus={{ borderColor: validationErrors.email ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.email ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                    />
                                </InputGroup>
                                {validationErrors.email && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {validationErrors.email}
                                    </Text>
                                )}
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                {/* Contraseña */}
                                <FormControl isRequired isInvalid={validationErrors.password}>
                                    <FormLabel fontWeight="semibold">Contraseña</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiLock} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.password ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.password ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.password ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.password ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.password && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.password}
                                        </Text>
                                    )}
                                </FormControl>

                                {/* Teléfono */}
                                <FormControl isRequired isInvalid={validationErrors.phone}>
                                    <FormLabel fontWeight="semibold">Teléfono</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiPhone} color="gray.400" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="12345678"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                                            maxLength={8}
                                            bg={formBg}
                                            border="1px"
                                            borderColor={validationErrors.phone ? "red.300" : "gray.200"}
                                            rounded="xl"
                                            size="lg"
                                            _hover={{ borderColor: validationErrors.phone ? "red.400" : "yellow.300" }}
                                            _focus={{ borderColor: validationErrors.phone ? "red.400" : "yellow.400", boxShadow: `0 0 0 1px ${validationErrors.phone ? 'var(--chakra-colors-red-400)' : 'var(--chakra-colors-yellow-400)'}` }}
                                        />
                                    </InputGroup>
                                    {validationErrors.phone && (
                                        <Text color="red.500" fontSize="sm" mt={1}>
                                            {validationErrors.phone}
                                        </Text>
                                    )}
                                </FormControl>
                            </SimpleGrid>

                            {/* Botón de envío */}
                            <Button
                                type="submit"
                                size="lg"
                                w="full"
                                bgGradient="linear(to-r, yellow.400, orange.400)"
                                color="white"
                                fontWeight="semibold"
                                rounded="xl"
                                isLoading={isLoading}
                                loadingText="Creando cuenta..."
                                _hover={{
                                    bgGradient: "linear(to-r, yellow.500, orange.500)",
                                    transform: "translateY(-2px)",
                                    shadow: "xl"
                                }}
                                _active={{
                                    transform: "translateY(0)"
                                }}
                                transition="all 0.2s"
                                onClick={handleSubmit}
                            >
                                Crear Cuenta
                            </Button>
                        </VStack>
                    </Box>

                </Container>
            </Box>
        </Flex>
        </>
    );
}