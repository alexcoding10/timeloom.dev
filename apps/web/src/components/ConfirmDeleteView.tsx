import { motion } from "framer-motion";

type ConfirmDeleteViewProps = {
  name: string;
  itemLabel?: string; // "el bono", "la deducción", etc.
  highlightColorClass?: string; // clase para el texto destacado (ej. "text-green-600")
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDeleteView({
  name,
  itemLabel = "el elemento",
  highlightColorClass = "text-green-600",
  onConfirm,
  onCancel,
}: ConfirmDeleteViewProps) {
  return (
    <motion.div
      key="deleted-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-5 p-4 bg-white shadow-md rounded-md"
    >
      <p className="text-base">
        ¿Seguro que quieres eliminar {itemLabel}{" "}
        <span className={`${highlightColorClass} font-semibold`}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
        ?
      </p>
      <div className="flex gap-4 mt-2">
        <button
          className="flex items-center gap-2 rounded-md bg-success-400 hover:bg-success-700 hover:text-white text-green-900 px-4 py-2 text-sm font-medium transition"
          onClick={onConfirm}
        >
          ✅ Sí, eliminar
        </button>
        <button
          className="flex items-center gap-2 rounded-md bg-zinc-300 hover:bg-zinc-600 hover:text-white text-zinc-500 px-4 py-2 text-sm font-medium transition"
          onClick={onCancel}
        >
          ❌ Cancelar
        </button>
      </div>
    </motion.div>
  );
}
