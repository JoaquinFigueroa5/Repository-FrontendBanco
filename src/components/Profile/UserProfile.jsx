import {
  Box, Button, Input, Stack, Text, useToast, Flex, Icon, Divider,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

export default function UserProfile({ user, onUpdate, onDelete }) {
  const [form, setForm] = useState({
    ...user,
    currentPassword: "",
    newPassword: ""
  });
  const [editing, setEditing] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { newPassword, currentPassword, ...rest } = form;

    const updateData = { ...rest };
    if (newPassword.trim() !== "") {
      updateData.password = newPassword;
    }

    await onUpdate(updateData);
    setEditing(false);
    setForm(f => ({ ...f, currentPassword: "", newPassword: "" }));

    toast({
      title: "Perfil actualizado.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top"
    });
  };

  const handleDelete = () => {
    onDelete();
    onClose();
    navigate("/");
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    location.reload();
  }

  const isFormChanged = JSON.stringify(form) !== JSON.stringify(user);

  const safeValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if ("$numberDecimal" in value) {
        return value.$numberDecimal;
      }
      return JSON.stringify(value);
    }
    return value || "";
  };

  return (
    <Flex minH="100vh" bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)">
      {/* Sidebar */}
      <MotionFlex
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97],
          delay: 0.2
        }}
        w="15%"
        bg="linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
        color="white"
        direction="column"
        p={6}
        position="relative"
        borderRight="2px solid rgba(218, 165, 32, 0.2)"
        backdropFilter="blur(10px)"
      >

        <Icon
          as={ArrowBackIcon}
          boxSize={12}
          color="rgba(255, 255, 255, 0.9)"
          position="absolute"
          top="30px"
          left="25px"
          p={2}
          borderRadius="full"
          bg="rgba(218, 165, 32, 0.1)"
          backdropFilter="blur(12px)"
          border="1px solid rgba(218, 165, 32, 0.4)"
          _hover={{
            color: "gold.300",
            cursor: "pointer",
            bg: "rgba(218, 165, 32, 0.25)",
            borderColor: "gold.500",
            boxShadow: "0 8px 32px rgba(218, 165, 32, 0.4)"
          }}
          onClick={() => handleDashboard()}
        />
        {/* Decorative elements */}
        <Box
          position="absolute"
          bottom="30px"
          left="20px"
          w="calc(100% - 40px)"
          h="1px"
          bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.6) 50%, transparent 100%)"
          opacity={0.6}
        />
      </MotionFlex>

      {/* Main Content */}
      <MotionFlex
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        w="85%"
        p={16}
        direction="column"
        align="center"
        bg="transparent"
        position="relative"
      >
        {/* Background decorative elements */}
        <Box
          position="absolute"
          top="10%"
          right="10%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(218, 165, 32, 0.1) 0%, transparent 70%)"
          filter="blur(80px)"
          zIndex={0}
        />
        <Box
          position="absolute"
          bottom="20%"
          left="10%"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)"
          filter="blur(60px)"
          zIndex={0}
        />

        <MotionBox
          w="100%"
          maxW="800px"
          position="relative"
          zIndex={1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Header */}
          <Box textAlign="center" mb={12}>
            <MotionText
              fontSize={{ base: "xl", md: "5xl", lg: "6xl" }}
              fontWeight="black"
              mb={4}
              bgGradient="linear(135deg, #D4AF37 0%, #FFD700 50%, #FDB813 100%)"
              bgClip="text"
              letterSpacing="tighter"
              textShadow="0 4px 20px rgba(212, 175, 55, 0.5)"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
                delay: 0.2
              }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 6px 25px rgba(212, 175, 55, 0.7)"
              }}
            >
              Perfil de Usuario
            </MotionText>

            <MotionText
              fontSize={{ base: "md", md: "lg" }}
              color="rgba(255, 255, 255, 0.7)"
              fontWeight="medium"
              letterSpacing="wider"
              textTransform="uppercase"
              bg="rgba(0, 0, 0, 0.3)"
              display="inline-block"
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor="rgba(212, 175, 55, 0.3)"
              backdropFilter="blur(10px)"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.4
              }}
              whileHover={{
                borderColor: "rgba(212, 175, 55, 0.6)",
                color: "rgba(255, 255, 255, 0.9)"
              }}
            >
              Gestiona tu información personal con seguridad y estilo
            </MotionText>
          </Box>


          <Divider
            mb={10}
            borderColor="rgba(218, 165, 32, 0.3)"
            borderWidth="1px"
            opacity={0.8}
          />

          {/* Form Container */}
          <MotionBox
            bg="rgba(26, 26, 26, 0.9)"
            borderRadius="3xl"
            p={10}
            border="2px solid rgba(218, 165, 32, 0.2)"
            backdropFilter="blur(20px)"
            boxShadow="0 25px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(218, 165, 32, 0.1)"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Stack spacing={8}>
              {/* Name and Surname Row */}
              <Flex gap={6}>
                <Box flex="1">
                  <Text fontWeight="600" mb={3} color="gold.300" fontSize="sm" letterSpacing="wider" textTransform="uppercase">
                    Nombre
                  </Text>
                  <Input
                    name="name"
                    value={safeValue(form.name)}
                    onChange={handleChange}
                    isReadOnly={!editing}
                    placeholder="Nombre"
                    bg="rgba(13, 13, 13, 0.8)"
                    border="2px solid transparent"
                    color="white"
                    borderRadius="xl"
                    h="56px"
                    px={6}
                    fontSize="md"
                    _placeholder={{ color: "gray.500" }}
                    _readOnly={{
                      bg: "rgba(13, 13, 13, 0.5)",
                      cursor: "not-allowed",
                      opacity: 0.7
                    }}
                    _focus={{
                      borderColor: "gold.400",
                      boxShadow: "0 0 0 4px rgba(218, 165, 32, 0.1), 0 8px 25px rgba(218, 165, 32, 0.2)",
                      bg: "rgba(13, 13, 13, 0.9)"
                    }}
                    _hover={{
                      borderColor: editing ? "rgba(218, 165, 32, 0.5)" : "transparent"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  />
                </Box>

                <Box flex="1">
                  <Text fontWeight="600" mb={3} color="gold.300" fontSize="sm" letterSpacing="wider" textTransform="uppercase">
                    Apellido
                  </Text>
                  <Input
                    name="surname"
                    value={safeValue(form.surname)}
                    onChange={handleChange}
                    isReadOnly={!editing}
                    placeholder="Apellido"
                    bg="rgba(13, 13, 13, 0.8)"
                    border="2px solid transparent"
                    color="white"
                    borderRadius="xl"
                    h="56px"
                    px={6}
                    fontSize="md"
                    _placeholder={{ color: "gray.500" }}
                    _readOnly={{
                      bg: "rgba(13, 13, 13, 0.5)",
                      cursor: "not-allowed",
                      opacity: 0.7
                    }}
                    _focus={{
                      borderColor: "gold.400",
                      boxShadow: "0 0 0 4px rgba(218, 165, 32, 0.1), 0 8px 25px rgba(218, 165, 32, 0.2)",
                      bg: "rgba(13, 13, 13, 0.9)"
                    }}
                    _hover={{
                      borderColor: editing ? "rgba(218, 165, 32, 0.5)" : "transparent"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  />
                </Box>
              </Flex>

              {/* Other Fields */}
              {[
                { label: "Username", name: "username", isReadOnly: !editing },
                { label: "Email", name: "email", isReadOnly: !editing },
                { label: "Teléfono", name: "phone", isReadOnly: !editing },
                { label: "DPI", name: "dpi", isReadOnly: !editing },
                { label: "Dirección", name: "address", isReadOnly: !editing },
                { label: "Trabajo", name: "work", isReadOnly: !editing },
                { label: "Ingresos", name: "income", isReadOnly: !editing },
              ].map((field, index) => (
                <MotionBox
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Text fontWeight="600" mb={3} color="gold.300" fontSize="sm" letterSpacing="wider" textTransform="uppercase">
                    {field.label}
                  </Text>
                  <Input
                    name={field.name}
                    value={safeValue(form[field.name])}
                    onChange={handleChange}
                    isReadOnly={field.isReadOnly}
                    placeholder={field.label}
                    bg="rgba(13, 13, 13, 0.8)"
                    border="2px solid transparent"
                    color="white"
                    borderRadius="xl"
                    h="56px"
                    px={6}
                    fontSize="md"
                    _placeholder={{ color: "gray.500" }}
                    _readOnly={{
                      bg: "rgba(13, 13, 13, 0.5)",
                      cursor: "not-allowed",
                      opacity: 0.7
                    }}
                    _focus={{
                      borderColor: "gold.400",
                      boxShadow: "0 0 0 4px rgba(218, 165, 32, 0.1), 0 8px 25px rgba(218, 165, 32, 0.2)",
                      bg: "rgba(13, 13, 13, 0.9)"
                    }}
                    _hover={{
                      borderColor: editing ? "rgba(218, 165, 32, 0.5)" : "transparent"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  />
                </MotionBox>
              ))}

              {/* Password Field */}
              {editing && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Divider borderColor="rgba(218, 165, 32, 0.3)" my={6} />
                  <Text fontWeight="600" mb={3} color="gold.300" fontSize="sm" letterSpacing="wider" textTransform="uppercase">
                    Nueva Contraseña
                  </Text>
                  <Input
                    name="newPassword"
                    type="password"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Ingresa tu nueva contraseña"
                    bg="rgba(13, 13, 13, 0.8)"
                    border="2px solid transparent"
                    color="white"
                    borderRadius="xl"
                    h="56px"
                    px={6}
                    fontSize="md"
                    _placeholder={{ color: "gray.500" }}
                    _focus={{
                      borderColor: "gold.400",
                      boxShadow: "0 0 0 4px rgba(218, 165, 32, 0.1), 0 8px 25px rgba(218, 165, 32, 0.2)",
                      bg: "rgba(13, 13, 13, 0.9)"
                    }}
                    _hover={{
                      borderColor: "rgba(218, 165, 32, 0.5)"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  />
                </MotionBox>
              )}

              {/* Action Buttons */}
              <Stack direction="row" justify="center" pt={8} spacing={6}>
                {editing ? (
                  <>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        bg="linear-gradient(135deg, #32CD32 0%, #228B22 100%)"
                        color="white"
                        size="lg"
                        h="56px"
                        px={12}
                        borderRadius="full"
                        fontSize="md"
                        fontWeight="700"
                        onClick={handleUpdate}
                        isDisabled={!isFormChanged}
                        boxShadow="0 8px 25px rgba(50, 205, 50, 0.3)"
                        _hover={{
                          bg: "linear-gradient(135deg, #228B22 0%, #006400 100%)",
                          boxShadow: "0 12px 35px rgba(50, 205, 50, 0.4)",
                          transform: "translateY(-2px)"
                        }}
                        _active={{
                          transform: "translateY(0px)"
                        }}
                        _disabled={{
                          opacity: 0.4,
                          cursor: "not-allowed",
                          transform: "none"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Guardar Cambios
                      </Button>
                    </MotionBox>

                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        bg="rgba(26, 26, 26, 0.8)"
                        color="white"
                        border="2px solid rgba(218, 165, 32, 0.3)"
                        size="lg"
                        h="56px"
                        px={12}
                        borderRadius="full"
                        fontSize="md"
                        fontWeight="700"
                        onClick={() => setEditing(false)}
                        _hover={{
                          bg: "rgba(26, 26, 26, 0.9)",
                          borderColor: "gold.400",
                          boxShadow: "0 8px 25px rgba(218, 165, 32, 0.2)",
                          transform: "translateY(-2px)"
                        }}
                        _active={{
                          transform: "translateY(0px)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Cancelar
                      </Button>
                    </MotionBox>
                  </>
                ) : (
                  <>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        bg="linear-gradient(135deg, #DAA520 0%, #FFD700 100%)"
                        color="black"
                        size="lg"
                        h="56px"
                        px={12}
                        borderRadius="full"
                        fontSize="md"
                        fontWeight="700"
                        onClick={() => setEditing(true)}
                        boxShadow="0 8px 25px rgba(218, 165, 32, 0.3)"
                        _hover={{
                          bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                          boxShadow: "0 12px 35px rgba(218, 165, 32, 0.5)",
                          transform: "translateY(-2px)"
                        }}
                        _active={{
                          transform: "translateY(0px)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Editar Perfil
                      </Button>
                    </MotionBox>

                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        bg="linear-gradient(135deg, #DC143C 0%, #B22222 100%)"
                        color="white"
                        size="lg"
                        h="56px"
                        px={12}
                        borderRadius="full"
                        fontSize="md"
                        fontWeight="700"
                        onClick={onOpen}
                        boxShadow="0 8px 25px rgba(220, 20, 60, 0.3)"
                        _hover={{
                          bg: "linear-gradient(135deg, #B22222 0%, #8B0000 100%)",
                          boxShadow: "0 12px 35px rgba(220, 20, 60, 0.5)",
                          transform: "translateY(-2px)"
                        }}
                        _active={{
                          transform: "translateY(0px)"
                        }}
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Eliminar Cuenta
                      </Button>
                    </MotionBox>
                  </>
                )}
              </Stack>
            </Stack>
          </MotionBox>
        </MotionBox>
      </MotionFlex>

      {/* Enhanced Alert Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)">
          <AlertDialogContent
            bg="rgba(26, 26, 26, 0.95)"
            borderRadius="2xl"
            border="2px solid rgba(218, 165, 32, 0.3)"
            backdropFilter="blur(20px)"
            boxShadow="0 25px 80px rgba(0, 0, 0, 0.6)"
            color="white"
            mx={4}
          >
            <AlertDialogHeader
              fontSize="2xl"
              fontWeight="800"
              bgGradient="linear(135deg, gold.300 0%, yellow.400 100%)"
              bgClip="text"
              pb={4}
              color='gray.300'
            >
              Confirmar Eliminación
            </AlertDialogHeader>
            <AlertDialogBody fontSize="md" color="gray.300" lineHeight="1.6">
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es permanente y no se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter pt={6}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                bg="rgba(26, 26, 26, 0.8)"
                color="white"
                border="2px solid rgba(218, 165, 32, 0.3)"
                borderRadius="full"
                px={8}
                _hover={{
                  bg: "rgba(26, 26, 26, 0.9)",
                  borderColor: "gold.400"
                }}
              >
                Cancelar
              </Button>
              <Button
                bg="linear-gradient(135deg, #DC143C 0%, #B22222 100%)"
                color="white"
                onClick={handleDelete}
                ml={4}
                borderRadius="full"
                px={8}
                _hover={{
                  bg: "linear-gradient(135deg, #B22222 0%, #8B0000 100%)"
                }}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}