import { User } from "@/types/user"
import { URL_BACKEND_DEV } from "@/utils/config"
import { useEffect, useState } from "react"


export const useGetUsersById = (id: number | undefined) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchGetUser = async () => {
        setLoading(true)
        const response = await fetch(`${URL_BACKEND_DEV}/users/${id}`)

        if (!response.ok) {
            return
        }
        const data = await response.json()

        setUser(data)
        setLoading(false)
    }
    useEffect(() => {
        if (id === undefined) return
        //si es undefined no hago la llamada
        fetchGetUser()
    }, [id])

    return { user, setUser, loading }
}