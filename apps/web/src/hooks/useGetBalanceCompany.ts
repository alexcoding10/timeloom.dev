import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useState } from "react";

interface TypeBalance {
  workers: number;
  totalWorkedHours: number;
  totalPayment: number;
}

export const useGetBalanceCompany = (
  companyId: number | null,
  startDate?: string,
  endDate?: string
) => {
  const [balance, setBalance] = useState<TypeBalance | null>(null);

  useEffect(() => {
    if (!companyId) return; // Si no hay companyId, no hacemos fetch

    const fetchData = async () => {
      try {
        // Construir URL con query params usando URLSearchParams
        const params = new URLSearchParams();

        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const queryString = params.toString();
        const url = `${URL_BACKEND_DEV}/company/${companyId}/balance${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    };

    fetchData();
  }, [companyId, startDate, endDate]);

  return { balance };
};
