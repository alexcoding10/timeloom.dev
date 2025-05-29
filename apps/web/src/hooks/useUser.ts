import { URL_BACKEND_DEV } from "@/utils/config";

export const useUser = ()=>{
    
        const handlerUpdateUser = async (id:number,data: any) => {
            try {
                const response = await fetch(`${URL_BACKEND_DEV}/users/${id}`, {
                    method: 'PUT', // o PATCH
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (!response.ok) throw new Error('Error al actualizar el usuario');
    
                const updatedUser = await response.json();
                return updatedUser;
            } catch (error: any) {
                console.error('Error al actualizar el usuario:', error.message);
                throw error;
            }
    
        }

        return {handlerUpdateUser}
}