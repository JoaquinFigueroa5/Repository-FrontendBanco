import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useRef } from 'react';

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "teal"
}) => {
  const cancelRef = useRef();
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      size="sm"
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg={bgColor}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={textColor}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text color={textColor}>{message}</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button 
              colorScheme={confirmColor} 
              onClick={() => {
                onConfirm();
                onClose();
              }} 
              ml={3}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};