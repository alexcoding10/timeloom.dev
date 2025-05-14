import React from 'react'
import { Modal } from 'rsuite'

interface Props {
    openViewPassword: {
        open: boolean;
        password: string;
    },
    handlerCloseViewPassword: () => void,
}


export default function ModalViewRememberPassword({ openViewPassword, handlerCloseViewPassword }: Props) {
    return (

        <Modal open={openViewPassword.open} onClose={handlerCloseViewPassword}>
            <Modal.Header>
                <Modal.Title>Contraseña generada</Modal.Title>
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-5'>
                <p className='text-center text-xl font-bold'>{openViewPassword.password}</p>
                <p>
                    Copia la contraseña para entregársela al usuario. Una vez que inicie sesión, podrá cambiarla desde su perfil.
                </p>
                <p>
                    Si el usuario olvida su contraseña, deberá solicitar una nueva al administrador.
                </p>
                <p className="text-red-500 font-medium">
                    Esta contraseña no podrá recuperarse una vez cierres esta ventana. Si se pierde, deberás generar una nueva.
                </p>

            </Modal.Body>
            <Modal.Footer>
                <button
                    className="py-2 px-4 rounded-xl bg-secondary-500 text-white"
                    onClick={handlerCloseViewPassword}>
                    Cerrar</button>
            </Modal.Footer>
        </Modal>
    )
}
