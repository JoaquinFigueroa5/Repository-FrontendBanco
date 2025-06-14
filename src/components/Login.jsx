import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    HStack,
    Stack,
    Heading,
    Text,
    Flex,
    Image,
    Icon,
    InputGroup,
    InputLeftElement,
    Divider,
    useColorModeValue,
    Spinner,
    Link
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, CheckIcon } from "@chakra-ui/icons";
import { useLogin } from "../shared/hooks";

export default function Login() {
    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const { login, isLoading } = useLogin();

    const [rememberMe, setRememberMe] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleInputChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
            }
        }));
    };

    const handleInputBlur = (field, value) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }

        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                isValid,
                showError: !isValid && value.length > 0
            }
        }));
    };

    const handleLogin = async () => {
        login(formState.email.value, formState.password.value)
    };

    const isSubmitDisabled = !formState.email.isValid || !formState.password.isValid || isLoading;

    // Colores del tema
    const bgGradient = "linear(to-br, yellow.400, orange.400, amber.500)";
    const formBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");
    const labelColor = useColorModeValue("gray.700", "gray.200");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const focusBorderColor = "yellow.400";

    return (
        <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>
            {/* Sección de Imagen - Lado Izquierdo */}
            <Box
                display={{ base: "none", lg: "flex" }}
                w={{ lg: "50%" }}
                position="relative"
                bgGradient={bgGradient}
                alignItems="center"
                justifyContent="center"
                p={12}
            >
                {/* Patrón de fondo */}
                <Box
                    position="absolute"
                    inset={0}
                    opacity={0.1}
                    backgroundImage="radial-gradient(circle, white 2px, transparent 2px)"
                    backgroundSize="40px 40px"
                />

                {/* Overlay oscuro */}
                <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.500, transparent, blackAlpha.300)"
                />

                {/* Contenido */}
                <VStack
                    position="relative"
                    zIndex={1}
                    color="white"
                    textAlign="center"
                    maxW="md"
                    spacing={8}
                >
                    {/* Ícono principal */}
                    <Box
                        w={24}
                        h={24}
                        bg="whiteAlpha.200"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        backdropFilter="blur(10px)"
                    >
                        <Icon viewBox="0 0 24 24" boxSize={12} fill="currentColor">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                        </Icon>
                    </Box>

                    <VStack spacing={4}>
                        <Heading size="2xl" fontWeight="bold">
                            Bienvenido de Vuelta
                        </Heading>
                        <Text fontSize="xl" opacity={0.9}>
                            Accede a tu cuenta y continúa tu experiencia única con nosotros.
                        </Text>
                    </VStack>

                    {/* Lista de características */}
                    <VStack spacing={4} align="flex-start" w="full">
                        <HStack>
                            <Box w={2} h={2} bg="yellow.300" borderRadius="full" />
                            <Text fontSize="lg">Acceso seguro y encriptado</Text>
                        </HStack>
                        <HStack>
                            <Box w={2} h={2} bg="yellow.300" borderRadius="full" />
                            <Text fontSize="lg">Interface moderna y elegante</Text>
                        </HStack>
                        <HStack>
                            <Box w={2} h={2} bg="yellow.300" borderRadius="full" />
                            <Text fontSize="lg">Experiencia personalizada</Text>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>

            {/* Sección del formulario - Lado Derecho */}
            <Flex
                w={{ base: "100%", lg: "50%" }}
                alignItems="center"
                justifyContent="center"
                p={8}
                bg={useColorModeValue("gray.50", "gray.900")}
            >
                <Box maxW="md" w="full">
                    {/* Header del formulario */}
                    <VStack spacing={8} mb={8}>
                        {/* Logo */}
                        <Box
                            w={16}
                            h={16}
                            bgGradient="linear(to-r, yellow.400, orange.400)"
                            borderRadius="2xl"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            boxShadow="lg"
                        >
                            <CheckIcon boxSize={8} color="white" />
                        </Box>

                        <VStack spacing={2}>
                            <Heading size="xl" color={textColor}>
                                Iniciar Sesión
                            </Heading>
                            <Text color="gray.600">
                                Ingresa tus credenciales para continuar
                            </Text>
                        </VStack>
                    </VStack>

                    {/* Formulario */}
                    <VStack spacing={6}>
                        {/* Campo Email */}
                        <FormControl isInvalid={formState.email.showError}>
                            <FormLabel color={labelColor} fontWeight="semibold">
                                Correo Electrónico
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <EmailIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={formState.email.value}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onBlur={(e) => handleInputBlur('email', e.target.value)}
                                    borderColor={borderColor}
                                    focusBorderColor={focusBorderColor}
                                    bg={formBg}
                                    size="lg"
                                    borderRadius="xl"
                                    _hover={{ borderColor: "yellow.300" }}
                                />
                            </InputGroup>
                            {formState.email.showError && (
                                <FormErrorMessage>
                                    Por favor ingresa un email válido
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        {/* Campo Password */}
                        <FormControl isInvalid={formState.password.showError}>
                            <FormLabel color={labelColor} fontWeight="semibold">
                                Contraseña
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <LockIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formState.password.value}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    onBlur={(e) => handleInputBlur('password', e.target.value)}
                                    borderColor={borderColor}
                                    focusBorderColor={focusBorderColor}
                                    bg={formBg}
                                    size="lg"
                                    borderRadius="xl"
                                    _hover={{ borderColor: "yellow.300" }}
                                />
                            </InputGroup>
                            {formState.password.showError && (
                                <FormErrorMessage>
                                    La contraseña debe tener al menos 6 caracteres
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        {/* Recordarme y Olvidé contraseña */}
                        <Flex justify="space-between" w="full" align="center">
                            <Checkbox
                                isChecked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                colorScheme="yellow"
                                size="sm"
                            >
                                <Text fontSize="sm" color={labelColor}>
                                    Recordarme
                                </Text>
                            </Checkbox>
                            <Link
                                fontSize="sm"
                                color="yellow.600"
                                fontWeight="medium"
                                _hover={{ color: "yellow.700" }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Flex>

                        {/* Botón de envío */}
                        <Button
                            onClick={handleLogin}
                            isDisabled={isSubmitDisabled}
                            isLoading={isLoading}
                            loadingText="Iniciando sesión..."
                            spinner={<Spinner size="sm" />}
                            w="full"
                            size="lg"
                            bgGradient="linear(to-r, yellow.400, orange.400)"
                            color="white"
                            fontWeight="semibold"
                            borderRadius="xl"
                            _hover={{
                                bgGradient: "linear(to-r, yellow.500, orange.500)",
                                transform: "translateY(-2px)",
                                boxShadow: "xl"
                            }}
                            _active={{
                                transform: "translateY(0)",
                            }}
                            transition="all 0.2s"
                        >
                            Iniciar Sesión
                        </Button>

                        {/* Divisor */}
                        <HStack w="full">
                            <Divider />
                            <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                                O continúa con
                            </Text>
                            <Divider />
                        </HStack>

                        {/* Botones de redes sociales */}
                        <HStack spacing={3} w="full">
                            <Button
                                flex={1}
                                variant="outline"
                                size="lg"
                                borderRadius="lg"
                                leftIcon={
                                    <Icon viewBox="0 0 24 24" boxSize={5}>
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </Icon>
                                }
                                _hover={{ bg: "gray.50" }}
                            >
                                Google
                            </Button>
                            <Button
                                flex={1}
                                variant="outline"
                                size="lg"
                                borderRadius="lg"
                                leftIcon={
                                    <Icon viewBox="0 0 24 24" boxSize={5} color="#1877F2">
                                        <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </Icon>
                                }
                                _hover={{ bg: "gray.50" }}
                            >
                                Facebook
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        </Flex>
    );
}