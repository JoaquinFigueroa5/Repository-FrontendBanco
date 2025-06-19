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
    Divider
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import useUser from '../../shared/hooks/useGetUsers';

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
            <Flex justify="center" align="center" minH="400px">
                <VStack spacing={4}>
                    <Spinner size="xl" color="gold" thickness="4px" />
                    <Text color="gray.600" fontSize="lg">Cargando usuarios...</Text>
                </VStack>
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" borderRadius="lg" bg="red.50" border="1px solid" borderColor="red.200">
                <AlertIcon color="red.500" />
                <Box>
                    <AlertTitle color="red.800">Error al cargar usuarios</AlertTitle>
                    <AlertDescription color="red.600">{error}</AlertDescription>
                </Box>
            </Alert>
        );
    }

    return (
        <Box>
            <Card bg="white" shadow="xl" borderRadius="2xl" border="1px solid" borderColor="gray.100">
                <CardBody p={8}>
                    <TableContainer>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr bg="gray.50">
                                    <Th
                                        color="gray.700"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        py={4}
                                    >
                                        Usuario
                                    </Th>
                                    <Th
                                        color="gray.700"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        py={4}
                                    >
                                        Email
                                    </Th>
                                    <Th
                                        color="gray.700"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        py={4}
                                    >
                                        Teléfono
                                    </Th>
                                    <Th
                                        color="gray.700"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        py={4}
                                    >
                                        Rol
                                    </Th>
                                    <Th
                                        color="gray.700"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        py={4}
                                    >
                                        Acciones
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user) => (
                                    <Tr key={user._id} _hover={{ bg: "gray.50" }} transition="all 0.2s">
                                        <Td py={4}>
                                            <HStack spacing={3}>
                                                <Avatar
                                                    size="sm"
                                                    name={user.name}
                                                    bg="gold"
                                                    color="black"
                                                    fontWeight="bold"
                                                />
                                                <Text fontWeight="medium" color="gray.800">
                                                    {user.name}
                                                </Text>
                                            </HStack>
                                        </Td>
                                        <Td py={4}>
                                            <Text color="gray.600">{user.email}</Text>
                                        </Td>
                                        <Td py={4}>
                                            <Text color="gray.600">{user.phone || 'N/A'}</Text>
                                        </Td>
                                        <Td py={4}>
                                            <Badge
                                                colorScheme={user.role === 'admin' ? 'yellow' : 'gray'}
                                                bg={user.role === 'admin' ? 'gold' : 'gray.100'}
                                                color={user.role === 'admin' ? 'black' : 'gray.600'}
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                fontWeight="medium"
                                                textTransform="capitalize"
                                            >
                                                {user.role || 'Usuario'}
                                            </Badge>
                                        </Td>
                                        <Td py={4}>
                                            <HStack spacing={2}>
                                                <IconButton
                                                    icon={<ViewIcon />}
                                                    size="sm"
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    onClick={() => handleView(user)}
                                                    _hover={{ bg: "blue.100", transform: "scale(1.1)" }}
                                                    transition="all 0.2s"
                                                    aria-label="Ver usuario"
                                                />
                                                <IconButton
                                                    icon={<EditIcon />}
                                                    size="sm"
                                                    bg="gold"
                                                    color="black"
                                                    _hover={{ bg: "yellow.400", transform: "scale(1.1)" }}
                                                    transition="all 0.2s"
                                                    onClick={() => handleEdit(user)}
                                                    aria-label="Editar usuario"
                                                />
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    size="sm"
                                                    bg="black"
                                                    color="white"
                                                    _hover={{ bg: "gray.800", transform: "scale(1.1)" }}
                                                    transition="all 0.2s"
                                                    onClick={() => handleDelete(user)}
                                                    aria-label="Eliminar usuario"
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>

            {/* Modal para ver usuario */}
            <Modal isOpen={isViewOpen} onClose={onViewClose} size="md">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.200">
                    <ModalHeader bg="gray.50" borderTopRadius="2xl">
                        <Heading size="md" color="gray.800">Detalles del Usuario</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        {selectedUser && (
                            <VStack spacing={4} align="stretch">
                                <Flex align="center" justify="center" mb={4}>
                                    <Avatar
                                        size="xl"
                                        name={selectedUser.name}
                                        bg="gold"
                                        color="black"
                                        fontWeight="bold"
                                    />
                                </Flex>
                                <Stack spacing={3}>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>NOMBRE</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.name}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>APELLIDO</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.surname}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>DPI</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.dpi}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>DIRECCION</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.address}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>TRABAJO</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.work}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>GANANCIA</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.role === 'ADMIN_ROLE' ? "" : selectedUser.income.$numberDecimal}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>EMAIL</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.email}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>TELÉFONO</Text>
                                        <Text fontSize="lg" color="gray.800">{selectedUser.phone || 'No especificado'}</Text>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={1}>ROL</Text>
                                        <Badge
                                            colorScheme={selectedUser.role === 'admin' ? 'yellow' : 'gray'}
                                            bg={selectedUser.role === 'admin' ? 'gold' : 'gray.100'}
                                            color={selectedUser.role === 'admin' ? 'black' : 'gray.600'}
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                            fontWeight="medium"
                                            textTransform="capitalize"
                                        >
                                            {selectedUser.role || 'Usuario'}
                                        </Badge>
                                    </Box>
                                </Stack>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter bg="gray.50" borderBottomRadius="2xl">
                        <Button onClick={onViewClose} bg="gray.200" color="gray.700" _hover={{ bg: "gray.300" }}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para editar usuario */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="md">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.200">
                    <ModalHeader bg="gray.50" borderTopRadius="2xl">
                        <Heading size="md" color="gray.800">Editar Usuario</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Nombre</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nombre del usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Apellido</FormLabel>
                                <Input
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    placeholder="Apellido del usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Usuario</FormLabel>
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Direccion</FormLabel>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Direccion del usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Trabajo</FormLabel>
                                <Input
                                    name="work"
                                    value={formData.work}
                                    onChange={handleInputChange}
                                    placeholder="Trabajo del usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Ganancia</FormLabel>
                                <Input
                                    name="income"
                                    value={formData.income ? formData.income.toString() : ''}
                                    onChange={handleInputChange}
                                    placeholder="Ganancia del usuario"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Email</FormLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="email@ejemplo.com"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.700" fontWeight="medium">Teléfono</FormLabel>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Número de teléfono"
                                    borderRadius="lg"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: "gold", boxShadow: "0 0 0 1px gold" }}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="gray.50" borderBottomRadius="2xl">
                        <HStack spacing={3}>
                            <Button
                                onClick={onEditClose}
                                bg="gray.200"
                                color="gray.700"
                                _hover={{ bg: "gray.300" }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmitEdit}
                                bg="gold"
                                color="black"
                                fontWeight="bold"
                                _hover={{ bg: "yellow.400", transform: "translateY(-1px)" }}
                                transition="all 0.2s"
                            >
                                Guardar Cambios
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal para confirmar eliminación */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="sm">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent borderRadius="2xl" border="1px solid" borderColor="red.200">
                    <ModalHeader bg="red.50" borderTopRadius="2xl">
                        <Heading size="md" color="red.800">Confirmar Eliminación</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        <VStack spacing={4} textAlign="center">
                            <Text color="gray.700" fontSize="lg">
                                ¿Estás seguro de que deseas eliminar a este usuario?
                            </Text>
                            {selectedUser && (
                                <Box p={4} bg="gray.50" borderRadius="lg" w="full">
                                    <Text fontWeight="bold" color="gray.800">{selectedUser.name}</Text>
                                    <Text color="gray.600" fontSize="sm">{selectedUser.email}</Text>
                                </Box>
                            )}
                            <Text fontSize="sm" color="red.600" fontWeight="medium">
                                Esta acción no se puede deshacer.
                            </Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter bg="red.50" borderBottomRadius="2xl">
                        <HStack spacing={3}>
                            <Button
                                onClick={onDeleteClose}
                                bg="gray.200"
                                color="gray.700"
                                _hover={{ bg: "gray.300" }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                bg="black"
                                color="white"
                                fontWeight="bold"
                                _hover={{ bg: "gray.800", transform: "translateY(-1px)" }}
                                transition="all 0.2s"
                            >
                                Eliminar Usuario
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default GetUser;