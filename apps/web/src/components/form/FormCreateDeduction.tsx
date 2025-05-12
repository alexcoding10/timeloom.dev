import React, { useContext } from "react";
import { Modal } from "rsuite";
import { useForm } from "react-hook-form";
import { DeductionContext } from "@/context/DeductionContext";
import { useAuthContext } from "@/context/AuthContext";
import { Deduction, DeductionFormValues, FormCreateDeductionProps } from "@/types/deductions";


export default function FormCreateDeduction({
  onClose = () => {},
}: FormCreateDeductionProps) {
  const context = useContext(DeductionContext);
  const { user } = useAuthContext();

  if (!context) {
    // Si no está envuelto en el provider, se puede manejar un error o retornar null
    return <div>Error: Contexto no disponible</div>;
  }

  const { addDeduction } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeductionFormValues>();

  const onSubmit = (data: Deduction) => {
    const newData = {
      ...data,
      percentage: parseFloat(data.percentage.toString()),
      companyId: user.companyId,
    };
    addDeduction(newData);
    //Cierro la
    onClose();
  };

  return (
    <div>
      <Modal.Header>
        <h1 className="text-xl font-semibold font-montserrat">
          Crear nueva deducción
        </h1>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 font-montserrat px-10"
        >
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              {...register("name", { required: "Este campo es requerido" })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 px-3 py-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Porcentaje (%)</label>
            <input
              type="number"
              {...register("percentage", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Mínimo 0%" },
                max: { value: 100, message: "Máximo 100%" },
              })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 px-3 py-2"
            />
            {errors.percentage && (
              <p className="text-sm text-red-500">
                {errors.percentage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">Descripción</label>
            <textarea
              {...register("description")}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Asignables a contratos</label>
            <select
              {...register("type", { required: "Selecciona un tipo" })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 px-3 py-2"
            >
              <option value="ALL">Todos</option>
              <option value="FIXED">Fijos</option>
              <option value="TEMPORARY">Temporeros</option>
            </select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              className="bg-secondary-500 hover:bg-secondary-400 text-white px-4 py-2 rounded"
              type="submit"
            >
              Guardar deducción
            </button>
          </div>
        </form>
      </Modal.Body>
    </div>
  );
}
