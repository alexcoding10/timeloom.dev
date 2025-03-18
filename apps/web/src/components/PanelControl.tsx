"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TextLG, TextSM } from "./Typography";

type Props = {
  auto?: boolean;
};

const PanelControl = ({ auto }: Props) => {
  // Estados para horas trabajadas, balance y días restantes
  const [hoursWorked, setHoursWorked] = useState(0);
  const [balance, setBalance] = useState(0);
  const [daysRemaining, setDaysRemaining] = useState(20);

  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        setHoursWorked((prev) => prev < 40 ? prev + 1 : 0);
        setBalance((prev) => (prev < 1800 ? prev + 50.4 : 0));
        setDaysRemaining((prev) => (prev > 0 ? prev - 1 : 30)); // Reiniciar días cuando llegue a 0
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auto]);

  return (
    <div className="grid grid-row-3 md:grid-cols-3 gap-12 border-2 bg-white border-gray-300 px-12 py-8 rounded-3xl shadow-xl my-20">
      {/* Horas trabajadas */}
      <div className="flex gap-3 items-center">
        <div className="w-[50px] h-[50px] rounded-xl bg-success-600 flex justify-center items-center">
          <img src="/icons/time.svg" alt="time icon" />
        </div>
        <div>
          <TextSM textColor="text-neutral-dark-400">Horas Trabajadas</TextSM>
          <TextLG textWeight="font-bold">{hoursWorked}H00</TextLG>
        </div>
      </div>

      {/* Balance */}
      <div className="flex gap-3 items-center">
        <div className="w-[50px] h-[50px] rounded-xl bg-info-500 flex justify-center items-center">
          <img src="/icons/balance.svg" alt="balance icon" />
        </div>
        <div>
          <TextSM textColor="text-neutral-dark-400">Balance</TextSM>
          <TextLG textWeight="font-bold">${balance.toFixed(2)}</TextLG>
        </div>
      </div>

      {/* Días restantes */}
      <div className="flex gap-3 items-center">
        <div className="w-[50px] h-[50px] rounded-xl bg-warning-500 flex justify-center items-center">
          <img src="/icons/rayado.svg" alt="days icon" />
        </div>
        <div>
          <TextSM textColor="text-neutral-dark-400">Días Restantes</TextSM>
          <TextLG textWeight="font-bold">{daysRemaining}</TextLG>
        </div>
      </div>
    </div>
  );
};

export default PanelControl;
