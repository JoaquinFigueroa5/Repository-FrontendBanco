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
  useColorModeValue,
  Switch,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCreateProduct } from '../../shared/hooks/hooksProducts/useProductsCreate';

export const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const { addProduct, loading } = useCreateProduct();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    asset: true,
    status: true
  });

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

      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      await addProduct(productData);
      toast({
        title: 'Éxito',
        description: 'Producto creado correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onProductAdded();
      onClose();
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        asset: true,
        status: true
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Error al crear el producto',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader color={textColor}>Agregar Nuevo Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {formData.image && (
              <Box textAlign="center">
                <Image 
                  src={formData.image} 
                  alt="Preview" 
                  maxH="200px" 
                  mx="auto"
                  borderRadius="md"
                />
              </Box>
            )}
            
            <FormControl>
              <FormLabel color={textColor}>URL de la Imagen</FormLabel>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Ingresa la URL de la imagen del producto
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Nombre</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del producto"
                isRequired
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Descripción</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del producto"
                isRequired
              />
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Precio</FormLabel>
              <NumberInput
                value={formData.price}
                onChange={handlePriceChange}
                precision={2}
                min={0}
                isRequired
              >
                <NumberInputField placeholder="0.00" />
              </NumberInput>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="asset" mb="0" color={textColor}>
                ¿Es un activo?
              </FormLabel>
              <Switch
                id="asset"
                isChecked={formData.asset}
                onChange={() => handleToggle('asset')}
                colorScheme="teal"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="status" mb="0" color={textColor}>
                ¿Disponible?
              </FormLabel>
              <Switch
                id="status"
                isChecked={formData.status}
                onChange={() => handleToggle('status')}
                colorScheme="teal"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            colorScheme="teal" 
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Guardando..."
          >
            Guardar Producto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};