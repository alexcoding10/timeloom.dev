import { motion } from 'framer-motion';
import React, { useEffect } from 'react'

import UsersCompanyView from './UsersCompanyView';
import FormCreateUser from './FormCreateUser';
import { useUserControlContext } from '@/context/UserControlContext';
import Container from '@/components/Container';

export default function ControlUserView() {
    const { usersByCompany, setOpenCreateUser, loadingUserFetch, openCreateUser } = useUserControlContext()

    if (loadingUserFetch) {
        return
    }

    return (
        <Container>
            {/* Titulo */}
            <div className="text-start w-full py-5 px-10 flex justify-between items-center">
                <div className="font-montserrat md:text-xl font-semibold">
                    {!openCreateUser ? (
                        <p>Todos los usuarios</p>
                    ) : (
                        <p>Crear nuevo usuario</p>
                    )}
                </div>
                <button
                    className="py-2 px-4 rounded-xl bg-secondary-500 text-white"
                    onClick={() => setOpenCreateUser(!openCreateUser)}
                >
                    {!openCreateUser ? <p>Crear Usuario</p> : <p>Volver ⏎</p>}
                </button>
            </div>

            {/* Mensaje si no hay usuarios y no se está creando uno */}
            {usersByCompany.length === 0 && !openCreateUser ? (
                <motion.div
                    animate={{
                        opacity: [0, 1],
                        y: [10, 0],
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="py-4 flex gap-2"
                >
                    <motion.div
                        animate={{
                            y: [0, -3, 0],
                        }}
                        transition={{
                            repeat: 2,
                            repeatType: "loop",
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                    >
                        ❌
                    </motion.div>
                    <p>
                        {" "}
                        <span
                            className="text-secondary-500 cursor-pointer"
                            onClick={() => setOpenCreateUser(true)}
                        >
                            Crea un nuevo usuario.
                        </span>
                    </p>
                </motion.div>
            ) : openCreateUser ? (
                /* Si se está creando un usuario, mostrar el formulario de creación */
                <motion.div
                    animate={{
                        y: [-10, 0],
                        opacity: [0, 1],
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex gap-2  w-full px-10  sm:px-20 lg:px-40 xl:px-80"
                >
                    <FormCreateUser/>
                    {/* Aquí podrías poner el formulario para crear un usuario */}
                </motion.div>
            ) : (
                /* Si hay usuarios, pero no estamos creando uno, mostrar la lista */
                <motion.div
                    animate={{
                        opacity: [0, 1],
                        x: [10, 0],
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="p-4 flex gap-2 w-full"
                >
                    <UsersCompanyView />
                    {/* Aquí puedes mostrar la lista de usuarios */}
                </motion.div>
            )}
        </Container>
    )
}
