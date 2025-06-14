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

export const getTransaction = async (data) => {
    try{
        const res = await apiClient.get('/transactions/', data);
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    }catch(e){
        const msg = e.response?.data?.msg || 'Error general'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getTransactionUser = async ( data ) => {
    try{
        const res = await apiClient.get('/transactions/user', data);
        return {
            success: true,
            status: res.status,
            data: res.data
        };
    }catch(e){
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
        return{
            error: true,
            msg,
            e
        }
    }
}


export const createTransaction = async (data) => {
  try {
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
}

export const getMyDeposits = async () => {
    try {
        return await apiClient.get('/deposit/myDeposits')
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || 'Error al obtener los depósitos',
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
}