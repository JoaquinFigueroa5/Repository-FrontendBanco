import { useState } from "react";
import toast from "react-hot-toast";
import { updateProduct } from "../../../services";

export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editProduct = async (id, data) => {
        setLoading(true);
        try {
            const response = await updateProduct(id, data);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast.success("Producto actualizado exitosamente.");
        } catch (err) {
            setError(err);
            toast.error(`Error al actualizar producto: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { editProduct, loading, error };
};
