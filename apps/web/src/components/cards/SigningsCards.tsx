import React, { useEffect, useState } from 'react';
import { TimeBreak, TimeEntry } from '@/types/user';
import ContainerCards from './ContainerCards';
import { formatDate } from '@/utils/utils';
import dynamic from 'next/dynamic';
import ModalPauses from '@/app/control-user/components/ModalPauses';

const MapComponent = dynamic(() => import('@/components/maps/MapComponent'), {
  ssr: false,
});

interface Props {
  signings: TimeEntry[];
}

export default function SigningsCards({ signings }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [currentTimeBreaks, setCurrentTimeBreaks] = useState<TimeBreak[] | null>(null);

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handlerToggleOpenModal = (timebreaks: TimeBreak[]) => {
    setCurrentTimeBreaks(timebreaks);
    setOpenModal(!openModal);
  };

  const handlerCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (currentTimeBreaks === null) return;
    setOpenModal(true);
  }, [currentTimeBreaks]);

  // Calculamos qué fichajes mostrar según la página
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSignings = signings.slice(indexOfFirst, indexOfLast);

  // Número total de páginas
  const totalPages = Math.ceil(signings.length / itemsPerPage);

  // Función para cambiar página
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Función para generar páginas con elipsis
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

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

    pages.push(totalPages);

    return pages;
  };

  return (
    <ContainerCards>
      {currentTimeBreaks && (
        <ModalPauses
          handlerCloseModal={handlerCloseModal}
          openModal={openModal}
          timebreaks={currentTimeBreaks}
        />
      )}

      <div className="flex flex-col w-full">
        <div className="w-full text-start">
          <h1 className="font-montserrat text-2xl font-semibold">Fichajes</h1>
          <hr className="text-zinc-300 my-3" />
        </div>

        {signings.length === 0 ? (
          <div className="bg-zinc-300 py-2 px-4 rounded-lg text-center">
            No tiene ningún fichaje aún
          </div>
        ) : (
          currentSignings.map(signing => (
            <div key={signing.id} className="shadow-lg bg-yellow-100 rounded-lg p-4 mb-3">
              <div className="mb-5 flex justify-between">
                <div>
                  <h1 className="font-bold text-lg ">
                    Día {formatDate(signing.clockIn, 'dd/mm/yyyy')}
                  </h1>
                  <hr className="text-zinc-500 mb-3" />
                  <p>Comienzo: {formatDate(signing.clockIn, 'hh:mm:ss')}</p>
                  {signing.clockOut ? (
                    <p>Final: {formatDate(signing.clockOut, 'hh:mm:ss')}</p>
                  ) : (
                    <p className="text-red-600">❌ No se ha fichajado el final</p>
                  )}
                </div>
                {signing.timebreaks.length !== 0 ? (
                  <div>
                    <button
                      onClick={() => handlerToggleOpenModal(signing.timebreaks)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Ver Pausas
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="bg-zinc-200 px-2 py-1 rounded-lg">❌ No hay pausas</p>
                  </div>
                )}
              </div>
              {signing.coordinates !== null ? (
                <div className="w-[300px] mx-auto">
                  <MapComponent lat={signing.coordinates.lat} lon={signing.coordinates.lon} />
                </div>
              ) : (
                <p>No se consiguió la ubicación 🌎</p>
              )}
            </div>
          ))
        )}

        {/* Controles de paginación */}
        {signings.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>

            {getPageNumbers().map((page, idx) => {
              if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                return (
                  <span key={page + idx} className="px-2 py-1 select-none">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
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
        )}
      </div>
    </ContainerCards>
  );
}
