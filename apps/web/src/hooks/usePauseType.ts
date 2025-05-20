'use client'

import { useAuthContext } from "@/context/AuthContext"
import { PauseType } from "@/types/signings"
import { URL_BACKEND_DEV } from "@/utils/config"
import { useEffect, useState } from "react"


export const usePauseType=() =>{
    const {user}=useAuthContext()
    const [pauseType,setPauseType] = useState<PauseType[]>([])

    const getPausetypes = async () =>{
        const response = await fetch(`${URL_BACKEND_DEV}/signings/pauseType/${user.companyId}`,{
            method:'GET',
            credentials:'include'
        })

        if(!response.ok){
            throw new Error('Error al obtener los tipos de pausa')
        }
        const data = await response.json() //convierto en json
        setPauseType(data as PauseType[])
    }

  useEffect(()=>{
    getPausetypes()
  },[])

    return {pauseType}
}