import { useAuthContext } from "@/context/AuthContext";
import { BonusContext } from "@/context/BonusContext";
import { Bonus, BonusFormValues, FormCreateBonusProps } from "@/types/bonus";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "rsuite";

export default function FormCreateBonus({
  onClose = () => {},
}: FormCreateBonusProps) {

  const context = useContext(BonusContext)

  const { user } = useAuthContext();

  if (!context) {
    // Si no está envuelto en el provider, se puede manejar un error o retornar null
    return <div>Error: Contexto no disponible</div>;
  }

  const { addBonus } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BonusFormValues>();

  const onSubmit = (data: BonusFormValues) => {
    const newData: Bonus = {
      ...data,
      percentage: parseFloat(data.percentage.toString()),
      companyId: user?.companyId,
    };
  
    // Aquí deberías hacer la petición al backend para guardar el bonus
    addBonus(newData)
    onClose(); // Cierra el modal o el formulario
  };

  return (
    <div>
      <Modal.Header>
        <h1 className="text-xl font-semibold font-montserrat">
          Crear nuevo Bonus
        </h1>
      </Modal.Header>

      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <div>
            <label className="block">Nombre</label>
            <input
              {...register("name", { required: "Nombre requerido" })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block">Porcentaje</label>
            <input
              type="number"
              step="0.01"
              {...register("percentage", {
                required: "Porcentaje requerido",
                min: 0,
              })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 px-3 py-2"
            />
            {errors.percentage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.percentage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block">Descripción</label>
            <textarea
              {...register("description", {
                required: "Descripción requerida",
              })}
              className="w-full border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 px-3 py-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
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
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Guardar Bono
            </button>
          </div>
        </form>
      </Modal.Body>
    </div>
  );
}
