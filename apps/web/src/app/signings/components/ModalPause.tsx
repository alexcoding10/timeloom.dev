import Loading from "@/components/Loading";
import { useSigningsContext } from "@/context/SigningsContext";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Modal } from "rsuite";
import { PiArrowBendUpRightFill } from "react-icons/pi";
import { CreateTimeBreak } from "@/types/signings";
import { getLocation } from "@/utils/navigator";
import { div } from "framer-motion/client";

export default function ModalPause() {
  const {
    openPauseModal,
    closePauseModal,
    pauseType,
    signings,
    fetchCreatePause,
  } = useSigningsContext();
  const [pauseTypeMap, setPauseTypeMap] = useState<
    { value: number; label: string }[]
  >([]);
  const [pauseTypeSelected, setPauseTypeSelected] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(0);
  const [description, setDescription] = useState("");

  const handlerStartPause = async () => {
    const coordinates = await getLocation();
    //creo el objeto
    const createPause: CreateTimeBreak = {
      description: description,
      clockIn: new Date(),
      timeEntry: { connect: { id: signings?.id ? signings.id : -1 } }, //valor que no hay en la base de datos
      pauseType: {
        connect: { id: pauseTypeSelected ? pauseTypeSelected?.value : -1 },
      }, // valor si falla
      coordinates: coordinates,
    };
    //creo la pausa
    await fetchCreatePause(createPause); // espero y cierro el modal
    closePauseModal();
  };

  useEffect(() => {
    if (pauseType.length === 0) {
      return;
    }
    //mapear para mostar los tipos de pausa
    const mapPause = pauseType.map((pause) => ({
      value: pause.id,
      label: pause.name,
    }));
    setPauseTypeMap(mapPause);
  }, [pauseType]);

  useEffect(() => {
    if (pauseTypeMap.length !== 0) {
      setPauseTypeSelected(pauseTypeMap[0]);
    }
  }, [pauseTypeMap]);

  useEffect(() => {
    if (pauseTypeSelected && loadingRef.current === 0) {
      setLoading(false);
      loadingRef.current += 1;
      return;
    }
  }, [pauseTypeSelected]);

  if (loading) <Loading />;

  return (
    <Modal open={openPauseModal} onClose={closePauseModal}>
      <Modal.Body className="flex  min-h-[300px] flex-col gap-5 p-5 overflow-visible">
        <label>
          <p className="text-neutral-dark-400">Selecciona el tipo de pausa:</p>
          <Select
            options={pauseTypeMap}
            defaultValue={pauseTypeSelected}
            onChange={(e) => setPauseTypeSelected(e)}
            className="w-full"
          />
          <div className="flex items-center gap-2 bg-zinc-100 p-2 rounded-lg mt-2 text-neutral-dark-400">
            {/*Para la info de cada pausa */}
            <PiArrowBendUpRightFill />
            <p>
              {pauseType &&
                pauseType.find((pause) => pause.id === pauseTypeSelected?.value)
                  ?.description}
            </p>
            {pauseType &&
            pauseType.find((pause) => pause.id === pauseTypeSelected?.value)
              ?.isPaid ? (
              <div className="bg-success-400 px-2 rounded-lg text-green-900  ">Pagado</div>
            ) : (
              <div  className="bg-error-400 px-2 rounded-lg text-red-900">No pagado</div>
            )}
          </div>
        </label>

        <label>
          <p className="text-neutral-dark-400">
            Puedes escribir una descripcion:
          </p>
          <textarea
            className="w-full min-h-[150px] border border-zinc-400 rounded-lg focus:outline-blue-500 p-2 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Hoy todo va fenomenal..."
          ></textarea>
        </label>
      </Modal.Body>
      <Modal.Footer className="flex gap-3 justify-end">
        <button
          className="py-2 px-4 rounded-xl bg-secondary-500 hover:bg-secondary-300 text-white"
          onClick={handlerStartPause}
        >
          Guardar Pausa
        </button>

        <button
          className="py-2 px-4 rounded-xl bg-zinc-500  hover:bg-zinc-300 text-white"
          onClick={closePauseModal}
        >
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
