import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Text,
    Badge,
    Avatar,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
    Flex,
    Card,
    CardBody,
    Heading,
    Stack,
    Divider,
    Container
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import useUser from '../../shared/hooks/useGetUsers';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTr = motion(Tr);

const GetUser = () => {
    const { users, loading, error, editUser, removeUser, fetchUsers } = useUser();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        address: '',
        work: '',
        income: '',
        email: '',
        phone: '',
        role: ''
    });

    const toast = useToast();

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name || '',
            surname: user.surname || '',
            username: user.username || '',
            address: user.address || '',
            work: user.work || '',
            income: user.income.$numberDecimal || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || ''
        });
        onEditOpen();
    };

    const handleView = (user) => {
        setSelectedUser(user);
        onViewOpen();
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        onDeleteOpen();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitEdit = async () => {
        try {
            await editUser(selectedUser._id, formData);
            await fetchUsers();
            toast({
                title: "Usuario actualizado",
                description: "El usuario ha sido actualizado exitosamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            onEditClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el usuario.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await removeUser(selectedUser._id);
            await fetchUsers();
            toast({
                title: "Usuario eliminado",
                description: "El usuario ha sido eliminado exitosamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            onDeleteClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo eliminar el usuario.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    };

    if (loading) {
        return (
            <Container maxW="7xl" py={8}>
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Flex justify="center" align="center" minH="400px">
                        <VStack spacing={6}>
                            <Box position="relative">
                                <Spinner
                                    size="xl"
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="gold"
                                />
                                <Box
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    w="60px"
                                    h="60px"
                                    bgGradient="radial(gold, transparent)"
                                    opacity="0.3"
                                    borderRadius="full"
                                    animation="pulse 2s infinite"
                                />
                            </Box>
                            <Text
                                color="gray.600"
                                fontSize="lg"
                                fontWeight="medium"
                                letterSpacing="wide"
                            >
                                Cargando usuarios...
                            </Text>
                        </VStack>
                    </Flex>
                </MotionBox>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW="7xl" py={8}>
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Alert
                        status="error"
                        borderRadius="xl"
                        bg="red.50"
                        border="1px solid"
                        borderColor="red.200"
                        p={6}
                    >
                        <AlertIcon color="red.500" />
                        <Box>
                            <AlertTitle color="red.800" fontSize="lg" fontWeight="bold">
                                Error al cargar usuarios
                            </AlertTitle>
                            <AlertDescription color="red.600" mt={2}>
                                {error}
                            </AlertDescription>
                        </Box>
                    </Alert>
                </MotionBox>
            </Container>
        );
    }

    return (
        <Container maxW="7xl" py={8}>
            <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <VStack spacing={6} mb={8} align="stretch">
                    <Box textAlign="center">
                        <Heading
                            size="2xl"
                            bgGradient="linear(to-r, black, gold, black)"
                            bgClip="text"
                            fontWeight="black"
                            letterSpacing="tight"
                            mb={2}
                        >
                            Gestión de Usuarios
                        </Heading>
                        <Text color="gray.600" fontSize="lg" fontWeight="medium">
                            Administra y visualiza todos los usuarios del sistema
                        </Text>
                    </Box>

                    <Box h="1px" bgGradient="linear(to-r, transparent, gold, transparent)" />
                </VStack>

                {/* Main Card */}
                <MotionCard
                    bg="white"
                    shadow="2xl"
                    borderRadius="3xl"
                    border="1px solid"
                    borderColor="gray.100"
                    overflow="hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    _hover={{
                        shadow: "3xl",
                        transform: "translateY(-2px)"
                    }}
                // transition="all 0.3s ease"
                >
                    <Box
                        h="4px"
                        bgGradient="linear(to-r, black, gold, black)"
                    />

                    <CardBody p={0}>
                        <TableContainer>
                            <Table variant="simple" size="lg">
                                <Thead>
                                    <Tr bg="gray.900" position="relative">
                                        <Th
                                            color="gold"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                            py={6}
                                            position="relative"
                                            zIndex={1}
                                        >
                                            Usuario
                                        </Th>
                                        <Th
                                            color="gold"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                            py={6}
                                            position="relative"
                                            zIndex={1}
                                        >
                                            Email
                                        </Th>
                                        <Th
                                            color="gold"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                            py={6}
                                            position="relative"
                                            zIndex={1}
                                        >
                                            Teléfono
                                        </Th>
                                        <Th
                                            color="gold"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                            py={6}
                                            position="relative"
                                            zIndex={1}
                                        >
                                            Rol
                                        </Th>
                                        <Th
                                            color="gold"
                                            fontSize="sm"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                            py={6}
                                            position="relative"
                                            zIndex={1}
                                        >
                                            Acciones
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user, index) => (
                                        <MotionTr
                                            key={user._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            _hover={{
                                                bg: "gold.50",
                                                transform: "scale(1.01)"
                                            }}
                                            // transition="all 0.3s ease"
                                            borderBottom="1px solid"
                                            borderColor="gray.100"
                                        >
                                            <Td py={6}>
                                                <HStack spacing={4}>
                                                    <Box position="relative">
                                                        <Avatar
                                                            size="md"
                                                            name={user.name}
                                                            bg="gold"
                                                            color="black"
                                                            fontWeight="bold"
                                                            border="2px solid"
                                                            borderColor="gold"
                                                            shadow="lg"
                                                        />
                                                        <Box
                                                            position="absolute"
                                                            top="-2px"
                                                            right="-2px"
                                                            w="4"
                                                            h="4"
                                                            bg="green.400"
                                                            borderRadius="full"
                                                            border="2px solid white"
                                                        />
                                                    </Box>
                                                    <VStack align="start" spacing={0}>
                                                        <Text
                                                            fontWeight="bold"
                                                            color="gray.900"
                                                            fontSize="md"
                                                        >
                                                            {user.name}
                                                        </Text>
                                                        <Text
                                                            fontSize="sm"
                                                            color="gray.500"
                                                            fontWeight="medium"
                                                        >
                                                            @{user.username || 'sin-usuario'}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </Td>
                                            <Td py={6}>
                                                <Text
                                                    color="gray.700"
                                                    fontWeight="medium"
                                                    fontSize="md"
                                                >
                                                    {user.email}
                                                </Text>
                                            </Td>
                                            <Td py={6}>
                                                <Text
                                                    color="gray.700"
                                                    fontWeight="medium"
                                                    fontSize="md"
                                                >
                                                    {user.phone || 'N/A'}
                                                </Text>
                                            </Td>
                                            <Td py={6}>
                                                <Badge
                                                    bg={user.role === 'ADMIN_ROLE' ? 'gold' : 'black'}
                                                    color={user.role === 'ADMIN_ROLE' ? 'black' : 'white'}
                                                    px={4}
                                                    py={2}
                                                    borderRadius="full"
                                                    fontWeight="bold"
                                                    textTransform="uppercase"
                                                    fontSize="xs"
                                                    letterSpacing="wide"
                                                    shadow="md"
                                                >
                                                    {user.role === 'ADMIN_ROLE' ? '👑 Admin' : '👤 Usuario'}
                                                </Badge>
                                            </Td>
                                            <Td py={6}>
                                                <HStack spacing={2}>
                                                    <IconButton
                                                        icon={<ViewIcon />}
                                                        size="sm"
                                                        bg="blue.500"
                                                        color="white"
                                                        borderRadius="full"
                                                        _hover={{
                                                            bg: "blue.600",
                                                            transform: "scale(1.15)",
                                                            shadow: "lg"
                                                        }}
                                                        transition="all 0.2s"
                                                        onClick={() => handleView(user)}
                                                        aria-label="Ver usuario"
                                                    />
                                                    <IconButton
                                                        icon={<EditIcon />}
                                                        size="sm"
                                                        bg="gold"
                                                        color="black"
                                                        borderRadius="full"
                                                        _hover={{
                                                            bg: "yellow.400",
                                                            transform: "scale(1.15)",
                                                            shadow: "lg"
                                                        }}
                                                        transition="all 0.2s"
                                                        onClick={() => handleEdit(user)}
                                                        aria-label="Editar usuario"
                                                    />
                                                    {user.role !== 'ADMIN_ROLE' ? (
                                                        <IconButton
                                                            icon={<DeleteIcon />}
                                                            size="sm"
                                                            bg="black"
                                                            color="white"
                                                            borderRadius="full"
                                                            _hover={{
                                                                bg: "red.600",
                                                                transform: "scale(1.15)",
                                                                shadow: "lg"
                                                            }}
                                                            transition="all 0.2s"
                                                            onClick={() => handleDelete(user)}
                                                            aria-label="Eliminar usuario"
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </HStack>
                                            </Td>
                                        </MotionTr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </MotionCard>
            </MotionBox>

            {/* Modal para ver usuario */}
            <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent
                    borderRadius="3xl"
                    border="2px solid"
                    borderColor="gold"
                    overflow="hidden"
                    bg="white"
                    shadow="2xl"
                >
                    <Box
                        h="4px"
                        bgGradient="linear(to-r, black, gold, black)"
                    />
                    <ModalHeader
                        bg="gray.900"
                        color="gold"
                        py={6}
                        position="relative"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgGradient="linear(135deg, black, gray.900)"
                            opacity={0.95}
                        />
                        <HStack spacing={3} position="relative" zIndex={1}>
                            <Box
                                w="6"
                                h="6"
                                bg="gold"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize="xs" color="black" fontWeight="bold">👤</Text>
                            </Box>
                            <Heading size="lg" fontWeight="bold" letterSpacing="tight">
                                Detalles del Usuario
                            </Heading>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton color="gold" zIndex={2} />
                    <ModalBody p={8} bg="white">
                        {selectedUser && (
                            <VStack spacing={6} align="stretch">
                                <Flex align="center" justify="center" mb={6}>
                                    <Box position="relative">
                                        <Avatar
                                            size="2xl"
                                            name={selectedUser.name}
                                            bg="gold"
                                            color="black"
                                            fontWeight="bold"
                                            border="4px solid"
                                            borderColor="gold"
                                            shadow="xl"
                                        />
                                        <Box
                                            position="absolute"
                                            bottom="0"
                                            right="0"
                                            w="8"
                                            h="8"
                                            bg="green.400"
                                            borderRadius="full"
                                            border="3px solid white"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Text fontSize="sm">✓</Text>
                                        </Box>
                                    </Box>
                                </Flex>

                                <Stack spacing={4}>
                                    {[
                                        { label: 'NOMBRE', value: selectedUser.name },
                                        { label: 'APELLIDO', value: selectedUser.surname },
                                        { label: 'DPI', value: selectedUser.dpi },
                                        { label: 'DIRECCIÓN', value: selectedUser.address },
                                        { label: 'TRABAJO', value: selectedUser.work },
                                        { label: 'GANANCIA', value: selectedUser.role === 'ADMIN_ROLE' ? 'Administrador' : selectedUser.income?.$numberDecimal },
                                        { label: 'EMAIL', value: selectedUser.email },
                                        { label: 'TELÉFONO', value: selectedUser.phone || 'No especificado' }
                                    ].map((item, index) => (
                                        <Box key={index}>
                                            <HStack justify="space-between" align="start" py={3}>
                                                <Text
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                    color="gray.500"
                                                    letterSpacing="widest"
                                                    minW="120px"
                                                >
                                                    {item.label}
                                                </Text>
                                                <Text
                                                    fontSize="md"
                                                    color="gray.900"
                                                    fontWeight="medium"
                                                    textAlign="right"
                                                    flex={1}
                                                >
                                                    {item.value || 'No especificado'}
                                                </Text>
                                            </HStack>
                                            <Divider borderColor="gray.200" />
                                        </Box>
                                    ))}

                                    <HStack justify="space-between" align="center" py={3}>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="bold"
                                            color="gray.500"
                                            letterSpacing="widest"
                                        >
                                            ROL
                                        </Text>
                                        <Badge
                                            bg={selectedUser.role === 'ADMIN_ROLE' ? 'gold' : 'black'}
                                            color={selectedUser.role === 'ADMIN_ROLE' ? 'black' : 'white'}
                                            px={4}
                                            py={2}
                                            borderRadius="full"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            fontSize="xs"
                                            letterSpacing="wide"
                                        >
                                            {selectedUser.role === 'ADMIN_ROLE' ? '👑 Admin' : '👤 Usuario'}
                                        </Badge>
                                    </HStack>
                                </Stack>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter bg="gray.50" py={6}>
                        <Button
                            onClick={onViewClose}
                            bg="black"
                            color="white"
                            fontWeight="bold"
                            px={8}
                            borderRadius="full"
                            _hover={{
                                bg: "gray.800",
                                transform: "translateY(-2px)",
                                shadow: "lg"
                            }}
                            transition="all 0.2s"
                        >
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para editar usuario */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent
                    borderRadius="3xl"
                    border="2px solid"
                    borderColor="gold"
                    overflow="hidden"
                    bg="white"
                    shadow="2xl"
                    color='black'
                >
                    <Box
                        h="4px"
                        bgGradient="linear(to-r, black, gold, black)"
                    />
                    <ModalHeader
                        bg="gray.900"
                        color="gold"
                        py={6}
                        position="relative"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgGradient="linear(135deg, black, gray.900)"
                            opacity={0.95}
                        />
                        <HStack spacing={3} position="relative" zIndex={1}>
                            <Box
                                w="6"
                                h="6"
                                bg="gold"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize="xs" color="black" fontWeight="bold">✏️</Text>
                            </Box>
                            <Heading size="lg" fontWeight="bold" letterSpacing="tight">
                                Editar Usuario
                            </Heading>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton color="gold" zIndex={2} />
                    <ModalBody p={8} bg="white">
                        <VStack spacing={6}>
                            {[
                                { name: 'name', label: 'Nombre', placeholder: 'Nombre del usuario' },
                                { name: 'surname', label: 'Apellido', placeholder: 'Apellido del usuario' },
                                { name: 'username', label: 'Usuario', placeholder: 'Usuario' },
                                { name: 'address', label: 'Dirección', placeholder: 'Dirección del usuario' },
                                { name: 'work', label: 'Trabajo', placeholder: 'Trabajo del usuario' },
                                { name: 'income', label: 'Ganancia', placeholder: 'Ganancia del usuario' },
                                { name: 'email', label: 'Email', placeholder: 'email@ejemplo.com', type: 'email' },
                                { name: 'phone', label: 'Teléfono', placeholder: 'Número de teléfono' }
                            ].map((field, index) => (
                                <FormControl key={index}>
                                    <FormLabel
                                        color="gray.700"
                                        fontWeight="bold"
                                        fontSize="sm"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                    >
                                        {field.label}
                                    </FormLabel>
                                    <Input
                                        name={field.name}
                                        type={field.type || 'text'}
                                        value={field.name === 'income' ? (formData[field.name] ? formData[field.name].toString() : '') : formData[field.name]}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        borderRadius="xl"
                                        borderColor="gray.300"
                                        borderWidth="2px"
                                        py={3}
                                        px={4}
                                        fontSize="md"
                                        _focus={{
                                            borderColor: "gold",
                                            boxShadow: "0 0 0 3px rgba(255, 215, 0, 0.1)",
                                            transform: "scale(1.02)"
                                        }}
                                        _hover={{
                                            borderColor: "gray.400"
                                        }}
                                        transition="all 0.2s"
                                    />
                                </FormControl>
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="gray.50" py={6}>
                        <HStack spacing={4}>
                            <Button
                                onClick={onEditClose}
                                bg="gray.200"
                                color="gray.700"
                                fontWeight="bold"
                                px={8}
                                borderRadius="full"
                                _hover={{
                                    bg: "gray.300",
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.2s"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmitEdit}
                                bg="gold"
                                color="black"
                                fontWeight="bold"
                                px={8}
                                borderRadius="full"
                                _hover={{
                                    bg: "yellow.400",
                                    transform: "translateY(-2px)",
                                    shadow: "lg"
                                }}
                                transition="all 0.2s"
                            >
                                💾 Guardar Cambios
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para confirmar eliminación */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="md">
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent
                    borderRadius="3xl"
                    border="2px solid"
                    borderColor="red.400"
                    overflow="hidden"
                    bg="white"
                    shadow="2xl"
                >
                    <Box
                        h="4px"
                        bgGradient="linear(to-r, red.500, red.600, red.500)"
                    />
                    <ModalHeader
                        bg="red.500"
                        color="white"
                        py={6}
                        position="relative"
                    >
                        <HStack spacing={3}>
                            <Box
                                w="6"
                                h="6"
                                bg="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize="xs" color="red.500" fontWeight="bold">⚠️</Text>
                            </Box>
                            <Heading size="lg" fontWeight="bold" letterSpacing="tight">
                                Confirmar Eliminación
                            </Heading>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody p={8}>
                        <VStack spacing={6} textAlign="center">
                            <Text color="gray.700" fontSize="lg" fontWeight="medium">
                                ¿Estás seguro de que deseas eliminar a este usuario?
                            </Text>
                            {selectedUser && (
                                <Box
                                    p={6}
                                    bg="gray.50"
                                    borderRadius="xl"
                                    w="full"
                                    border="1px solid"
                                    borderColor="gray.200"
                                >
                                    <HStack spacing={4} justify="center">
                                        <Avatar
                                            size="md"
                                            name={selectedUser.name}
                                            bg="gold"
                                            color="black"
                                            fontWeight="bold"
                                        />
                                        <VStack spacing={1} align="start">
                                            <Text fontWeight="bold" color="gray.800" fontSize="md">
                                                {selectedUser.name}
                                            </Text>
                                            <Text color="gray.600" fontSize="sm">
                                                {selectedUser.email}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            )}
                            <Box
                                p={4}
                                bg="red.50"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="red.200"
                                w="full"
                            >
                                <Text fontSize="sm" color="red.700" fontWeight="bold" textAlign="center">
                                    ⚠️ Esta acción no se puede deshacer
                                </Text>
                            </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="gray.50" py={6}>
                        <HStack spacing={4}>
                            <Button
                                onClick={onDeleteClose}
                                bg="gray.200"
                                color="gray.700"
                                fontWeight="bold"
                                px={8}
                                borderRadius="full"
                                _hover={{
                                    bg: "gray.300",
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.2s"
                            >
                                Cancelar
                            </Button>
                            {selectedUser?.role !== 'ADMIN_ROLE' ? (
                                <Button
                                    onClick={handleConfirmDelete}
                                    bg="black"
                                    color="white"
                                    fontWeight="bold"
                                    px={8}
                                    borderRadius="full"
                                    _hover={{
                                        bg: "red.600",
                                        transform: "translateY(-2px)",
                                        shadow: "lg"
                                    }}
                                    transition="all 0.2s"
                                >
                                    🗑️ Eliminar Usuario
                                </Button>
                            ) : (
                                ''
                            )}
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default GetUser;