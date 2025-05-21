import { Col } from "@/hooks/useChartPause";
import { GetPauses } from "@/types/signings";
import { formatDate } from "@/utils/utils";
import React, { useEffect } from "react";

interface Props {
  colSelected: Col;
}

export default function ChartInfo({ colSelected }: Props) {

    useEffect(()=>{
        console.log(colSelected)
    },[colSelected])
  return (
  <div>
    <h1 className="font-montserrat font-semibold">{colSelected.day}</h1>
  </div>
);
}
