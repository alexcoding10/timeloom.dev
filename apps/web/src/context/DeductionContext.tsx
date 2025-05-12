import { useGetDeductions } from '@/hooks/useGetDeductions'
import { DeductionState } from '@/types/deductions'
import React, { createContext, ReactNode } from 'react'


export const DeductionContext = createContext<DeductionState|undefined>(undefined)

//Provaider
export const DeductionProvaider =({ children }: { children: ReactNode }) =>{
    const {deductions,loading,addDeduction,removeDeduction} = useGetDeductions()
    return(
        <DeductionContext.Provider value={{deductions,loading,addDeduction,removeDeduction}}>
            {children}
        </DeductionContext.Provider>
    )
}


