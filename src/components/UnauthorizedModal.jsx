import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Icon,
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const UnauthorizedModal = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Modal isOpen={true} isCentered onClose={handleRedirect}>
      <ModalOverlay
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="20px"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 215, 0, 0.1)"
        maxW="400px"
        mx={4}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
        }}
      >
        <ModalHeader
          textAlign="center"
          pt={8}
          pb={2}
          color="white"
          fontSize="xl"
          fontWeight="bold"
        >
          <VStack spacing={4}>
            <MotionBox
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Box
                bg="linear-gradient(135deg, #FFD700, #FFA500)"
                borderRadius="full"
                p={4}
                boxShadow="0 10px 30px rgba(255, 215, 0, 0.3)"
              >
                <Icon as={FiLock} boxSize={8} color="black" />
              </Box>
            </MotionBox>
            <Text
              bgGradient="linear(to-r, #FFD700, #FFA500)"
              bgClip="text"
              fontSize="2xl"
              fontWeight="bold"
            >
              Acceso Denegado
            </Text>
          </VStack>
        </ModalHeader>

        <ModalBody textAlign="center" py={6}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Text
              color="whiteAlpha.800"
              fontSize="lg"
              lineHeight="1.6"
              mb={4}
            >
              No tienes los permisos necesarios para acceder a esta sección.
            </Text>
            <Text
              color="whiteAlpha.600"
              fontSize="sm"
            >
              Por favor, inicia sesión con las credenciales adecuadas.
            </Text>
          </MotionBox>
        </ModalBody>

        <ModalFooter justifyContent="center" pb={8}>
          <MotionButton
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 215, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={handleRedirect}
            bg="linear-gradient(135deg, #FFD700, #FFA500)"
            color="black"
            size="lg"
            borderRadius="full"
            px={8}
            py={6}
            fontSize="md"
            fontWeight="bold"
            leftIcon={<Icon as={FiArrowLeft} />}
            _hover={{
              bg: "linear-gradient(135deg, #FFA500, #FFD700)",
            }}
            _active={{
              bg: "linear-gradient(135deg, #FF8C00, #FFD700)",
            }}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.5s ease',
            }}
          >
            Volver al Login
          </MotionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnauthorizedModal;