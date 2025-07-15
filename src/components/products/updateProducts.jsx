import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
  Stack,
  Image,
  Box,
  Switch,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Flex
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiEdit3, FiDollarSign, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { useUpdateProduct } from '../../shared/hooks/hooksProducts/useProductsUpdate';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const EditProductModal = ({ isOpen, onClose, product, onProductUpdated }) => {
  const { editProduct, loading } = useUpdateProduct();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    asset: true,
    status: true
  });

  useEffect(() => {
    if (product) {
      const priceValue = product?.price?.$numberDecimal || product?.price || "0";
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: parseFloat(priceValue) || '',
        image: product.image || '',
        asset: product.asset !== undefined ? product.asset : true,
        status: product.status !== undefined ? product.status : true
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePriceChange = (value) => {
    setFormData(prev => ({ ...prev, price: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.description || !formData.price) {
        toast({
          title: 'Error',
          description: 'Nombre, descripción y precio son requeridos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      await editProduct(product._id, formData);
      toast({
        title: 'Éxito',
        description: 'Producto actualizado correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onProductUpdated();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Error al actualizar el producto',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    focus: { scale: 1.02, boxShadow: "0 0 0 3px rgba(255, 215, 0, 0.3)" }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
      />
      <MotionBox
        as={ModalContent}
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
        border="1px solid"
        borderColor="gold"
        borderRadius="xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 215, 0, 0.1)"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <ModalHeader
          color="gold"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          py={6}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
        >
          <HStack spacing={3} justify="center">
            <Icon as={FiEdit3} boxSize={6} />
            <Text>Editar Producto</Text>
          </HStack>
        </ModalHeader>

        <ModalCloseButton
          color="gold"
          _hover={{ bg: "whiteAlpha.100" }}
          size="lg"
        />

        <ModalBody px={8} py={6}>
          <VStack spacing={6}>
            {formData.image && (
              <MotionBox
                textAlign="center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  p={4}
                  bg="whiteAlpha.50"
                  borderRadius="xl"
                  border="2px dashed"
                  borderColor="gold"
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: "linear-gradient(45deg, transparent 49%, gold 50%, transparent 51%)",
                    opacity: 0.1,
                    borderRadius: "xl"
                  }}
                >
                  <Image
                    src={formData.image}
                    alt="Preview"
                    maxH="200px"
                    mx="auto"
                    borderRadius="lg"
                    boxShadow="0 10px 25px rgba(0, 0, 0, 0.5)"
                  />
                </Box>
              </MotionBox>
            )}

            <FormControl>
              <FormLabel color="gold" fontWeight="semibold" fontSize="md">
                <HStack>
                  <Icon as={FiImage} />
                  <Text>URL de la Imagen</Text>
                </HStack>
              </FormLabel>
              <MotionBox variants={inputVariants} whileHover="hover" whileFocus="focus">
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{
                    borderColor: "gold",
                    bg: "whiteAlpha.150"
                  }}
                  _focus={{
                    borderColor: "gold",
                    boxShadow: "0 0 0 1px gold",
                    bg: "whiteAlpha.150"
                  }}
                  _placeholder={{ color: "whiteAlpha.600" }}
                  borderRadius="lg"
                  py={6}
                />
              </MotionBox>
              <Text fontSize="sm" color="whiteAlpha.700" mt={2}>
                Ingresa la URL de la imagen del producto
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel color="gold" fontWeight="semibold" fontSize="md">
                Nombre *
              </FormLabel>
              <MotionBox variants={inputVariants} whileHover="hover" whileFocus="focus">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{
                    borderColor: "gold",
                    bg: "whiteAlpha.150"
                  }}
                  _focus={{
                    borderColor: "gold",
                    boxShadow: "0 0 0 1px gold",
                    bg: "whiteAlpha.150"
                  }}
                  _placeholder={{ color: "whiteAlpha.600" }}
                  borderRadius="lg"
                  py={6}
                  isRequired
                />
              </MotionBox>
            </FormControl>

            <FormControl>
              <FormLabel color="gold" fontWeight="semibold" fontSize="md">
                Descripción *
              </FormLabel>
              <MotionBox variants={inputVariants} whileHover="hover" whileFocus="focus">
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción del producto"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _hover={{
                    borderColor: "gold",
                    bg: "whiteAlpha.150"
                  }}
                  _focus={{
                    borderColor: "gold",
                    boxShadow: "0 0 0 1px gold",
                    bg: "whiteAlpha.150"
                  }}
                  _placeholder={{ color: "whiteAlpha.600" }}
                  borderRadius="lg"
                  minH="100px"
                  resize="vertical"
                  isRequired
                />
              </MotionBox>
            </FormControl>

            <FormControl>
              <FormLabel color="gold" fontWeight="semibold" fontSize="md">
                <HStack>
                  <Icon as={FiDollarSign} />
                  <Text>Precio *</Text>
                </HStack>
              </FormLabel>
              <MotionBox variants={inputVariants} whileHover="hover" whileFocus="focus">
                <NumberInput
                  value={formData.price}
                  onChange={handlePriceChange}
                  precision={2}
                  min={0}
                  isRequired
                >
                  <NumberInputField
                    placeholder="0.00"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{
                      borderColor: "gold",
                      bg: "whiteAlpha.150"
                    }}
                    _focus={{
                      borderColor: "gold",
                      boxShadow: "0 0 0 1px gold",
                      bg: "whiteAlpha.150"
                    }}
                    _placeholder={{ color: "whiteAlpha.600" }}
                    borderRadius="lg"
                    py={6}
                  />
                </NumberInput>
              </MotionBox>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="asset" mb="0" color='yellow.400'>
                ¿Es una accion?
              </FormLabel>
              <Switch
                id="asset"
                isChecked={formData.asset}
                onChange={() => handleToggle('asset')}
                colorScheme="teal"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="status" mb="0" color='yellow.400'>
                ¿Disponible?
              </FormLabel>
              <Switch
                id="status"
                isChecked={formData.status}
                onChange={() => handleToggle('status')}
                colorScheme="teal"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.200" px={8} py={6}>
          <HStack spacing={4} w="full" justify="flex-end">
            <MotionButton
              variant="ghost"
              onClick={onClose}
              color="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
              px={8}
              py={6}
              borderRadius="lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancelar
            </MotionButton>
            <MotionButton
              bg="linear-gradient(135deg, #DAA520 0%, #FFD700 100%)"
              color="black"
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Guardando..."
              _hover={{
                bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(255, 215, 0, 0.4)"
              }}
              _active={{ transform: "translateY(0)" }}
              fontWeight="bold"
              px={8}
              py={6}
              borderRadius="lg"
              boxShadow="0 4px 15px rgba(255, 215, 0, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guardar Cambios
            </MotionButton>
          </HStack>
        </ModalFooter>
      </MotionBox>
    </Modal>
  );
};