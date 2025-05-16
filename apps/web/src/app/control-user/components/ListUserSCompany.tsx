import Avatar from '@/components/Avatar'
import RolesInfo from '@/components/RolesInfo'
import { useUserControlContext } from '@/context/UserControlContext'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Pagination, SelectPicker } from 'rsuite'
//import 'rsuite/dist/rsuite.min.css'


const options = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
];

export default function ListUserSCompany() {
    const { usersByCompany, handlerSelectUser } = useUserControlContext()

    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const totalPages = Math.ceil(usersByCompany.length / itemsPerPage)
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedUsers = usersByCompany.slice(startIndex, endIndex)

    return (
        <motion.ul
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: 10, opacity: 0 }}
        exit={{ x: -10, opacity: 0 }}
      >
            {paginatedUsers.map((user) => (
                <li
                    key={user.id}
                    onClick={() => handlerSelectUser(user.id)}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] px-4 py-2 border-b border-zinc-300 hover:bg-zinc-100 transition-all rounded duration-300"
                >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center transition-all duration-300">
                        <Avatar name={user.name} url={user.imgProfile} />
                        <div>
                            <h1 className="font-semibold text-sm sm:text-base transition-all duration-300">{user.name}</h1>
                            <p className="text-secondary-500 text-sm transition-all duration-300">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center px-4 justify-center mt-2 sm:mt-0 sm:justify-between col-start-1 sm:col-start-2 transition-all duration-300">
                        {user.globalRol.map((rol) => (
                            <RolesInfo key={rol.name} rol={rol.name} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center text-zinc-400 col-start-2 row-start-1 row-span-2 px-4 text-2xl sm:px-0 sm:text-base sm:col-start-3 sm:row-start-1 sm:row-span-1 transition-all duration-300">
                        <IoIosArrowForward />
                    </div>
                </li>
            ))}

            <div className="flex justify-center items-center mt-5">
                <Pagination
                    prev
                    next
                    first
                    last
                    size="xs"
                    total={usersByCompany.length}
                    limit={itemsPerPage}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={(value) => {
                        setItemsPerPage(value)
                        setPage(1) // Reiniciar a la primera página cuando cambia el límite
                    }}
                />
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Mostrar:</span>
                    <SelectPicker
                        data={options}
                        value={itemsPerPage}
                        onChange={(value) => {
                            setItemsPerPage(value as number);
                            setPage(1); // Reinicia la página
                        }}
                        searchable={false}
                        cleanable={false}
                        menuStyle={{ zIndex: 1050 }}
                        menuClassName='text-xs'
                        size="sm"
                        style={{ width: 80 }}
                    />
                </div>

            </div>
        </motion.ul>
    )
}
