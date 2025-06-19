import { useState } from "react";
import toast from "react-hot-toast";
import { getAccountFavorite as getAccountFavoriteRequest } from "../../services";

export const useUsers = () => {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    const getAccountFavorite = async () => {
        setIsLoading(true);

        const response = await getAccountFavoriteRequest();

        if (response.error) {
            toast.error(response.e?.reponse?.data || 'Error al traer las cuentas fav.')
            setIsLoading(false);
            return;
        }        

        setAccounts(response.data.favorites)
    };

    return {
        accounts,
        getAccountFavorite,
        isLoading
    }
}