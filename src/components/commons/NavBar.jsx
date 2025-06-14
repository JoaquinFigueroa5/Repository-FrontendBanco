import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';
import useUserStore from '../../context/UserStore';
import { logout } from '../../shared/hooks/useLogout';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const NavLink = ({ children, href = '#', ...props }) => {
    const location = useLocation();

    // Verifica si la ruta actual coincide exactamente o empieza con href (útil para rutas como /eventos/123)
    const isActive = location.pathname === href || location.pathname.startsWith(href + '/');

    return (
        <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link
                px={4}
                py={2}
                rounded="lg"
                color={isActive ? '#FFD700' : 'gray.300'}
                fontWeight={isActive ? 'bold' : 'medium'}
                position="relative"
                _hover={{
                    textDecoration: 'none',
                    color: '#FFD700',
                    bg: 'rgba(255, 215, 0, 0.1)',
                }}
                as={RouterLink}
                to={href}
                {...props}
            >
                {children}
                {isActive && (
                    <MotionBox
                        position="absolute"
                        bottom="-2px"
                        left="50%"
                        width="80%"
                        height="3px"
                        bg="linear-gradient(90deg, #FFD700, #FFA500)"
                        borderRadius="full"
                        initial={{ scaleX: 0, x: '-50%' }}
                        animate={{ scaleX: 1, x: '-50%' }}
                        transition={{ duration: 0.3 }}
                        boxShadow="0 0 8px rgba(255, 215, 0, 0.6)"
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
                color="gray.300"
                _hover={{
                    bg: 'rgba(255, 215, 0, 0.1)',
                    color: '#FFD700',
                }}
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
                                        bg="#FFD700"
                                        color="black"
                                        borderRadius="full"
                                        boxSize="10px"
                                        p={0}
                                        boxShadow="0 0 6px rgba(255, 215, 0, 0.8)"
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
                            <SearchIcon color="#FFD700" />
                        </InputLeftElement>
                        <Input
                            placeholder="Buscar..."
                            borderRadius="full"
                            bg="rgba(0, 0, 0, 0.6)"
                            color="white"
                            border="1px solid"
                            borderColor="rgba(255, 215, 0, 0.3)"
                            _placeholder={{ color: 'gray.400' }}
                            _focus={{
                                borderColor: '#FFD700',
                                boxShadow: '0 0 0 1px #FFD700, 0 0 20px rgba(255, 215, 0, 0.3)',
                                bg: 'rgba(0, 0, 0, 0.8)',
                            }}
                        />
                    </InputGroup>
                </MotionBox>
            )}
        </AnimatePresence>
    );
};

const UserMenu = () => {
    const { user, fetchUser } = useUserStore();

    const handleLogout = () => {
        logout();
        fetchUser();
    }

    const navigate = useNavigate();

    return (
        <Menu>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <MenuButton
                    as={Button}
                    rounded="full"
                    variant="ghost"
                    cursor="pointer"
                    minW={0}
                    color="gray.300"
                    _hover={{
                        bg: 'rgba(255, 215, 0, 0.1)',
                        color: '#FFD700',
                    }}
                >
                    <HStack spacing={2}>
                        <Avatar
                            size="md"
                            color='black'
                            name={`${user?.name || user?.username} ${user?.surname ?? ''}`}
                            bg="linear-gradient(135deg, #FFD700, #FFA500)"
                            border="2px solid"
                            borderColor="#FFD700"
                            boxShadow="0 0 15px rgba(255, 215, 0, 0.4)"
                        />
                        <VStack spacing={0} alignItems="flex-start" display={{ base: 'none', md: 'flex' }}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.200">
                                {user?.name || user?.username} {user?.surname}
                            </Text>
                            <Text fontSize="xs" color="gray.400">{user?.work}</Text>
                        </VStack>
                        <ChevronDownIcon color="#FFD700" />
                    </HStack>
                </MenuButton>
            </MotionBox>
            <MenuList
                bg="rgba(0, 0, 0, 0.95)"
                borderColor="rgba(255, 215, 0, 0.3)"
                border="1px solid"
                boxShadow="0 10px 40px rgba(255, 215, 0, 0.2)"
                backdropFilter="blur(10px)"
            >
                <MenuItem
                    icon={<SettingsIcon color="#FFD700" />}
                    color="gray.200"
                    _hover={{
                        bg: 'rgba(255, 215, 0, 0.1)',
                        color: '#FFD700',
                    }}
                    onClick={() => navigate('/profile')}
                >
                    Configuración
                </MenuItem>
                <MenuItem
                    icon={<StarIcon color="#FFD700" />}
                    color="gray.200"
                    _hover={{
                        bg: 'rgba(255, 215, 0, 0.1)',
                        color: '#FFD700',
                    }}
                >
                    Favoritos
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    color="gray.200"
                    _hover={{
                        bg: 'rgba(255, 215, 0, 0.1)',
                        color: '#FFD700',
                    }}
                >
                    Cerrar Sesión
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const MobileNav = ({ isOpen, onClose, navItems, activeItem, setActiveItem }) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
            <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" />
            <DrawerContent bg="linear-gradient(135deg, #000000 0%, #1a1a1a 100%)">
                <DrawerCloseButton color="#FFD700" _hover={{ bg: 'rgba(255, 215, 0, 0.1)' }} />
                <DrawerHeader borderBottomWidth="1px" borderColor="rgba(255, 215, 0, 0.3)">
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                        bgGradient="linear(to-r, #FFD700, #FFA500)"
                        bgClip="text"
                    >
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
                                    as={RouterLink}
                                    to={item.href}
                                    p={3}
                                    rounded="lg"
                                    bg={activeItem === item.name ? 'rgba(255, 215, 0, 0.1)' : 'transparent'}
                                    color={activeItem === item.name ? '#FFD700' : 'gray.300'}
                                    fontWeight={activeItem === item.name ? 'bold' : 'medium'}
                                    border={activeItem === item.name ? '1px solid' : 'none'}
                                    borderColor={activeItem === item.name ? 'rgba(255, 215, 0, 0.3)' : 'transparent'}
                                    _hover={{
                                        bg: 'rgba(255, 215, 0, 0.1)',
                                        textDecoration: 'none',
                                        color: '#FFD700',
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
                        <Divider borderColor="rgba(255, 215, 0, 0.3)" />
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
    const { user } = useUserStore();

    const navItems = [
        { name: 'Inicio', href: '/dashboard' },
        { name: 'Productos', href: '/productos' },
        ...(user?.role === 'USER_ROLE' ? [{ name: 'Contacto', href: '#' }] : []),
        ...(user?.role === 'USER_ROLE' ? [{ name: 'Transacciones', href: '/transactions' }] : []),
        ...(user?.role === 'ADMIN_ROLE' ? [{ name: 'Register', href: '/register' }] : [])

    ];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                bg="linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)"
                borderBottom="1px solid"
                borderColor="rgba(255, 215, 0, 0.3)"
                position="fixed"
                top={0}
                zIndex={1000}
                backdropFilter="blur(15px)"
                boxShadow={scrollY > 0 ? '0 8px 32px rgba(255, 215, 0, 0.15)' : 'none'}
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
                        bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
                        bgClip="text"
                        cursor="pointer"
                        textShadow="0 0 20px rgba(255, 215, 0, 0.5)"
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
                            color="gray.300"
                            icon={<SearchIcon />}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            _hover={{
                                bg: 'rgba(255, 215, 0, 0.1)',
                                color: '#FFD700',
                            }}
                        />
                    </MotionBox>

                    {/* Color mode toggle
                    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                            size="md"
                            variant="ghost"
                            aria-label="Toggle color mode"
                            color="gray.300"
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            onClick={toggleColorMode}
                            _hover={{
                                bg: 'rgba(255, 215, 0, 0.1)',
                                color: '#FFD700',
                            }}
                        />
                    </MotionBox> */}

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
                            color="gray.300"
                            _hover={{
                                bg: 'rgba(255, 215, 0, 0.1)',
                                color: '#FFD700',
                            }}
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

            <Box h="70px" />
        </>
    );
};

export default NavBar;