"use client";

import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import dayjs from "dayjs";

type Balance = {
  id: string;
  label: string;
  value: string;
  icon: {
    color: string;
    img: string;
    bgColor: string;
  };
};

const balances: Balance[] = [
  {
    id: "payments",
    label: "Pagos",
    value: "300",
    icon: {
      color: "text-success-700",
      img: "💰",
      bgColor: "bg-success-400",
    },
  },
  {
    id: "hours",
    label: "Horas totales",
    value: "1000",
    icon: {
      color: "text-info-600",
      img: "⏱️",
      bgColor: "bg-info-400",
    },
  },
  {
    id: "workers",
    label: "Tabajadores",
    value: "300",
    icon: {
      color: "text-error-600",
      img: "🧑🏻‍💻",
      bgColor: "bg-error-400",
    },
  },
];

function Balances() {
  const [balance, setBalance] = useState<Balance[]>(balances);
  const today = dayjs();
  const thirtyDaysAgo = today.subtract(30, "day");

  const [dateRange, setDateRange] = useState<[Date, Date]>([
    thirtyDaysAgo.toDate(),
    today.toDate(),
  ]);

  const updateValueBalance = ({
    id,
    newValue,
  }: {
    id: "workers" | "hours" | "payments";
    newValue: string;
  }) => {
    setBalance((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  return (
    <div className=" md:col-span-2 rounded-3xl border-2 border-zinc-200 shadow-md p-10">
      <div className="flex gap-2 md:gap-10 mb-5 flex-col md:flex-row">
        <h1 className="font-montserrat md:text-xl font-semibold">Balances</h1>
        {/**Fechas de las busquedas */}
        <DateRangePicker
          value={dateRange}
          onChange={(range) => {
            if (range) {
              setDateRange(range);
            }
          }}
          placeholder="Selecciona un rango de fechas"
          block
          shouldDisableDate={(date) => date > new Date()}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-10">
        {balance.map((data, idx) => (
          <div
            key={data.id + "_" + idx}
            className={`flex items-center justify-center gap-4 p-4  flex-col lg:flex-row ${
              balance.length - 1 !== idx
                ? "lg:border-r-2 border-zinc-300 border-b-2 lg:border-b-0 border-r-0 "
                : ""
            }`}
          >
            <div
              className={`min-h-16 min-w-16 md:min-h-20 md:min-w-20 ${data.icon.bgColor} rounded-xl flex  justify-center items-center`}
            >
              <p
                className={`text-3xl md:text-4xl font-bold ${data.icon.color}`}
              >
                {data.icon.img}
              </p>
            </div>
            <div className="">
              <h2 className="text-lg sm:text-xl md:text-2xl">{data.label}</h2>
              <p className="font-bold text-xl sm:text-2xl md:text-3xl text-center lg:text-start">
                {data.value}
                {data.id === "payments" && "€"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Balances;
