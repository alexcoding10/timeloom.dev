import { useEffect, useState } from "react"
import { URL_BACKEND_DEV } from "@/utils/config"

export const useContract = (idUser: number) => {
  const [contract, setContract] = useState(null)

  // Hook que llama al backend y guarda el contrato
  const handlerGetContract = async () => {
    try {
      const response = await fetch(`${URL_BACKEND_DEV}/contract/user/${idUser}`)
      if (!response.ok) {
        throw new Error('Error al obtener el contrato')
      }
      const data = await response.json()
      setContract(data)
    } catch (error) {
      console.error(error)
      setContract(null)
    }
  }

  useEffect(() => {
    if (idUser) {
      handlerGetContract()
    }
  }, [idUser]) 

  return { contract }
}
