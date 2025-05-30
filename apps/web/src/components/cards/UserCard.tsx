'use client'

import { useUploadImg } from "@/hooks/useUploadImg";
import { User } from "@/types/user";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useRef } from "react";
import ContainerCards from "./ContainerCards";

interface Props {
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  updateUsersCompanyById?:(id: number, data: any) => void
}

function UserCard({ currentUser, setCurrentUser, updateUsersCompanyById }: Props) {
  const { uploadImage, isUploading } = useUploadImg()

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && uploadImage) {
      const url = await uploadImage(file, currentUser.id); // Puedes subirlo al backend aquí
      //actualizar el currentUser y el usuario en base de datos
      setCurrentUser(prev => prev && ({
        ...prev,
        imgProfile: url
      }))

      if (updateUsersCompanyById) {
        // actualizar en el usuario global del context
        updateUsersCompanyById(currentUser.id, { key: 'imgProfile', value: url })

      }

    }
  };

  return (
    <ContainerCards>
      {/* Imagen o iniciales clicables */}
      <div className="relative group cursor-pointer" onClick={handleClick}>
        {currentUser?.imgProfile ? (
          <img
            src={`${URL_BACKEND_DEV}${currentUser.imgProfile}`}
            alt={`Foto de perfil de ${currentUser.name}`}
            className="w-20 h-20 rounded-full object-cover border border-zinc-300 hover:brightness-90 transition"
          />
        ) : (
          <div className="w-20 h-20 bg-zinc-600 rounded-full flex justify-center items-center text-white text-3xl font-semibold hover:brightness-90 transition">
            {currentUser?.name?.substring(0, 2).toUpperCase()}
          </div>
        )}

        {/* Input file oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Texto flotante opcional */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Cambiar foto
        </span>
      </div>

      {/* Info del usuario */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl text-zinc-800 leading-tight">
          {currentUser?.name}
        </p>
        <a
          href={`mailto:${currentUser?.email}`}
          className="text-blue-600 hover:underline text-sm"
        >
          {currentUser?.email}
        </a>
        {currentUser?.contract?.[0]?.job && (
          <div className="bg-lime-100 text-lime-800 px-3 py-1 rounded-md text-sm font-medium w-fit">
            {currentUser.contract[0].job}
          </div>
        )}
      </div>
    </ContainerCards>
  );
}

export default UserCard