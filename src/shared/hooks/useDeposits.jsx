import { useState } from 'react'
import toast from 'react-hot-toast'
import { 
  createDeposit as createDepositRequest, 
  getMyDeposits as getMyDepositsRequest,
  revertDeposit as revertDepositRequest
} from '../../services'

export const useDeposits = () => {
  const [deposits, setDeposits] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const createDeposit = async (depositData, onSuccess) => {
    setIsFetching(true)
    setError(null)
    try {
      const response = await createDepositRequest(depositData)
      setIsFetching(false)

      if (response?.error) {
        setError(response.msg || 'No se pudo realizar el depósito')
        toast.error(response.msg || 'No se pudo realizar el depósito')
        return { success: false }
      }
      if (response?.data?.deposit) {
        await getMyDeposits() // recarga la lista
        toast.success('Depósito realizado correctamente')
        if (onSuccess) onSuccess() // cierra el modal y refresca
        return { success: true }
      } else {
        setError('No se pudo obtener información del depósito')
        toast.error('No se pudo obtener información del depósito')
        return { success: false }
      }
    } catch (error) {
      setIsFetching(false)
      setError('Error inesperado al crear el depósito')
      toast.error('Error inesperado al crear el depósito')
      return { success: false }
    }
  }

  const getMyDeposits = async () => {
    setIsFetching(true)
    setError(null)
    try {
      const response = await getMyDepositsRequest()
      setIsFetching(false)
      if (response?.error) {
        setError(response.msg || 'No se pudieron obtener los depósitos')
        toast.error(response.msg || 'No se pudieron obtener los depósitos')
        return []
      }
      setDeposits(response?.data?.deposits || [])
      return response?.data?.deposits || []
    } catch (error) {
      setIsFetching(false)
      setError('Error inesperado al obtener los depósitos')
      toast.error('Error inesperado al obtener los depósitos')
      return []
    }
  }

  const revertDeposit = async (depositId) => {
    setIsFetching(true)
    setError(null)
    try {
      const response = await revertDepositRequest(depositId)
      setIsFetching(false)
      if (response?.error) {
        setError(response.msg || 'No se pudo revertir el depósito')
        toast.error(response.msg || 'No se pudo revertir el depósito')
        return { success: false }
      }
      toast.success('Depósito revertido correctamente')
      await getMyDeposits()
      return { success: true }
    } catch (error) {
      setIsFetching(false)
      setError('Error inesperado al revertir el depósito')
      toast.error('Error inesperado al revertir el depósito')
      return { success: false }
    }
  }

  return {
    deposits,
    isFetching,
    error,
    createDeposit,
    getMyDeposits,
    revertDeposit,
  }
}