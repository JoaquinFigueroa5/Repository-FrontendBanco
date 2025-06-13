// src/context/UserProvider.jsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from './UserStore';

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        user,
        fetchUser,
        handleTokenExpired,
        showTokenModal,
        closeTokenModal
    } = useUserStore();

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const token = storedUser?.token;
            if (!token) return;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const exp = payload.exp * 1000;
                if (Date.now() > exp) {
                    handleTokenExpired();
                }
            } catch (e) {
                console.error("Token inválido:", e);
                handleTokenExpired();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [handleTokenExpired]);

    useEffect(() => {
        window.addEventListener('token-expired', onOpen);
        return () => window.removeEventListener('token-expired', onOpen);
    }, [onOpen]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleModalClose = () => {
        closeTokenModal();
        onClose();
        navigate('/');
    };

    return (
        <>
            {children}

            <Modal isOpen={isOpen && showTokenModal} onClose={handleModalClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sesión Expirada</ModalHeader>
                    <ModalBody>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleModalClose}>
                            Ir al Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserProvider;
