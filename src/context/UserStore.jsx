import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set, get) => ({
    user: null,
    showTokenModal: false,

    fetchUser: () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        if (!token) {
            set({ user: null });
            return;
        }

        axios.get('http://127.0.0.1:3000/BancaOnline/v1/user/profile', {
            headers: { 'x-token': token }
        }).then((res) => {
            set({ user: res.data.user });
        }).catch(() => {
            set({ user: null });
        });
    },

    handleTokenExpired: () => {
        localStorage.removeItem('user');
        set({ user: null, showTokenModal: true });
        window.dispatchEvent(new Event('token-expired'));
    },

    closeTokenModal: () => {
        set({ showTokenModal: false });
    }
}));

export default useUserStore;
