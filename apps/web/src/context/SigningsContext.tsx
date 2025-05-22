"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useSignings } from "@/hooks/useSignings";
import { ControlSigningsType, CreateTimeBreak, GetPauses, PauseType, TimeEntry } from "@/types/signings";
import { pauseFindDays } from "@/state/pause.state";
import { usePause } from "@/hooks/usePause";
import { Col, useChartPause } from "@/hooks/useChartPause";


type SigningsState = {
  controlData: ControlSigningsType;
  onClickControl: (name: string) => void;
  signings: TimeEntry | null;
  loadingSignings: boolean;
  openPauseModal: boolean;
  closePauseModal: () => void;
  pauseType: PauseType[];
  fetchCreatePause: (createPause: CreateTimeBreak) => Promise<void>,
  cols: Col[],
  colSelected: Col | undefined,
  handlerColSelected: (idx: number) => void,
  pauses: GetPauses | null,
  pauseFind: number,
  setPauseFind: Dispatch<SetStateAction<number>>
};

export const SigningsContext = createContext<SigningsState | undefined>(
  undefined
);

export const SigningsProvider = ({ children }: { children: ReactNode }) => {
  const {
    signings,
    controlData,
    onClickControl,
    loadingSignings,
    openPauseModal,
    closePauseModal,
    pauseType,
    fetchCreatePause } = useSignings()
  const [pauseFind, setPauseFind] = useState(pauseFindDays[0].value)
  const { pauses } = usePause(pauseFind,signings)
  const { cols, colSelected, handlerColSelected } = useChartPause(pauses ?? [], pauseFind )


  return (
    <SigningsContext.Provider value={{
      controlData,
      onClickControl,
      loadingSignings,
      signings,
      openPauseModal,
      closePauseModal,
      pauseType,
      fetchCreatePause,
      cols,
      colSelected,
      handlerColSelected,
      pauses,
      pauseFind,
      setPauseFind
    }}>
      {children}
    </SigningsContext.Provider>
  );
};

//hook para usar el contexto
export const useSigningsContext = (): SigningsState => {
  const context = useContext(SigningsContext);
  if (!context) {
    throw new Error(
      "useUserControlContext must be used within an AuthProvider"
    );
  }
  return context;
};
