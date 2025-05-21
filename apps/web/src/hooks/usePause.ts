import Signings from "@/app/signings/page";
import { useAuthContext } from "@/context/AuthContext";
import { GetPauses, TimeBreak } from "@/types/signings";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useRef, useState } from "react";



export const usePause = (numberDays: number) => {
  const { user } = useAuthContext();
  const [pauses, setPauses] = useState<GetPauses | null>(null);
  const today = useRef(new Date());
  const from = useRef(new Date());

  const getPauses = async () => {
    const fromDate = from.current.toISOString();  // formatear 'from'
    const toDate = today.current.toISOString();   // formatear 'to'

    const response = await fetch(`${URL_BACKEND_DEV}/signings/user/${user.id}?from=${fromDate}&to=${toDate}`);

    if (!response.ok) {
      throw new Error("No se han podido obtener las pausas");
    }
    const data = await response.json();
    setPauses(data.map((signings: any)=>({day:signings.clockIn ,timebreaks : signings.timebreaks})));
  };

  useEffect(() => {
    from.current.setDate(from.current.getDate() - numberDays); // actualiza el 'from'

    // hace la petición
    getPauses();
  }, [numberDays]);
  useEffect(()=>{
    console.log(pauses)
  },[pauses])

  return { pauses };
};
