import { useState, useEffect } from 'react'
import { getUserAccount, getAccounts as getAccountsRequest, addFavorite as addFavoriteRequest, removeFavorite as removeFavoriteRequest } from '../../services'
import toast from 'react-hot-toast'

export const useAccount = () => {
  const [account, setAccount] = useState(null)
  const [accountsGen, setAccountsGen] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAccount = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getUserAccount()
      if (response.success) {
        setAccount(response.data.account)
      } else {
        setAccount(null)
        setError(response.msg || 'Error desconocido')
      }
    } catch (err) {
      setAccount(null)
      setError('Error al obtener la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const getAccounts = async () => {
    setLoading(true);

    const response = await getAccountsRequest();

    if (response.error) {
      toast.error(response.e?.response?.data || 'Error al traer las cuentas');
      setLoading(false);
      return
    }

    setAccountsGen(response.data.accounts)

  }

  const addFavorite = async (id) => {
    const response = await addFavoriteRequest(id);

    if(response.error){
      toast.error(result.e?.response?.data?.msg || 'No se pudo togglear');
      return
    }    

    return accountsGen

  }

  const removeFavorite = async (id) => {
    const response = await removeFavoriteRequest(id);

    if(response.error){
      toast.error(result.e?.response?.data?.msg || 'No se pudo togglear');
      return
    }    

    return accountsGen

  }
  
  useEffect(() => {
    fetchAccount()
  }, [])

  return {
    account,
    loading,
    error,
    accountsGen,
    getAccounts,
    fetchAccount,
    addFavorite,
    removeFavorite
  }
}