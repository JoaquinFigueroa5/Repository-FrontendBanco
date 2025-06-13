import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/BancaOnline/v1',
    timeout: 5000
});

apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data);
    } catch (e) {
        const msg = e.response?.data?.msg || 'Uknow error'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getProducts = async () => {
    try {
        const { data } = await apiClient.get('/product/');
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al obtener productos';
        return { error: true, msg, e };
    }
}

export const getAllProducts = async () => {
    try {
        const { data } = await apiClient.get('/product/allProducts');
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al obtener productos';
        return { error: true, msg, e };
    }
}

export const createProduct = async (productData) => {
    try {
        const { data } = await apiClient.post('/product/', productData);
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al crear producto';
        return { error: true, msg, e };
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const { data } = await apiClient.put(`/product/${id}`, productData);
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al actualizar producto';
        return { error: true, msg, e };
    }
}

export const reactivateProduct = async (id, productData) => {
    try {
        const { data } = await apiClient.put(`/product/reactivateProduct/${id}`, productData);
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al reactivar el producto';
        return { error: true, msg, e };
    }
}

export const deleteProduct = async (id) => {
    try {
        const { data } = await apiClient.delete(`/product/${id}`);
        return data;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al eliminar producto';
        return { error: true, msg, e };
    }
}