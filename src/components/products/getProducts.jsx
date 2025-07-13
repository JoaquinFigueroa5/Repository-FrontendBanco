import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Badge,
  IconButton,
  ButtonGroup
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SearchIcon, ChevronDownIcon, AddIcon, EditIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { SiBitcoin } from 'react-icons/si';

import { useProductsView } from '../../shared/hooks/hooksProducts/useProductsView';
import { useAllProductsView } from '../../shared/hooks/hooksProducts/useAllProductView';
import { useDeleteProduct } from '../../shared/hooks/hooksProducts/useProductsDelete';
import { useReactivateProduct } from '../../shared/hooks/hooksProducts/useProductReactivate';

import NavBar from '../commons/NavBar';
import { AddProductModal } from './addProducts';
import { EditProductModal } from './updateProducts';
import { ConfirmationModal } from './confirmationModalProducts';
import ProductCard from './productCard';
import DivisasModal from './DivisaModal';
import AccionesModal from './StockModal'; 
import CriptoModal from './CryptoModal';

import ModalCompra from './ModalCompra'; 

const GetProducts = () => {
  const { products: activeProducts, loading: activeLoading, refetch: refetchActive } = useProductsView();
  const { products: allProducts, loading: allLoading, refetch: refetchAll } = useAllProductsView();
  const { removeProduct, loading: deleteLoading } = useDeleteProduct();
  const { reactivate, loading: reactivateLoading } = useReactivateProduct();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('available');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const loading = activeLoading || allLoading || deleteLoading || reactivateLoading;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [openModal, setOpenModal] = useState(null); // para DivisasModal u otros

  // Modal de compra
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProductAdded = () => {
    refetchActive();
    refetchAll();
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = () => {
    refetchActive();
    refetchAll();
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleReactivateClick = (productId) => {
    setSelectedProductId(productId);
    setIsReactivateModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await removeProduct(selectedProductId);
    handleProductUpdated();
    setIsDeleteModalOpen(false);
  };

  const handleConfirmReactivate = async () => {
    await reactivate(selectedProductId);
    handleProductUpdated();
    setIsReactivateModalOpen(false);
  };

  const openBuyModal = (product) => {
    setProductToBuy(product);
    setIsBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
    setProductToBuy(null);
  };

  const handlePurchaseSuccess = () => {
    refetchActive();
    refetchAll();
    closeBuyModal();
  };

  if (loading && !deleteLoading && !reactivateLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

  const baseProducts = filter === 'available' ? activeProducts : allProducts;

  const filteredProducts = baseProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'available' && product.status === true) ||
      (filter === 'unavailable' && product.status === false);

    return matchesSearch && matchesFilter;
  });

  const MotionBox = motion(Box);
  const MotionFlex = motion(Flex);

  const handleCardClick = (type) => {
    setOpenModal(type);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <>
      <NavBar />
      <Box
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={16}
        bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)"
        minH="100vh"
      >
        {/* Header */}
        <MotionFlex
          mb={12}
          direction={{ base: 'column', md: 'row' }}
          gap={6}
          align="center"
          initial={initialLoad ? { opacity: 0, y: -20 } : false}
          animate={initialLoad ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <InputGroup flex="1" maxW="600px">
            <InputLeftElement pointerEvents="none" h="56px">
              <SearchIcon color="gold.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="rgba(26, 26, 26, 0.9)"
              border="2px solid transparent"
              borderRadius="full"
              h="56px"
              pl="48px"
              color="white"
              fontSize="lg"
              backdropFilter="blur(10px)"
              boxShadow="0 8px 32px rgba(218, 165, 32, 0.1)"
              _placeholder={{ color: 'gray.400' }}
              _hover={{
                bg: "rgba(26, 26, 26, 0.95)",
                borderColor: "gold.400",
                boxShadow: "0 8px 40px rgba(218, 165, 32, 0.2)"
              }}
              _focus={{
                bg: "rgba(26, 26, 26, 1)",
                borderColor: "gold.300",
                boxShadow: "0 0 0 4px rgba(218, 165, 32, 0.1), 0 8px 40px rgba(218, 165, 32, 0.3)",
                outline: "none"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            />
          </InputGroup>

          <Flex gap={4}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                color="white"
                border="2px solid transparent"
                borderRadius="full"
                h="56px"
                px={8}
                minW="140px"
                fontSize="md"
                fontWeight="600"
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
                _hover={{
                  bg: "linear-gradient(135deg, #2d2d2d 0%, #404040 100%)",
                  borderColor: "gold.400",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(218, 165, 32, 0.2)"
                }}
                _active={{
                  transform: "translateY(0px)",
                  boxShadow: "0 8px 32px rgba(218, 165, 32, 0.3)"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                {filter === 'available' ? 'Disponibles' : filter === 'unavailable' ? 'No disponibles' : 'Todos'}
              </MenuButton>
              <MenuList
                bg="rgba(26, 26, 26, 0.95)"
                border="2px solid rgba(218, 165, 32, 0.3)"
                borderRadius="xl"
                backdropFilter="blur(20px)"
                boxShadow="0 20px 60px rgba(0, 0, 0, 0.5)"
              >
                <MenuItem
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "rgba(218, 165, 32, 0.1)", color: "gold.300" }}
                  _focus={{ bg: "rgba(218, 165, 32, 0.1)" }}
                  onClick={() => setFilter('available')}
                  transition="all 0.2s ease"
                >
                  Disponibles
                </MenuItem>
                <MenuItem
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "rgba(218, 165, 32, 0.1)", color: "gold.300" }}
                  _focus={{ bg: "rgba(218, 165, 32, 0.1)" }}
                  onClick={() => setFilter('unavailable')}
                  transition="all 0.2s ease"
                >
                  No disponibles
                </MenuItem>
                <MenuItem
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "rgba(218, 165, 32, 0.1)", color: "gold.300" }}
                  _focus={{ bg: "rgba(218, 165, 32, 0.1)" }}
                  onClick={() => setFilter('all')}
                  transition="all 0.2s ease"
                >
                  Todos
                </MenuItem>
              </MenuList>
            </Menu>

            <Button
              leftIcon={<AddIcon />}
              bg="linear-gradient(135deg, #DAA520 0%, #FFD700 100%)"
              color="black"
              border="none"
              borderRadius="full"
              h="56px"
              px={8}
              fontSize="md"
              fontWeight="700"
              boxShadow="0 8px 32px rgba(218, 165, 32, 0.4)"
              onClick={() => setIsModalOpen(true)}
              _hover={{
                bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 45px rgba(218, 165, 32, 0.6)",
              }}
              _active={{
                transform: "translateY(-1px)",
                boxShadow: "0 12px 40px rgba(218, 165, 32, 0.5)"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Agregar
            </Button>
          </Flex>
        </MotionFlex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6} mb={12}>
          <ProductCard
            label="Divisas"
            isPositive={true}
            icon={FaMoneyBillWave}
            onClick={() => handleCardClick('divisas')}
          />
          <ProductCard
            label="Acciones"
            isPositive={true}
            icon={FaChartLine}
            onClick={() => handleCardClick('acciones')}
          />
          <ProductCard
            label="Criptomonedas"
            isPositive={false}
            icon={SiBitcoin}
            onClick={() => handleCardClick('criptomonedas')}
          />
        </SimpleGrid>
        {openModal === "divisas" && (
        <DivisasModal isOpen={true} onClose={closeModal} />
      )}
      {openModal === "acciones" && (
        <AccionesModal isOpen={true} onClose={closeModal} />
      )}
      {openModal === "criptomonedas" && (
        <CriptoModal isOpen={true} onClose={closeModal} />
      )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
          {filteredProducts.map((product, index) => {
            const priceString = product?.price?.$numberDecimal || product?.price || "0";
            const price = parseFloat(priceString);

            return (
              <MotionBox
                key={product._id}
                initial={initialLoad ? { opacity: 0, y: 30 } : false}
                animate={initialLoad ? { opacity: 1, y: 0 } : false}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Box
                  bg="linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)"
                  rounded="2xl"
                  overflow="hidden"
                  position="relative"
                  cursor={product.status ? "pointer" : "not-allowed"}
                  role="group"
                  border="2px solid transparent"
                  boxShadow="0 10px 40px rgba(0, 0, 0, 0.3)"
                  _hover={{
                    borderColor: product.status ? "gold.400" : "gray.600",
                    boxShadow: product.status
                      ? "0 20px 60px rgba(218, 165, 32, 0.2), 0 0 0 1px rgba(218, 165, 32, 0.1)"
                      : "0 10px 40px rgba(0, 0, 0, 0.4)",
                  }}
                  opacity={product.status === false ? 0.6 : 1}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  onClick={() => product.status && openBuyModal(product)}
                >
                  {product.status === false && (
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      bg="linear-gradient(135deg, #DC143C 0%, #B22222 100%)"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      zIndex={3}
                      boxShadow="0 4px 16px rgba(220, 20, 60, 0.4)"
                      backdropFilter="blur(10px)"
                    >
                      No disponible
                    </Badge>
                  )}

                  <Box
                    height="320px"
                    overflow="hidden"
                    position="relative"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bg: "linear-gradient(45deg, rgba(218, 165, 32, 0.1) 0%, transparent 50%, rgba(255, 215, 0, 0.05) 100%)",
                      zIndex: 2,
                      opacity: product.status ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width="100%"
                      height="320px"
                      objectFit="cover"
                      loading="lazy"
                      transition="transform 0.4s ease"
                      _groupHover={{ transform: product.status ? 'scale(1.05)' : 'none' }}
                      draggable={false}
                      borderTopRadius="2xl"
                    />
                  </Box>

                  <Stack
                    p={6}
                    spacing={3}
                    borderBottomRadius="2xl"
                    bg="linear-gradient(to top, rgba(26,26,26,0.9), transparent)"
                  >
                    <Flex justify="space-between" align="center">
                      <Heading fontSize="xl" fontWeight="extrabold" color="gold.400">
                        {product.name}
                      </Heading>

                      <Badge
                        px={3}
                        py={1}
                        fontWeight="bold"
                        borderRadius="full"
                        bg="green.500" 
                        color="white"
                        boxShadow={`0 0 12px rgba(0, 255, 0, 0.6) `}
                        transition="all 0.3s ease"
                      >
                        ${price.toFixed(2)}
                      </Badge>
                    </Flex>

                    <Text fontWeight="medium" fontSize="md" color="whiteAlpha.800" noOfLines={3}>
                      {product.description}
                    </Text>

                    {/* Botones de editar, eliminar, reactivar (si quieres) */}
                    <ButtonGroup size="sm" spacing={2} mt={4}>
                      <IconButton
                        aria-label="Editar producto"
                        icon={<EditIcon />}
                        colorScheme="yellow"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditClick(product);
                        }}
                      />
                      {product.status ? (
                        <IconButton
                          aria-label="Eliminar producto"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteClick(product._id);
                          }}
                        />
                      ) : (
                        <IconButton
                          aria-label="Reactivar producto"
                          icon={<RepeatIcon />}
                          colorScheme="green"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleReactivateClick(product._id);
                          }}
                        />
                      )}
                    </ButtonGroup>
                  </Stack>
                </Box>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Box>

      {/* Modales */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onProductUpdated={handleProductUpdated}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar producto"
        body="¿Está seguro que desea eliminar este producto?"
      />

      <ConfirmationModal
        isOpen={isReactivateModalOpen}
        onClose={() => setIsReactivateModalOpen(false)}
        onConfirm={handleConfirmReactivate}
        title="Reactivar producto"
        body="¿Está seguro que desea reactivar este producto?"
      />

      <ModalCompra
        isOpen={isBuyModalOpen}
        onClose={closeBuyModal}
        product={productToBuy}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </>
  );
};

export default GetProducts;
