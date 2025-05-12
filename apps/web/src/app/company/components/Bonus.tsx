"use client";

import FormCreateBonus from "@/components/form/FormCreateBonus";
import BonusTable from "@/components/tables/BonusTable";
import { BonusProvaider } from "@/context/BonusContext";
import React, { useState } from "react";
import { Modal } from "rsuite";

export default function Bonus() {
  const [openNewBonus, setOpenNewBonus] = useState(false);
  const handlerOpenNewBonus = () => setOpenNewBonus(true);
  const handlerCloseNewBonus = () => setOpenNewBonus(false);
  return (
    <BonusProvaider>
      <div className="rounded-3xl border-2 border-zinc-200 shadow-md p-10">
        <div className="flex gap-2 md:gap-10 mb-5 flex-col md:flex-row items-center">
          <h1 className="font-montserrat md:text-xl font-semibold">
            Bonus de contratos
          </h1>
          <button
            onClick={handlerOpenNewBonus}
            className="bg-green-400 hover:bg-green-300  px-4 py-2 rounded-lg"
          >
            ＋ Crear bonus
          </button>
        </div>
        <Modal open={openNewBonus} onClose={handlerCloseNewBonus}>
          <FormCreateBonus onClose={handlerCloseNewBonus} />
        </Modal>
        <BonusTable onOpen={handlerOpenNewBonus}/>
      </div>
    </BonusProvaider>
  );
}
