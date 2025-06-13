// src/shared/hooks/hooksProducts/useReactivateProduct.js
import { useState } from "react";
import toast from "react-hot-toast";
import { reactivateProduct } from "../../../services";

export const useReactivateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const reactivate = async (id) => {
        setLoading(true);
        try {
            const response = await reactivateProduct(id);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast.success("Producto reactivado exitosamente.");
        } catch (err) {
            setError(err);
            toast.error(`Error al reactivar producto: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { reactivate, loading, error };
};