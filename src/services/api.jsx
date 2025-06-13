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
        const res = await apiClient.post('/auth/register', data);

        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Uknow error'
        return {
            error: true,
            msg,
            e
        }
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