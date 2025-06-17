import { useState, useEffect } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, VStack, FormControl, FormLabel, Input, Textarea, Button, Select,
  Box, Text
} from "@chakra-ui/react";
import { useAccount } from "../../shared/hooks/useAccount";

const TransferModal = ({
  isOpen,
  onClose,
  transferTo,
  setTransferTo,
  transferAmount,
  setTransferAmount,
  transferConcept,
  setTransferConcept,
  handleTransfer,
  fromAccountId,
  setFromAccountId,
}) => {
  const { account, loading, error, fetchAccount } = useAccount();

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay
        backdropFilter="blur(10px)"
        bg="rgba(0, 0, 0, 0.8)"
      />
      <ModalContent
        bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)"
        border="1px solid"
        borderColor="rgba(255, 215, 0, 0.3)"
        borderRadius="2xl"
        boxShadow="0 20px 60px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)"
        backdropFilter="blur(10px)"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          bgGradient: 'linear(to-r, transparent, #FFD700, transparent)',
          opacity: 0.6,
        }}
      >
        <ModalHeader
          bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
          bgClip="text"
          textShadow="0 0 30px rgba(255, 215, 0, 0.3)"
          fontSize="xl"
          fontWeight="bold"
          color="transparent"
        >
          Nueva Transferencia
        </ModalHeader>

        <ModalCloseButton
          color="#FFD700"
          _hover={{
            bg: "rgba(255, 215, 0, 0.1)",
            color: "#FFA500",
          }}
        />

        <ModalBody pb={6}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel
                color="#FFD700"
                fontSize="sm"
                fontWeight="bold"
                textShadow="0 0 10px rgba(255, 215, 0, 0.3)"
              >
                Selecciona tu Cuenta
              </FormLabel>
              <Select
                placeholder="Selecciona tu cuenta"
                value={fromAccountId}
                onChange={(e) => setFromAccountId(e.target.value)}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.4)"
                border="1px solid"
                borderColor="rgba(255, 215, 0, 0.2)"
                color="white"
                _hover={{
                  borderColor: "rgba(255, 215, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "#FFD700",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  bg: "rgba(0, 0, 0, 0.6)",
                }}
                _placeholder={{
                  color: "gray.400"
                }}
              >
                {account && (
                  <option
                    key={account._id}
                    value={account._id}
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: 'white'
                    }}
                  >
                    {account.accountNumber} - Q{parseFloat(account?.balance?.$numberDecimal).toFixed(2)}
                  </option>
                )}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                color="#FFD700"
                fontSize="sm"
                fontWeight="bold"
                textShadow="0 0 10px rgba(255, 215, 0, 0.3)"
              >
                Destinatario
              </FormLabel>
              <Input
                placeholder="Nombre o número de cuenta"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.4)"
                border="1px solid"
                borderColor="rgba(255, 215, 0, 0.2)"
                color="white"
                _hover={{
                  borderColor: "rgba(255, 215, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "#FFD700",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  bg: "rgba(0, 0, 0, 0.6)",
                }}
                _placeholder={{
                  color: "gray.400"
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#FFD700"
                fontSize="sm"
                fontWeight="bold"
                textShadow="0 0 10px rgba(255, 215, 0, 0.3)"
              >
                Monto
              </FormLabel>
              <Input
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.4)"
                border="1px solid"
                borderColor="rgba(255, 215, 0, 0.2)"
                color="white"
                _hover={{
                  borderColor: "rgba(255, 215, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "#FFD700",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  bg: "rgba(0, 0, 0, 0.6)",
                }}
                _placeholder={{
                  color: "gray.400"
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                color="#FFD700"
                fontSize="sm"
                fontWeight="bold"
                textShadow="0 0 10px rgba(255, 215, 0, 0.3)"
              >
                Concepto
              </FormLabel>
              <Textarea
                placeholder="Descripción de la transferencia"
                value={transferConcept}
                onChange={(e) => setTransferConcept(e.target.value)}
                borderRadius="lg"
                bg="rgba(0, 0, 0, 0.4)"
                border="1px solid"
                borderColor="rgba(255, 215, 0, 0.2)"
                color="white"
                _hover={{
                  borderColor: "rgba(255, 215, 0, 0.4)",
                }}
                _focus={{
                  borderColor: "#FFD700",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                  bg: "rgba(0, 0, 0, 0.6)",
                }}
                _placeholder={{
                  color: "gray.400"
                }}
                resize="none"
                rows={3}
              />
            </FormControl>

            <Button
              size="lg"
              width="full"
              borderRadius="lg"
              bg="linear-gradient(135deg, #FFD700, #FFA500)"
              color="black"
              fontWeight="bold"
              border="1px solid rgba(255, 215, 0, 0.3)"
              boxShadow="0 10px 30px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              _hover={{
                bg: "linear-gradient(135deg, #FFA500, #FFD700)",
                boxShadow: "0 15px 40px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                transform: "translateY(-2px)",
              }}
              _active={{
                transform: "translateY(0px)",
                boxShadow: "0 5px 20px rgba(255, 215, 0, 0.3)",
              }}
              transition="all 0.3s ease"
              onClick={handleTransfer}
              isLoading={loading}
              loadingText="Procesando..."
            >
              Transferir
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransferModal;