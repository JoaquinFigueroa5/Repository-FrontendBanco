import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services"
import toast from "react-hot-toast";
import useUserStore from "../../context/UserStore";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await loginRequest({ email, password });

            if (response.error) {
                toast.error(response.error?.response?.data || 'Ocurrió un error al iniciar sesión, usuario no encontrado', {
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

            toast.success('Sesión iniciada correctamente', {
                style: {
                    background: 'green',
                    color: 'white'
                }
            });

            navigate('/dashboard');
            location.reload();

        } catch (error) {
            toast.error('Error al iniciar sesión', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        login,
        isLoading
    };
};
