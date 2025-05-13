import { useAuthContext } from "@/context/AuthContext"
import { Rol } from "@/types/rol"
import { URL_BACKEND_DEV } from "@/utils/config"
import { useEffect, useState } from "react"


//obtener los roles de la empresa
export const useRol = () => {
    const {user} = useAuthContext()
    const [roles, setRoles] = useState<Rol[]>([])
    const [loading, setLoading] = useState(true)

    const removeRol = async (id: number) => {
        try {
            const response = await fetch(`${URL_BACKEND_DEV}/company/role/${id}`, {
                method: "DELETE",
                credentials: "include",
            })
            if (!response.ok) {
                console.error("Error al eliminar el rol")
                return
            }
            setRoles((prev) => prev.filter((rol) => rol.id !== id))
        } catch (error) {
            console.error("Error al eliminar el rol", error)
        }
    }

    const addRol = async (newRol: Rol) => {
        try {
            const response = await fetch(`${URL_BACKEND_DEV}/company/create/role`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRol),
            })
            const data = await response.json()
            if (!response.ok) {
                console.error("Error al crear el rol")
                return
            }
            setRoles((prev) => [...prev, data])
        } catch (error) {
            console.error("Error al crear el rol", error)
        }
    }

    const fetchRoles = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${URL_BACKEND_DEV}/company/${user.companyId}/roles`, {
                method: "GET",
                credentials: "include",
            })
            const data = await response.json()
            const responseRoles: Rol[] = data || []
            setRoles(responseRoles)
        } catch (err) {
            console.error("Error fetching roles:", err)
            setRoles([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?.companyId) {
            fetchRoles()
        }
    }, [user?.companyId])
    
    return {roles, loading, removeRol, addRol}
}
