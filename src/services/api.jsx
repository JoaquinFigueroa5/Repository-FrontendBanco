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
        const msg = e.response?.data?.msg || e.response?.data?.errors?.[0].msg || 'Uknow error'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getTransaction = async (data) => {
    try {
        const res = await apiClient.get('/transactions/', data);
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error general'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getTransactionAdmin = async (limit = 10, skip = 0) => {
    try {
        const res = await apiClient.get('/transactions/', data);
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error general'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getTransactionUser = async (data) => {
    try {
        const res = await apiClient.get('/transactions/user', data);
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error general'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getUserAccount = async () => {
    try {
        const res = await apiClient.get(`/accounts/my-account`)
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error'
        return {
            error: true,
            msg,
            e
        }
    }
};

export const createTransaction = async (data) => {
    try {
        // console.log(data); 
        const res = await apiClient.post('/transactions', data);
        return {
            success: true,
            status: res.status,
            data: res.data,
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error al crear la transacción';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const createDeposit = async (data) => {
    try {
        return await apiClient.post('/deposit', data)
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error creating deposit';
        return {
            error: true,
            msg,
            e: error
        }
    }
};

export const getMyDeposits = async (id) => {
    try {
        console.log(id);
        return await apiClient.get(`/deposit/account/${id}`)
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || 'Error al obtener los depósitos',
            e: error
        }
    }
};

export const getDeposits = async () => {
    try {
        return await apiClient.get('/deposit')
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || 'Error al obtener los depositos',
            e: error
        }
    }
}

export const revertDeposit = async (depositId) => {
    try {
        return await apiClient.post(`/deposit/${depositId}`)
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error al revertir el depósito';
        return {
            error: true,
            msg,
            e: error
        }
    }
};

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

export const getProfile = async () => {
    try {
        const response = await apiClient.get('/user/profile');
        return response.data.user;
    } catch (e) {
        console.error('Error en getProfile:', e);
        return { error: true, e };
    }
};

export const updateUser = async (id, updatedData) => {
    try {
        const response = await apiClient.put(`/user/${id}`, updatedData);
        return response.data.user;
    } catch (e) {
        console.error('Error en updateUser:', e);
        return { error: true, e };
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete(`/user/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error en deleteUser:', e);
        return { error: true, e };
    }
};

export const toggleFavorite = async (id) => {
    try {
        return await apiClient.put(`/user/favorite/${id}`)
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error al favoritear la cuenta';
        return {
            error: true,
            msg,
            e: error
        }
    }
}

export const getAccountFavorite = async() => {
    try {
        return await apiClient.get('/user/getFavorites')
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error al mostrar las cuentas';
        return {
            error: true,
            msg,
            e: error
        }
    }
}