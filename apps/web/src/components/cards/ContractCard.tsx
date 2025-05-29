import { Contract, User } from '@/types/user'
import React, { useState } from 'react'
import ContainerCards from './ContainerCards'
import { TbEdit } from "react-icons/tb";
import { CiSaveDown1 } from "react-icons/ci";
import { formatDate } from '@/utils/utils';
import Field from '../Field';

interface Props {
  contract: Contract,
}


export default function ContractCard({ contract }: Props) {

  const [isEditable, setIsEditable] = useState(false)
  const handlerToggleEditable = () => {
    setIsEditable(!isEditable)
  }

  return (
    <ContainerCards>
      <div className='flex flex-col'>

        <div className='w-full text-start flex justify-between'>
          <h1 className='font-montserrat text-2xl font-semibold'>Contrato</h1>
          <button
            onClick={handlerToggleEditable}
            className={`cursor-pointer px-4 py-2 rounded-lg flex gap-2 items-center transition-all ease-in ${!isEditable ? 'bg-lime-100 text-lime-800' : 'bg-blue-100 text-blue-800'} `} >
            {
              !isEditable ? (
                <>
                  <TbEdit />
                  Editar
                </>
              ) : (
                <>
                  <CiSaveDown1 />
                  Guardar
                </>
              )
            }
          </button>
        </div>
      </div>

    </ContainerCards>
  )
}
