import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getProducts } from "../../../services";

export const useProductsView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();

            if (response.error) {
                throw new Error(response.msg);
            }

            setProducts(response.products);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(`Error al obtener productos: ${error.message}`);
        }
    }, [error]);

    return { products, loading, error, refetch: fetchProducts };
};
