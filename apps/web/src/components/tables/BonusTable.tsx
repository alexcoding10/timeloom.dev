"use client";

import React, { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../Loading";
import { Table } from "rsuite";
import { motion, AnimatePresence } from "framer-motion";
import { BonusContext } from "@/context/BonusContext";
import { Bonus, FormCreateBonusProps } from "@/types/bonus";
import ConfirmDeleteView from "../ConfirmDeleteView";

const { Column, HeaderCell, Cell } = Table;

export default function BonusTable({onClose,onOpen}:FormCreateBonusProps) {
  const context = useContext(BonusContext);
  const [openDeleteView, setOpenDeleteView] = useState(false);
  const [rowSelected, setRowSelected] = useState<Bonus | null>(null);

  if (!context) return <div>Error: Contexto no disponible</div>;
  const { bonus, loading, removeBonus } = context;

  const handleDelete = (rowData: Bonus) => {
    setRowSelected(rowData);
    setOpenDeleteView(true);
  };

  const handleConfirmDelete = () => {
    if (rowSelected?.id) {
      removeBonus(rowSelected.id);
    }
    handleCloseDeletedView();
  };

  const handleCloseDeletedView = () => {
    setRowSelected(null);
    setOpenDeleteView(false);
  };

  if (loading) return <Loading />;

  if(bonus.length === 0 ){
    return(
        <p>No tienes bonus actualmente, <span className="cursor-pointer text-green-500" onClick={onOpen}>crea un bonus ahora.</span></p>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {openDeleteView && rowSelected ? (
        <ConfirmDeleteView
          name={rowSelected.name}
          itemLabel="el bono"
          highlightColorClass="text-green-600"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeletedView}
        />
      ) : (
        <motion.div
          key="table-view"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <Table height={350} data={bonus} autoHeight>
            <Column width={200} resizable>
              <HeaderCell>Nombre</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200} resizable>
              <HeaderCell>Descripción</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={120} resizable>
              <HeaderCell>Porcentaje</HeaderCell>
              <Cell>{(rowData: Bonus) => `${rowData.percentage}%`}</Cell>
            </Column>

            <Column width={150} resizable>
              <HeaderCell>Eliminar</HeaderCell>
              <Cell>
                {(rowData: Bonus) => (
                  <button
                    onClick={() => handleDelete(rowData)}
                    className="bg-zinc-300 text-zinc-700 hover:bg-zinc-400 hover:text-white p-2 rounded flex justify-center items-center"
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </Cell>
            </Column>
          </Table>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
