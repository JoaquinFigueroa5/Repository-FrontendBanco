import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";
import useUserStore from "../../context/UserStore";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const register = async ({
        email,
        name,
        password,
        phone,
        surname,
        username,
        dpi,
        address,
        work,
        income
    }) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                email,
                name,
                password,
                phone,
                surname,
                username,
                dpi,
                address,
                work,
                income
            });

            if (response.error) {
                toast.error(response.error?.response?.data || 'Ocurrió un error durante el registro', {
                    style: {
                        background: 'red',
                        color: 'white'
                    }
                });
                setIsLoading(false);
                return;
            }

            const { userDetails } = response.data;

            localStorage.setItem('user', JSON.stringify(userDetails));
            setUser(userDetails);

            toast.success('Registro exitoso', {
                style: {
                    background: 'green',
                    color: 'white'
                }
            });

            navigate('/dashboard');

        } catch (error) {
            console.log('Error en el registro:', error.response?.data || error.message);
            toast.error('Error al registrar usuario', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        isLoading
    };
};
