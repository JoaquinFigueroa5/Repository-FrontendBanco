import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Avatar,
    Text,
    Badge,
    Input,
    InputGroup,
    InputLeftElement,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    Divider,
    useColorMode,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HamburgerIcon,
    CloseIcon,
    SearchIcon,
    BellIcon,
    ChevronDownIcon,
    MoonIcon,
    SunIcon,
    SettingsIcon,
    StarIcon,
} from '@chakra-ui/icons';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const NavLink = ({ children, href = '#', isActive = false, ...props }) => {
    const activeColor = useColorModeValue('blue.500', 'blue.300');
    const hoverColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link
                px={3}
                py={2}
                rounded="lg"
                color={isActive ? activeColor : useColorModeValue('gray.700', 'gray.200')}
                fontWeight={isActive ? 'semibold' : 'medium'}
                position="relative"
                _hover={{
                    textDecoration: 'none',
                    color: hoverColor,
                }}
                href={href}
                {...props}
            >
                {children}
                {isActive && (
                    <MotionBox
                        position="absolute"
                        bottom="-2px"
                        left="50%"
                        width="80%"
                        height="2px"
                        bg={activeColor}
                        borderRadius="full"
                        initial={{ scaleX: 0, x: '-50%' }}
                        animate={{ scaleX: 1, x: '-50%' }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </Link>
        </MotionBox>
    );
};

const NotificationBell = () => {
    const [hasNotifications, setHasNotifications] = useState(true);

    return (
        <MotionBox
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
        >
            <IconButton
                size="md"
                variant="ghost"
                aria-label="Notifications"
                icon={
                    <Box position="relative">
                        <BellIcon boxSize={5} />
                        <AnimatePresence>
                            {hasNotifications && (
                                <MotionBox
                                    position="absolute"
                                    top="-2px"
                                    right="-2px"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <Badge
                                        colorScheme="red"
                                        borderRadius="full"
                                        boxSize="8px"
                                        p={0}
                                    />
                                </MotionBox>
                            )}
                        </AnimatePresence>
                    </Box>
                }
                onClick={() => setHasNotifications(!hasNotifications)}
            />
        </MotionBox>
    );
};

const SearchBar = ({ isOpen, onToggle }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <MotionBox
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "250px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    overflow="hidden"
                >
                    <InputGroup size="md">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Buscar..."
                            borderRadius="full"
                            bg={useColorModeValue('white', 'gray.700')}
                            border="1px solid"
                            borderColor={useColorModeValue('gray.200', 'gray.600')}
                            _focus={{
                                borderColor: 'blue.400',
                                boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
                            }}
                        />
                    </InputGroup>
                </MotionBox>
            )}
        </AnimatePresence>
    );
};

const UserMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                >
                    <HStack spacing={2}>
                        <Avatar
                            size="sm"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            name="Usuario"
                        />
                        <VStack spacing={0} alignItems="flex-start" display={{ base: 'none', md: 'flex' }}>
                            <Text fontSize="sm" fontWeight="medium">Juan Pérez</Text>
                            <Text fontSize="xs" color="gray.500">Developer</Text>
                        </VStack>
                        <ChevronDownIcon />
                    </HStack>
                </MenuButton>
            </MotionBox>
            <MenuList
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                boxShadow="lg"
            >
                <MenuItem icon={<SettingsIcon />} onClick={() => navigate('/profile')}> Profile </MenuItem>
                <MenuItem icon={<StarIcon />}>Favoritos</MenuItem>
                <MenuItem>Cerrar Sesión</MenuItem>
            </MenuList>
        </Menu>
    );
};

const MobileNav = ({ isOpen, onClose, navItems, activeItem, setActiveItem }) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500">
                        Los chiludos banco
                    </Text>
                </DrawerHeader>
                <DrawerBody>
                    <VStack spacing={4} align="stretch" mt={4}>
                        {navItems.map((item) => (
                            <MotionBox
                                key={item.name}
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    p={3}
                                    rounded="lg"
                                    bg={activeItem === item.name ? 'blue.50' : 'transparent'}
                                    color={activeItem === item.name ? 'blue.600' : 'gray.600'}
                                    fontWeight={activeItem === item.name ? 'semibold' : 'medium'}
                                    _hover={{
                                        bg: 'gray.50',
                                        textDecoration: 'none',
                                    }}
                                    onClick={() => {
                                        setActiveItem(item.name);
                                        onClose();
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </MotionBox>
                        ))}
                        <Divider />
                        <UserMenu />
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Inicio');
    const [scrollY, setScrollY] = useState(0);
    const { colorMode, toggleColorMode } = useColorMode();

    const navItems = [
        { name: 'Inicio', href: '#' },
        { name: 'Productos', href: '#' },
        { name: 'Servicios', href: '#' },
        { name: 'Sobre Nosotros', href: '#' },
        { name: 'Contacto', href: '#' },
        { name: 'Transacciones', href: '/transactions' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <>
            <MotionFlex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                px={6}
                py={4}
                bg={navBg}
                borderBottom="1px"
                borderColor={borderColor}
                position="fixed"
                top={0}
                zIndex={1000}
                backdropFilter="blur(10px)"
                boxShadow={scrollY > 0 ? 'lg' : 'none'}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo */}
                <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="blue.500"
                        cursor="pointer"
                    >
                        Los chiludos banco
                    </Text>
                </MotionBox>

                {/* Desktop Navigation */}
                <HStack spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
                    <HStack as="nav" spacing={4}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                isActive={activeItem === item.name}
                                onClick={() => setActiveItem(item.name)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </HStack>
                </HStack>

                {/* Right side actions */}
                <HStack spacing={4}>
                    {/* Search */}
                    <SearchBar
                        isOpen={isSearchOpen}
                        onToggle={() => setIsSearchOpen(!isSearchOpen)}
                    />

                    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                            size="md"
                            variant="ghost"
                            aria-label="Search"
                            icon={<SearchIcon />}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        />
                    </MotionBox>

                    {/* Color mode toggle */}
                    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                            size="md"
                            variant="ghost"
                            aria-label="Toggle color mode"
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                        />
                    </MotionBox>

                    {/* Notifications */}
                    <NotificationBell />

                    {/* User Menu - Desktop */}
                    <Box display={{ base: 'none', md: 'block' }}>
                        <UserMenu />
                    </Box>

                    {/* Mobile menu button */}
                    <MotionBox
                        display={{ base: 'block', md: 'none' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconButton
                            size="md"
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label="Open Menu"
                            onClick={isOpen ? onClose : onOpen}
                            variant="ghost"
                        />
                    </MotionBox>
                </HStack>
            </MotionFlex>

            {/* Mobile Navigation */}
            <MobileNav
                isOpen={isOpen}
                onClose={onClose}
                navItems={navItems}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />

            <Box h="80px" />


        </>
    );
};

export default NavBar;