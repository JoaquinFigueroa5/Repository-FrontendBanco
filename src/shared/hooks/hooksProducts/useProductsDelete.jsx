import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProduct } from "../../../services";

export const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeProduct = async (id) => {
        setLoading(true);
        try {
            const response = await deleteProduct(id);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast.success("Producto desactivado correctamente.");
        } catch (err) {
            setError(err);
            toast.error(`Error al desactivar el producto: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { removeProduct, loading, error };
};
