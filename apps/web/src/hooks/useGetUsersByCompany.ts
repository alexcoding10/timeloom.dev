'use client'

import { useAuthContext } from '@/context/AuthContext'
import { UserControl } from '@/types/user'
import { URL_BACKEND_DEV } from '@/utils/config'
import { useEffect, useState } from 'react'

function useGetUsersByCompany() {
  const { user, loading } = useAuthContext()
  const [loadingUserFetch, setLoadingUserFetch] = useState(true)
  const [usersByCompany, setUsersByCompany] = useState<UserControl[]>([])


  const addUsersByCompany = (user: UserControl) => {
    setUsersByCompany((prevUsers) => [...prevUsers, user])
  }

  const updateUsersCompanyById = (id:number,data:any) =>{
    setUsersByCompany((prev) => prev.map(user => user.id === id ? ({
      ...user,
      [data.key]:data.value
    }): user))
  }

  const fetchUsersByCompany = async () => {
    setLoadingUserFetch(true)
    try {
      // Verifica que user y user.companyId estén disponibles antes de hacer la solicitud
      if (user?.companyId) {
        const response = await fetch(`${URL_BACKEND_DEV}/users/company/${user.companyId}`, {
          method: 'GET',
          credentials: 'include'
        })
        
        if (response.ok) {
          const data = await response.json()

          // Filtra al usuario actual para no incluirlo en la lista
          const filteredUsers = data.data.filter((userComp: { id: any }) => userComp.id !== user.id)
          
          setUsersByCompany(filteredUsers)
        } else {
          setUsersByCompany([])
        }
      }
    } catch (error) {
      console.error('No se encontraron usuarios', error)
      setUsersByCompany([])
    } finally {
      setLoadingUserFetch(false)
    }
  }

  useEffect(() => {
    // Si user está listo y no está cargando, hacemos el fetch
    if (!loading && user?.companyId) {
      fetchUsersByCompany()
    }
  }, [user, loading]) // Dependemos de 'user' y 'loading'

  return { usersByCompany, setUsersByCompany, addUsersByCompany,loadingUserFetch, updateUsersCompanyById }
}

export default useGetUsersByCompany
