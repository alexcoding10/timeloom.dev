"use client";

import FormCreateDeduction from "@/components/form/FormCreateDeduction";
import DeductionTable from "@/components/tables/DeductionTable";
import { DeductionProvaider } from "@/context/DeductionContext";
import { useNav } from "@/hooks/useNav";

import React, { useContext, useState } from "react";
import { Modal } from "rsuite";

export default function Deductions() {
  const {collapsed} = useNav()
  const [openNewDeduction, setOpenNewDeduction] = useState(false);
  const handlerOpenNewDeduction = () => setOpenNewDeduction(true);
  const handlerCloseNewDeduction = () => setOpenNewDeduction(false);
  return (
    <DeductionProvaider>
      <div className="rounded-3xl border-2 border-zinc-200 shadow-md p-10">
        <div className={`${collapsed ? '': 'flex-col'}flex gap-2 md:gap-10 mb-5 flex-col md:flex-row items-center`}>
          <h1 className="font-montserrat md:text-xl font-semibold">
            Deducciones de contratos
          </h1>
          <button
            onClick={handlerOpenNewDeduction}
            className="bg-secondary-500 hover:bg-secondary-300 text-white px-4 py-2 rounded-lg"
          >
            ＋ Crear deducion
          </button>
        </div>
        <Modal open={openNewDeduction} onClose={handlerCloseNewDeduction} >
          <FormCreateDeduction  onClose={handlerCloseNewDeduction}/>
        </Modal>
        {/**Tablas de deducciones */}
        <DeductionTable />
      </div>
    </DeductionProvaider>
  );
}
