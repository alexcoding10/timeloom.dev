import { GetPauses, TimeBreak, TimeEntry } from "@/types/signings";
import { formatDate } from "@/utils/utils";
import { useMemo, useState, useEffect } from "react";

export type Col = {
  value: number;
  timebreaks: TimeBreak[];
  day: string;
};

export const useChartPause = (
  options: GetPauses | [],
  numberCols: number,
) => {
  // Crear las columnas primero
  const cols: Col[] = useMemo(() => {
    if (!options || options.length === 0) return [];
    const numberColsWithInfo = options.length;

    return new Array(numberCols).fill(null).map((_, idx) => {
      const day = formatDate(
        new Date(
          new Date().setDate(new Date().getDate() - (numberCols - idx) + 1)
        ).toISOString(),
        "dd/mm/yyyy"
      );

      if (idx >= numberCols - numberColsWithInfo) {
        const index = idx - (numberCols - numberColsWithInfo);
        const timebreaks = options[index]?.timebreaks || [];

        return {
          value: timebreaks.length || 0,
          timebreaks,
          day,
        };
      }
      //esta entrando aqui en el primer render
      return { value: 0, timebreaks: [], day };
    });
  }, [options, numberCols]);

  // Estado inicial vacío
  const [colSelected, setColSelected] = useState<Col | undefined>(undefined);
  const [hasUserSelected, setHasUserSelected] = useState(false);



  const handlerColSelected = (idx: number) => {
    setColSelected(cols[idx]);
    setHasUserSelected(true); // el usuario ha hecho una selección manual
  };

  // Solo selecciona automáticamente una vez cuando las columnas estén listas
  useEffect(() => {
    const latestCol = cols[cols.length - 1];
    // Evita la actualización si no hay columnas o si ya se seleccionó una columna por el usuario 
    //o si la columna seleccionada no es la de hoy
    if (cols.length === 0 || hasUserSelected && colSelected?.day != latestCol.day) return;

    // Compara la última pausa de la columna seleccionada con la última pausa de la columna más reciente
    const currentLast = colSelected?.timebreaks.at(-1);
    const latestLast = latestCol.timebreaks.at(-1);

    const hasLastPauseChanged =
      currentLast?.clockOut !== latestLast?.clockOut ||
      currentLast?.clockIn !== latestLast?.clockIn;

    // Si no hay columna seleccionada o si la columna seleccionada ha cambiado, actualiza la columna seleccionada
    if (
      !colSelected ||
      colSelected.day !== latestCol.day ||
      colSelected.timebreaks.length !== latestCol.timebreaks.length ||
      hasLastPauseChanged
    ) {
      setColSelected(latestCol);
    }
  }, [cols, colSelected, options, hasUserSelected]);



  return { cols, colSelected, handlerColSelected };
};
