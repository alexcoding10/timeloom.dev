"use client";

import React, { useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../Loading";
import { Table } from "rsuite";
import { DeductionContext } from "@/context/DeductionContext";
import { motion, AnimatePresence } from "framer-motion";
import { Deduction } from "@/types/deductions";
import ConfirmDeleteView from "../ConfirmDeleteView";

const { Column, HeaderCell, Cell } = Table;

export default function DeductionTable() {
  const context = useContext(DeductionContext);
  const [openDeleteDeducction, setOpenDeleteDeduction] = useState(false);
  const [rowSelected, setRowSelected] = useState<Deduction | null>(null);

  if (!context) {
    // Si no está envuelto en el provider, se puede manejar un error o retornar null
    return <div>Error: Contexto no disponible</div>;
  }

  const { deductions, loading , removeDeduction} = context;

  const handleDelete = (rowData: any) => {
    //buscar fila que queremos borrar
    const rowDelete = deductions
      .filter((items) => items.id === rowData.id && items.companyId)
      .flat();

    //seteamos el Row
    setRowSelected(rowDelete[0]);
    //abrimos la view de confirmacion
    setOpenDeleteDeduction(true);
  };

  const handleCloseDeletedView = () => {
    //eliminamos la seleccion
    setRowSelected(null);
    //cerramos la vista
    setOpenDeleteDeduction(false);
  };

  const handleConfirmDelete = async () => {
    if (!rowSelected?.id) return;
  
    try {
      removeDeduction(rowSelected.id) // esto va a eliminar la fila en el back y en el front
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseDeletedView(); // cerrar la vista modal o similar
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  return (
    <AnimatePresence mode="wait">
      {openDeleteDeducction && rowSelected? (
               <ConfirmDeleteView
                 name={rowSelected.name}
                 itemLabel="deduccion"
                 highlightColorClass="text-blue-600"
                 onConfirm={handleConfirmDelete}
                 onCancel={handleCloseDeletedView}
               />
      ) : (
        <motion.div
          key={"table-view"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Table height={350} data={deductions}>
            <Column width={200} resizable>
              <HeaderCell>Nombre</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200} resizable>
              <HeaderCell>Descripción</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={100} resizable>
              <HeaderCell>Porcentaje</HeaderCell>
              <Cell>{(rowData: Deduction) => `${rowData.percentage}%`}</Cell>
            </Column>

            <Column width={150} resizable>
              <HeaderCell>Asignables a contratos</HeaderCell>
              <Cell dataKey="type" />
            </Column>
            <Column width={150} resizable>
              <HeaderCell>Eliminar</HeaderCell>
              <Cell style={{ display: "flex", alignContent: "center" }}>
                {(rowData: any) => {
                  return rowData.companyId ? (
                    <button
                      onClick={() => handleDelete(rowData)}
                      className="bg-zinc-300 text-zinc-500  hover:bg-zinc-400 hover:text-zinc-300 px-3 py-1 rounded-full text-md font-medium flex justify-center items-center "
                    >
                      <MdDeleteOutline />
                    </button>
                  ) : (
                    <div
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium text-center"
                    title="Esta deducción no puede eliminarse"
                  >
                    No eliminable
                  </div>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
