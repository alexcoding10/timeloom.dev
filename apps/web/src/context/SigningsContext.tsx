"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useSignings } from "@/hooks/useSignings";
import { ControlSigningsType, CreateTimeBreak, PauseType, TimeEntry } from "@/types/signings";


type SigningsState = {
  controlData: ControlSigningsType;
  onClickControl: (name: string) => void;
  signings: TimeEntry | null;
  loadingSignings: boolean;
  openPauseModal: boolean;
  closePauseModal: () => void;
  pauseType: PauseType[];
  fetchCreatePause: (createPause: CreateTimeBreak) => Promise<void>
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

  return (
    <SigningsContext.Provider value={{
      controlData,
      onClickControl,
      loadingSignings,
      signings,
      openPauseModal,
      closePauseModal,
      pauseType,
      fetchCreatePause
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
