import { useState } from "react";
import toast from "react-hot-toast";
import { createProduct } from "../../../services";

export const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addProduct = async (data) => {
        setLoading(true);
        try {
            const response = await createProduct(data);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast.success("Producto creado exitosamente.");
        } catch (err) {
            setError(err);
            toast.error(`Error al crear producto: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addProduct, loading, error };
};
