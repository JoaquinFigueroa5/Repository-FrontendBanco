// components/TransferModal.jsx
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, VStack, FormControl, FormLabel, Input, Textarea, Button,
} from "@chakra-ui/react";

const TransferModal = ({
  isOpen,
  onClose,
  transferTo,
  setTransferTo,
  transferAmount,
  setTransferAmount,
  transferConcept,
  setTransferConcept,
  handleTransfer
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl">
        <ModalHeader>Nueva Transferencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Destinatario</FormLabel>
              <Input
                placeholder="Nombre o número de cuenta"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                borderRadius="lg"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Monto</FormLabel>
              <Input
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                borderRadius="lg"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Concepto</FormLabel>
              <Textarea
                placeholder="Descripción de la transferencia"
                value={transferConcept}
                onChange={(e) => setTransferConcept(e.target.value)}
                borderRadius="lg"
              />
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              borderRadius="lg"
              onClick={handleTransfer}
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
