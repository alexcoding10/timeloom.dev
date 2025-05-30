import SigningsBreakCards from '@/components/cards/SigningsBreakCards';
import { TimeBreak } from '@/types/user';
import { formatDate } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { Modal } from "rsuite";

interface Props {
    openModal: boolean
    handlerCloseModal: () => void
    timebreaks: TimeBreak[]
}

export default function ModalPauses({ handlerCloseModal, openModal, timebreaks }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const totalPages = Math.ceil(timebreaks.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentTimebreaks = timebreaks.slice(indexOfFirst, indexOfLast);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!openModal) {
            setCurrentPage(1);
        }
    }, [openModal]);

    // Función para generar páginas con ellipsis
    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return [...Array(totalPages)].map((_, i) => i + 1);
        }

        const pages = [];

        // Siempre mostrar la primera página
        pages.push(1);

        let startPage = Math.max(currentPage - 1, 2);
        let endPage = Math.min(currentPage + 1, totalPages - 1);

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages - 1;
        }

        if (startPage > 2) {
            pages.push('start-ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('end-ellipsis');
        }

        // Siempre mostrar la última página
        pages.push(totalPages);

        return pages;
    };

    return (
        <Modal open={openModal} onClose={handlerCloseModal}>
            <Modal.Header>
                <h1 className="font-bold text-lg mb-4">
                    Pausas del día {timebreaks.length > 0 ? formatDate(timebreaks[0].clockIn, 'dd/mm/yyyy') : ''}
                </h1>
            </Modal.Header>

            <Modal.Body>
                {currentTimebreaks.map((timeBreak, idx) => (
                    <SigningsBreakCards
                        key={`${timeBreak.clockIn}-${idx}`}
                        timebreak={timeBreak}
                    />
                ))}
            </Modal.Body>

            {timebreaks.length > itemsPerPage && (
                <Modal.Footer>
                    <div className="flex justify-center gap-2 w-full flex-wrap">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        {getPageNumbers().map((page, idx) => {
                            if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                                return <span key={page + idx} className="px-2 py-1 select-none">...</span>;
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page as number)}
                                    className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </Modal.Footer>
            )}
        </Modal>
    );
}
