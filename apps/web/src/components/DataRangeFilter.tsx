'use client'

import { useState } from "react";
import dayjs from "dayjs";

export default function DateRangeFilter() {
  // 30 días atrás desde hoy
  const today = dayjs();
  const thirtyDaysAgo = today.subtract(30, 'day').format('YYYY-MM-DD');

  // Estado
  const [toDate, setToDate] = useState(today.format('YYYY-MM-DD'));
  const [fromDate, setFromDate] = useState(thirtyDaysAgo);

  return (
    <div className="flex gap-10 py-4">
      <div className="flex gap-3 items-center">
        <p>Desde</p>
        <input
          type="date"
          value={fromDate}
          max={toDate} // no se puede seleccionar una fecha después del "Hasta"
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex gap-3 items-center">
        <p>Hasta</p>
        <input
          type="date"
          value={toDate}
          min={fromDate} // no se puede seleccionar una fecha antes del "Desde"
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
