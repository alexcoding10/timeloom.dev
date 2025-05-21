import { GetPauses } from "@/types/signings";
import { formatDate } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export type Col = {
  value: number;
  durations: ({ duration: null } | { duration: string })[] | null;
  day: string;
};

export const useChartPause = (
  options: GetPauses | [],
  numberCols: number
) => {
  // Referencia al último fichaje
  const lastPause = useRef(options?.at(-1));
  const [colSelected, setColSelected] = useState<Col | undefined>(undefined);

  // Comprobar si el último fichaje es hoy
  const isSigningsToday = lastPause.current?.day
    ? new Date(lastPause.current?.day).getDate() === new Date().getDate()
    : false;

  // Número de columnas con la información
  const numberColsWithInfo = isSigningsToday
    ? options?.length
    : options.length + 1;

  // Crear las barras
  const cols = new Array(numberCols).fill(null).map((_, idx) => {
    const day = formatDate(
      new Date(
        new Date().setDate(new Date().getDate() - (numberCols - idx))
      ).toISOString(),
      "dd/mm/yyyy"
    );
    if (idx >= numberCols - numberColsWithInfo) {
      // Calculamos el índice real del fichaje en 'options'
      const index = idx - (numberCols - numberColsWithInfo);
      const timebreaks = options[index]?.timebreaks || [];

      const duration = timebreaks.map((pause) => {
        if (!pause.clockOut && idx === numberCols - 1 && !isSigningsToday) {
          // Si no hay fichaje hoy y estamos en la última columna
          return { duration: null };
        }

        if (pause.clockIn && pause.clockOut) {
          const durationMs =
            new Date(pause.clockOut).getTime() -
            new Date(pause.clockIn).getTime();
          return {
            duration: formatDate(
              new Date(durationMs).toISOString(),
              "Hh Mm Ss"
            ),
          };
        }

        return { duration: null }; // Si no tiene fichaje, se marca 0
      });

      return {
        value: timebreaks.length + 1 || 0,
        durations: duration,
        day: day,
      };
    }

    return { value: 0, durations: null, day: day }; // default value if no data
  });

  const handlerColSelected = (idx: number) => {
    setColSelected(cols[idx]);
  };

  useEffect(() => {
    setColSelected(cols.at(-1));
  }, [options]); // o [cols] si lo prefieres

  return { cols, colSelected, handlerColSelected };
};
