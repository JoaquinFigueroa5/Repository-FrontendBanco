import React from "react";
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
  Spinner,
  VStack,
  HStack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

import { useBitcoinBlocks } from "../../shared/hooks"; // Asegúrate que la ruta sea correcta

function BitcoinBlocksModal({ isOpen, onClose, limit = 10 }) {
  const { blocks, loading, error } = useBitcoinBlocks(limit);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Últimos {limit} bloques de Bitcoin</ModalHeader>
        <ModalBody>
          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" />
              <Text mt={2}>Cargando bloques...</Text>
            </Box>
          )}

          {error && (
            <Text color="red.400" mb={4} textAlign="center">
              Error: {error}
            </Text>
          )}

          {!loading && !error && blocks.length === 0 && (
            <Text textAlign="center">No se encontraron bloques.</Text>
          )}

          {!loading && !error && blocks.length > 0 && (
            <VStack spacing={4} align="stretch">
              {blocks.map((block) => (
                <Box
                  key={block.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor="gray.600"
                  bg="gray.700"
                  _hover={{ borderColor: "blue.300" }}
                >
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Bloque #{block.height}</Text>
                    <Link
                      href={`https://mempool.space/block/${block.id}`}
                      isExternal
                      color="yellow.400"
                      fontSize="sm"
                    >
                      Ver en Mempool
                    </Link>
                  </HStack>

                  <HStack justify="space-between" mt={2} fontSize="sm" color="gray.300">
                    <Text>
                      🕒 {new Date(block.timestamp * 1000).toLocaleString()}
                    </Text>
                    <Text>📦 {block.tx_count} transacciones</Text>
                    <Text>📐 {block.size.toLocaleString()} bytes</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Ejemplo para abrir el modal
export function BitcoinBlocksModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange" mb={4}>
        Ver últimos bloques Bitcoin
      </Button>
      <BitcoinBlocksModal isOpen={isOpen} onClose={onClose} limit={10} />
    </>
  );
}

export default BitcoinBlocksModal;

