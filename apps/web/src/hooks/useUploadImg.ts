import { URL_BACKEND_DEV } from "@/utils/config";
import { useState } from "react";



export const useUploadImg = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadImage = async (file: File,id:number): Promise<string | null> => {
        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        setError(null);

        try {
            const res = await fetch(`${URL_BACKEND_DEV}/upload/user/${id}`, {
                method: "POST",
                body: formData,
                credentials: "include", // si usas cookies
            });

            if (!res.ok) throw new Error("Error al subir la imagen");

            const data = await res.json();
            // Puedes retornar la URL nueva u otro valor según lo que devuelva tu backend
            return data.filePath || null;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadImage, isUploading, error };
}