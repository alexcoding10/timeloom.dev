import { useBonus } from '@/hooks/useBonus'
import { BonusState } from '@/types/bonus'
import React, { createContext, ReactNode } from 'react'


export const BonusContext = createContext<BonusState|undefined>(undefined)

//Provaider
export const BonusProvaider = ({children}:{children:ReactNode}) =>{
    const {bonus,loading,addBonus,removeBonus}=useBonus()
    return (
        <BonusContext.Provider value={{addBonus,bonus,loading,removeBonus}}>
            {children}
        </BonusContext.Provider>
    )
}