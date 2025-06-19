import { useState, useEffect } from 'react';
import { getUser, updateUser, deleteUser } from '../../services';

const useUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUser();
            setUsers(response.data.users);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error loading users');
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, data) => {
        try {
            const response = await updateUser(id, data);
            setUsers(response);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error updating user');
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(res => res._id !== id));
        } catch (err) {
            setError(err.response?.data?.msg || 'Error deleting user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, editUser, removeUser, fetchUsers };
};

export default useUser;