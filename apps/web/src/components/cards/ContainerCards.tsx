import React from 'react'

export default function ContainerCards({ children }: React.PropsWithChildren) {
    return (
        <div className="flex gap-6 p-4 bg-white shadow-md rounded-xl items-center justify-center w-[80%]">
            {children}
        </div>
    )
}
