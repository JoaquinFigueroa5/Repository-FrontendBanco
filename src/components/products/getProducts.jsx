import React, { useState } from 'react';
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
import { SearchIcon, ChevronDownIcon, AddIcon, EditIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useProductsView } from '../../shared/hooks/hooksProducts/useProductsView';
import { useAllProductsView } from '../../shared/hooks/hooksProducts/useAllProductView';
import { useDeleteProduct } from '../../shared/hooks/hooksProducts/useProductsDelete';
import { useReactivateProduct } from '../../shared/hooks/hooksProducts/useProductReactivate';
import NavBar from '../commons/NavBar';
import { AddProductModal } from './addProducts';
import { EditProductModal } from './updateProducts';
import { ConfirmationModal } from './confirmationModalProducts';

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

  const loading = activeLoading || allLoading || deleteLoading || reactivateLoading;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
  };

  const handleConfirmReactivate = async () => {
    await reactivate(selectedProductId);
    handleProductUpdated();
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

  return (
    <>
      <NavBar />
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Flex mb={8} direction={{ base: 'column', md: 'row' }} gap={4} align="center">
          <InputGroup flex="1" maxW="600px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={useColorModeValue('white', 'gray.700')}
              borderRadius="full"
              boxShadow="sm"
            />
          </InputGroup>

          <Flex gap={4}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="full"
                boxShadow="sm"
                px={6}
                minW="120px"
              >
                {filter === 'available' ? 'Disponibles' : filter === 'unavailable' ? 'No disponibles' : 'Todos'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setFilter('available')}>Disponibles</MenuItem>
                <MenuItem onClick={() => setFilter('unavailable')}>No disponibles</MenuItem>
                <MenuItem onClick={() => setFilter('all')}>Todos</MenuItem>
              </MenuList>
            </Menu>

            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              borderRadius="full"
              px={6}
              onClick={() => setIsModalOpen(true)}
            >
              Agregar
            </Button>
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {filteredProducts.map((product) => {
            const priceString = product?.price?.$numberDecimal || product?.price || "0";
            const price = parseFloat(priceString);

            return (
              <Box
                key={product._id}
                bg={useColorModeValue('white', 'gray.700')}
                rounded="lg"
                boxShadow="md"
                overflow="hidden"
                position="relative"
                cursor={product.status ? "pointer" : "not-allowed"}
                role="group"
                transition="all 0.3s ease"
                _hover={{ boxShadow: product.status ? 'xl' : 'md', transform: product.status ? 'translateY(-5px)' : 'none' }}
                opacity={product.status === false ? 0.75 : 1}
              >
                {product.status === false && (
                  <Badge
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme="red"
                    zIndex={3}
                  >
                    No disponible
                  </Badge>
                )}

                <Box
                  height="280px"
                  overflow="hidden"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: '10px',
                    left: 0,
                    width: '100%',
                    height: '260px',
                    bgImage: `url(${product.image})`,
                    bgSize: 'cover',
                    bgPos: 'center',
                    filter: 'blur(15px)',
                    zIndex: 0,
                    transition: 'filter 0.3s ease',
                    opacity: product.status === false ? 0.5 : 1
                  }}
                  _groupHover={{
                    _after: {
                      filter: product.status ? 'blur(25px)' : 'blur(15px)',
                    },
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    height="280px"
                    width="100%"
                    transition="transform 0.3s ease"
                    _groupHover={{ transform: product.status ? 'scale(1.1)' : 'none' }}
                    position="relative"
                    zIndex={1}
                    loading="lazy"
                    opacity={product.status === false ? 0.7 : 1}
                  />
                </Box>
                <Stack spacing={3} p={6} textAlign="center" position="relative" zIndex={2}>
                  <Text
                    color={useColorModeValue('gray.600', 'gray.300')}
                    fontSize="sm"
                    fontWeight="medium"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {product.description}
                  </Text>
                  <Heading fontSize="xl" fontWeight="semibold" noOfLines={1}>
                    {product.name}
                  </Heading>
                  <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('teal.600', 'teal.300')}>
                    ${price.toFixed(2)}
                  </Text>

                  <ButtonGroup spacing={2} justifyContent="center">
                    <IconButton
                      aria-label="Editar producto"
                      icon={<EditIcon />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    />
                    {product.status ? (
                      <IconButton
                        aria-label="Desactivar producto"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteClick(product._id)}
                        isLoading={deleteLoading}
                      />
                    ) : (
                      <IconButton
                        aria-label="Reactivar producto"
                        icon={<RepeatIcon />}
                        colorScheme="green"
                        size="sm"
                        onClick={() => handleReactivateClick(product._id)}
                        isLoading={reactivateLoading}
                      />
                    )}
                  </ButtonGroup>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onProductUpdated={handleProductUpdated}
      />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Desactivar producto"
        message="¿Estás seguro de que deseas desactivar este producto?"
        confirmText="Desactivar"
        cancelText="Cancelar"
        confirmColor="red"
      />

      <ConfirmationModal
        isOpen={isReactivateModalOpen}
        onClose={() => setIsReactivateModalOpen(false)}
        onConfirm={handleConfirmReactivate}
        title="Reactivar producto"
        message="¿Estás seguro de que deseas reactivar este producto?"
        confirmText="Reactivar"
        cancelText="Cancelar"
        confirmColor="green"
      />
    </>
  );
};

export default GetProducts;