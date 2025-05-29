import { Contract } from "@/types/user";
import React, { useState } from "react";
import ContainerCards from "./ContainerCards";
import { TbEdit } from "react-icons/tb";
import { IoCloudUploadOutline } from "react-icons/io5";
import { formatDate, formatTypeContract } from "@/utils/utils";
import Field from "../Field";
import { TypeContract } from "@/types/forms";
import SectionListWhitAdd from "../SectionListWhitAdd";
import { useBonus } from "@/hooks/useBonus";
import { useGetDeductions } from "@/hooks/useGetDeductions";

interface Props {
  contract: Contract;
}

export default function ContractCard({ contract }: Props) {
  //buscar los bonus y las deducciones de la base de datos
  const { bonus } = useBonus();
  const { deductions } = useGetDeductions();

  const [isEditable, setIsEditable] = useState(false);
  const handlerToggleEditable = () => {
    setIsEditable(!isEditable);
  };
  const dateStart = formatDate(contract.startDate, "dd/mm/yyyy");
  const endStart =
    contract.endDate != null
      ? formatDate(contract.endDate, "dd/mm/yyyy")
      : null;
  const typeContract = formatTypeContract(contract.type as TypeContract);

  return (
    <ContainerCards>
      <div className="flex w-full flex-col">
        <div className="w-full text-start flex justify-between">
          <h1 className="font-montserrat text-2xl font-semibold">Contrato</h1>
          <button
            onClick={handlerToggleEditable}
            className={`cursor-pointer px-4 py-2 rounded-lg flex gap-2 items-center transition-all ease-in ${!isEditable ? "bg-lime-100 text-lime-800" : "bg-blue-100 text-blue-800"} `}
          >
            {!isEditable ? (
              <>
                <TbEdit />
                Editar
              </>
            ) : (
              <>
                <IoCloudUploadOutline />
                Guardar
              </>
            )}
          </button>
        </div>
        <div className="grid  md:grid-cols-2 gap-3  w-[60%] mx-auto">
          <Field
            typeInput="text"
            label={"Puesto de Trabajo"}
            editable={isEditable}
            value={contract.job}
          />
          <Field
            typeInput="text"
            label={"Tipo de contrato"}
            editable={isEditable}
            value={typeContract}
          />

          <Field
            typeInput="date"
            label={"Fecha de Inicio"}
            editable={false}
            value={dateStart}
          />
          {endStart && (
            <Field
              typeInput="date"
              label={"Fecha de Fin"}
              editable={isEditable}
              value={endStart}
            />
          )}

          <Field
            typeInput="number"
            label={"Horas por semana"}
            editable={isEditable}
            value={contract.hoursForWeek}
          />
          <Field
            typeInput="number"
            label={"Salario por hora (€)"}
            editable={isEditable}
            value={contract.salaryHours}
          />
          <Field
            typeInput="number"
            label={"IRPF (%)"}
            editable={isEditable}
            value={contract.irpf_percentage}
          />
        </div>
        <SectionListWhitAdd
          title="Bonus"
          items={contract.bonuses || []}
          emptyMessage="No tiene ningun bonus"
          color="green"
          allItems={bonus}
          typeContract={contract.type}
        />

        <SectionListWhitAdd
          title="Deducciones"
          items={contract.deductions || []}
          emptyMessage="No tiene ningun deducciones"
          color="red"
          allItems={deductions}
          typeContract={contract.type}
        />
      </div>
    </ContainerCards>
  );
}
