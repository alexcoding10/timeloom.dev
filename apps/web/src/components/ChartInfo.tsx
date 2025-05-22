import { Col } from "@/hooks/useChartPause";
import { formatDate } from "@/utils/utils";
import React, { useEffect, useMemo, useRef } from "react";

interface Props {
  colSelected: Col;
}

export default function ChartInfo({ colSelected }: Props) {

  const isToday = useMemo(() => {
  return formatDate(new Date().toISOString(), 'dd/mm/yyyy') === colSelected.day;
}, [colSelected]);


  useEffect(() => {
    console.log(colSelected)
  }, [colSelected])
  return (
    <>
      {
        colSelected.value === 0 ? (
          <div className=" w-full h-full flex justify-center items-center">
            <p className="px-4 py-2 bg-zinc-300 rounded-lg text-neutral-dark-400">
              {colSelected.day.split('/')[0] === new Date().getDate().toString() ?
                'Hoy aún no tienes ninguna pausa.'
                : 'No hiciste ninguna pausa'
              }
            </p>
          </div>
        ) : (

          <div className="flex flex-wrap justify-center gap-3 mt-5 ">
            {
              [...colSelected.timebreaks].reverse().map((timeBreak,idx) => (
                <div key={idx} className={`flex rounded-lg border border-zinc-200 py-2 px-4 ${!timeBreak.clockOut ? !isToday ? 'bg-red-100':'bg-zinc-100': 'bg-white'}`}>
                  <div className="w-[130px]">
                    <h3 className="font-montserrat text-base text-black">{timeBreak.pauseType.name}</h3>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 text-sm text-neutral-dark-400">
                      <p>Inicio: </p>
                      <p>{formatDate(timeBreak.clockIn, 'hh:mm:ss')}</p>
                      <p>Final: </p>
                      <p>{timeBreak.clockOut ? formatDate(timeBreak.clockOut, 'hh:mm:ss') : isToday ? 'En desarrollo' : 'No fichado'}</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className={`w-[50px] h-[50px] rounded-full flex justify-center items-center text-4xl ${timeBreak.pauseType.isPaid ? 'bg-lime-200 text-lime-700': 'bg-red-200 text-red-700'}`}>
                        €
                    </div>
                  </div>
                </div>
              ))
            }

          </div>

        )

      }
    </>
  );
}
