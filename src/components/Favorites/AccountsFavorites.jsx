import React, { useState, useEffect } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Card,
    CardBody,
    Avatar,
    IconButton,
    Badge,
    Flex,
    Container,
    Heading,
    useToast,
    Grid,
    GridItem,
    Divider,
    Center
} from '@chakra-ui/react';
import { SearchIcon, StarIcon, AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '../../shared/hooks/useUsers';
import { useAccount } from '../../shared/hooks/useAccount';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const AccountsFavorites = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { accounts, getAccountFavorite } = useUsers();
    const { accountsGen, getAccounts, addFavorite, removeFavorite } = useAccount();
    const toast = useToast();

    useEffect(() => {
        getAccounts();
    }, []);

    useEffect(() => {
        getAccountFavorite();
    }, [])

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value.length > 0) {
            setIsSearching(true);
            setTimeout(() => {
                const results = accountsGen.filter(account =>
                    account.userId.name.toLowerCase().includes(value.toLowerCase()) ||
                    account.userId.email.toLowerCase().includes(value.toLowerCase()) ||
                    account.accountNumber.includes(value.toLowerCase())
                );
                setSearchResults(results);
                setIsSearching(false);
            }, 500);
        } else {
            setSearchResults([]);
        }
    };

    const addToFavorites = async(account) => {
        if (!accounts.find(fav => fav._id === account._id)) {
            await addFavorite(account._id);
            await getAccountFavorite();

            toast({
                title: 'Cuenta agregada',
                description: `${account.name} se agregó a favoritos`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

        } else {
            toast({
                title: 'Cuenta ya existe',
                description: 'Esta cuenta ya está en favoritos',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const removeFromFavorites = async(accountId) => {
        await removeFavorite(accountId);
        await getAccountFavorite();
        toast({
            title: 'Cuenta eliminada',
            description: 'La cuenta se eliminó de favoritos',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });

    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Premium': return 'gold';
            case 'Pro': return 'orange.300';
            case 'Basic': return 'gray.400';
            default: return 'gray.400';
        }
    };

    const EmptyFavoritesView = () => (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Center minH="60vh">
                <VStack spacing={8} textAlign="center">
                    <Box
                        as={motion.div}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        fontSize="6xl"
                    >
                        ⭐
                    </Box>
                    <VStack spacing={4}>
                        <Heading size="lg" color="gold">
                            No tienes cuentas favoritas
                        </Heading>
                        <Text color="gray.300" fontSize="lg" maxW="md">
                            Busca y agrega cuentas a tu lista de favoritos para acceder a ellas rápidamente
                        </Text>
                    </VStack>
                </VStack>
            </Center>
        </MotionBox>
    );

    return (
        <Box
            mx="auto"
            px={{ base: 4, md: 8 }}
            bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)"
            minH="100vh"
        >
            <Container maxW="7xl" py={8}>
                <VStack spacing={8} align="stretch">
                    {/* Header */}
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HStack justify="space-between" align="center">
                            <VStack align="start" spacing={1}>
                                <Heading size="xl" color="gold">
                                    Cuentas Favoritas
                                </Heading>
                                <Text color="gray.400">
                                    Administra y accede rápidamente a tus cuentas favoritas
                                </Text>
                            </VStack>
                            <Badge
                                colorScheme="yellow"
                                variant="solid"
                                px={3}
                                py={1}
                                rounded="full"
                                fontSize="sm"
                            >
                                {accounts.length} favoritos
                            </Badge>
                        </HStack>
                    </MotionBox>
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gold" />
                            </InputLeftElement>
                            <Input
                                placeholder="Buscar cuentas para agregar..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                bg="gray.900"
                                border="2px solid"
                                borderColor="gray.700"
                                color="white"
                                _hover={{ borderColor: 'gold' }}
                                _focus={{ borderColor: 'gold', boxShadow: '0 0 0 1px gold' }}
                                _placeholder={{ color: 'gray.400' }}
                            />
                        </InputGroup>
                    </MotionBox>
                    {/* {console.log('Favs', accounts)} */}
                    {accounts.length > 0 && (
                        <>
                            {/* Favorites Grid */}
                            <MotionBox
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <VStack align="start" spacing={4}>
                                    <Heading size="md" color="gold">
                                        Mis Favoritos ({accounts.length})
                                    </Heading>
                                    <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4} w="full">
                                        <AnimatePresence>
                                            {accounts.map((account, index) => (
                                                <GridItem key={index}>
                                                    <MotionCard
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        bg="gray.900"
                                                        border="1px solid"
                                                        borderColor="gray.700"
                                                        _hover={{
                                                            borderColor: 'gold',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 25px rgba(255, 215, 0, 0.15)'
                                                        }}
                                                    >
                                                        <CardBody>
                                                            <HStack justify="space-between">
                                                                <HStack spacing={3}>
                                                                    <Avatar
                                                                        name={`${account.userId.name} ${account.userId.surname}`}
                                                                        src={account.avatar}
                                                                        size="md"
                                                                        bg="gold"
                                                                        color="black"
                                                                    />
                                                                    <VStack align="start" spacing={1}>
                                                                        <Text fontWeight="bold" color="white">
                                                                            {account.userId.name}
                                                                        </Text>
                                                                        <Text fontSize="sm" color="gray.400">
                                                                            {account.userId.email}
                                                                        </Text>
                                                                        <Badge
                                                                            size="sm"
                                                                        >
                                                                            {account.accountNumber}
                                                                        </Badge>
                                                                    </VStack>
                                                                </HStack>
                                                                <VStack spacing={2}>
                                                                    <IconButton
                                                                        icon={<ViewIcon />}
                                                                        size="sm"
                                                                        colorScheme="yellow"
                                                                        variant="ghost"
                                                                        aria-label="Ver cuenta"
                                                                        _hover={{ bg: 'rgba(255, 215, 0, 0.1)' }}
                                                                    />
                                                                    <IconButton
                                                                        icon={<DeleteIcon />}
                                                                        size="sm"
                                                                        colorScheme="red"
                                                                        variant="ghost"
                                                                        aria-label="Eliminar de favoritos"
                                                                        onClick={() => removeFromFavorites(account._id)}
                                                                    />
                                                                </VStack>
                                                            </HStack>
                                                        </CardBody>
                                                    </MotionCard>
                                                </GridItem>
                                            ))}
                                        </AnimatePresence>
                                    </Grid>
                                </VStack>
                            </MotionBox>
                        </>
                    )}

                    {/* Search Results */}
                    {searchTerm && searchResults.length > 0 && (
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <VStack align="start" spacing={4}>
                                <Divider borderColor="gray.700" />
                                <Heading size="md" color="gold">
                                    Resultados de búsqueda ({searchResults.length})
                                </Heading>
                                <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4} w="full">
                                    {searchResults.map((account, index) => (
                                        <GridItem key={`search-${account._id}`}>
                                            <MotionCard
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                bg="gray.800"
                                                border="1px solid"
                                                borderColor="gray.600"
                                                _hover={{ borderColor: 'gold' }}
                                            >
                                                <CardBody>
                                                    <HStack justify="space-between">
                                                        <HStack spacing={3}>
                                                            <Avatar
                                                                name={`${account.userId.name} ${account.userId.surname}`}
                                                                src={account.avatar}
                                                                size="md"
                                                                bg="gray.600"
                                                                color="white"
                                                            />
                                                            <VStack align="start" spacing={1}>
                                                                <Text fontWeight="bold" color="white">
                                                                    {`${account.userId.name} ${account.userId.surname}`}
                                                                </Text>
                                                                <Text fontSize="sm" color="gray.400">
                                                                    {account.userId.email}
                                                                </Text>
                                                                <Badge
                                                                    colorScheme={account.type === 'Premium' ? 'yellow' :
                                                                        account.type === 'Pro' ? 'orange' : 'gray'}
                                                                    size="sm"
                                                                >
                                                                    {account.accountNumber}
                                                                </Badge>
                                                            </VStack>
                                                        </HStack>
                                                        <Button
                                                            leftIcon={<AddIcon />}
                                                            colorScheme="yellow"
                                                            size="sm"
                                                            onClick={() => {
                                                                addToFavorites(account);
                                                            }}
                                                            isDisabled={accounts.some(fav => fav._id === account._id)}
                                                        >
                                                            {accounts.some(fav => fav._id === account._id) ? 'Agregado' : 'Agregar'}
                                                        </Button>
                                                    </HStack>
                                                </CardBody>
                                            </MotionCard>
                                        </GridItem>
                                    ))}
                                </Grid>
                            </VStack>
                        </MotionBox>
                    )}

                    {/* Empty state cuando no hay búsquedas y no hay favoritos */}
                    {accounts.length === 0 && !searchTerm && <EmptyFavoritesView />}

                    {/* No results message */}
                    {searchTerm && searchResults.length === 0 && !isSearching && (
                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Text fontSize="xl" color="gray.400">
                                        No se encontraron cuentas con "{searchTerm}"
                                    </Text>
                                    <Text color="gray.500">
                                        Intenta con otro término de búsqueda
                                    </Text>
                                </VStack>
                            </Center>
                        </MotionBox>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default AccountsFavorites;