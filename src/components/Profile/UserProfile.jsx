import {
  Box, Button, Input, Stack, Text, useToast, Flex, Icon, Divider,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

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

    toast({ title: "Perfil actualizado.", status: "success" });
  };

  const handleDelete = () => {
    onDelete();
    onClose();
    navigate("/");
  };

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
    <Flex minH="100vh">
      <Flex
        as={motion.div}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        w="15%"
        bg="gray.800"
        color="white"
        direction="column"
        p={4}
        position="relative"
      >
        <Link to="/dashboard">
          <Icon
            as={ArrowBackIcon}
            boxSize={10}
            color="white"
            position="absolute"
            top="20px"
            left="20px"
            _hover={{ color: "blue.300", cursor: "pointer", transform: "scale(1.1)" }}
            transition="all 0.2s"
          />
        </Link>
      </Flex>

      <Divider orientation="vertical" borderColor="gray.400" />

      <Flex
        as={motion.div}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        w="85%"
        p={14}
        direction="column"
        align="center"
        bg="gray.50"
      >
        <Box w="100%" maxW="700px">
          <Text fontSize="3xl" fontWeight="semibold" mb={6} textAlign="center" color="gray.800">
            Información general
          </Text>

          <Divider mb={8} borderColor="gray.300" />

          <Stack spacing={6}>
            <Flex gap={6}>
              <Box flex="1">
                <Text fontWeight="medium" mb={1} color="gray.700">Nombre:</Text>
                <Input
                  name="name"
                  value={safeValue(form.name)}
                  onChange={handleChange}
                  isReadOnly={!editing}
                  placeholder="Nombre"
                  variant="filled"
                  _readOnly={{ bg: "gray.100", cursor: "not-allowed" }}
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299E1" }}
                  borderRadius="lg"
                  py={4}
                  px={5}
                  fontSize="md"
                />
              </Box>

              <Box flex="1">
                <Text fontWeight="medium" mb={1} color="gray.700">Apellido:</Text>
                <Input
                  name="surname"
                  value={safeValue(form.surname)}
                  onChange={handleChange}
                  isReadOnly={!editing}
                  placeholder="Apellido"
                  variant="filled"
                  _readOnly={{ bg: "gray.100", cursor: "not-allowed" }}
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299E1" }}
                  borderRadius="lg"
                  py={4}
                  px={5}
                  fontSize="md"
                />
              </Box>
            </Flex>

            {[
              { label: "Username", name: "username", isReadOnly: !editing },
              { label: "Email", name: "email", isReadOnly: !editing },
              { label: "Teléfono", name: "phone", isReadOnly: !editing },
              { label: "DPI", name: "dpi", isReadOnly: !editing },
              { label: "Dirección", name: "address", isReadOnly: !editing },
              { label: "Trabajo", name: "work", isReadOnly: !editing },
              { label: "Ingresos", name: "income", isReadOnly: !editing },
            ].map((field) => (
              <Box key={field.name}>
                <Text fontWeight="medium" mb={1} color="gray.700">{field.label}:</Text>
                <Input
                  name={field.name}
                  value={safeValue(form[field.name])}
                  onChange={handleChange}
                  isReadOnly={field.isReadOnly}
                  placeholder={field.label}
                  variant="filled"
                  _readOnly={{ bg: "gray.100", cursor: "not-allowed" }}
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299E1" }}
                  borderRadius="lg"
                  py={4}
                  px={5}
                  fontSize="md"
                />
              </Box>
            ))}

            {editing && (
              <Box>
                <Divider borderColor="gray.300" my={4} />
                <Text fontWeight="medium" mb={1} color="gray.700">Nueva contraseña:</Text>
                <Input
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Ingresa tu nueva contraseña"
                  variant="filled"
                  borderRadius="lg"
                  py={4}
                  px={5}
                  fontSize="md"
                  _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #4299E1" }}
                />
              </Box>
            )}

            {editing ? (
              <Stack direction="row" justify="center">
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={handleUpdate}
                  isDisabled={!isFormChanged}
                >
                  Guardar
                </Button>
                <Button size="lg" onClick={() => setEditing(false)}>
                  Cancelar
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" justify="center">
                <Button
                  size="lg"
                  onClick={() => setEditing(true)}
                  colorScheme="gray"
                >
                  Editar
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="red"
                  onClick={onOpen}
                  px={16}
                  borderWidth="2px"
                  _hover={{
                    bg: "red.50",
                    borderColor: "red.500",
                    transform: "scale(1.03)",
                  }}
                  transition="all 0.2s"
                >
                  Eliminar cuenta
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="lg">
            <AlertDialogHeader fontSize="2xl" fontWeight="bold">
              Confirmar eliminación
            </AlertDialogHeader>
            <AlertDialogBody fontSize="md" color="gray.700">
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}