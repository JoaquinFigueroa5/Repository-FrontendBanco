import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllProducts } from "../../../services";

export const useAllProductsView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            
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
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(`Error al obtener todos los productos: ${error.message}`);
        }
    }, [error]);

    return { products, loading, error, refetch: fetchAllProducts };
};