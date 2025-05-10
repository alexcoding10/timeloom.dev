import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  user: any;
}

export default function CompanyForm({ user }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    lat: "",
    lng: "",
    companyPhoto: null as File | null, 
  });

  const [step, setStep] = useState(1); // Controla el paso actual del formulario

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, companyPhoto: file });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes guardar los datos y redirigir a la configuración de la compañía
    // Podrías usar un hook o redirigir a una nueva página para completar la configuración
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1 className="font-montserrat font-medium text-3xl text-neutral-dark-500">
        Crea tu compañia
      </h1>

      {formData.companyPhoto && (
        <div className="flex justify-center mt-4">
          <img
            src={URL.createObjectURL(formData.companyPhoto)}
            alt="Foto de la compañía"
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
          />
        </div>
      )}
      {/* Nombre de la compañía */}
      <div>
        <label className="text-gray-600 font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Correo Electrónico */}
      <div>
        <label className="text-gray-600 font-medium">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Paso 1: Dirección */}
      {step === 2 && (
        <div>
          <label className="text-gray-600 font-medium">Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Paso 2: Coordenadas */}
      {step === 3 && (
        <div className="flex gap-4">
          <div>
            <label className="text-gray-600 font-medium">Latitud</label>
            <input
              type="number"
              name="lat"
              value={formData.lat}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Longitud</label>
            <input
              type="number"
              name="lng"
              value={formData.lng}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      )}

      {/* Paso 3: Foto de la compañía */}
      {step === 1 && (
        <div>
          <label className="text-gray-600 font-medium">Foto de la Compañía</label>
          <input
            type="file"
            name="companyPhoto"
            onChange={handleFileChange}
            className=" w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Botones para navegar entre los pasos */}
      <div className="flex gap-4 mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Atrás
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Siguiente
          </button>
        ) : (
          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Crear Compañía
          </motion.button>
        )}
      </div>
    </form>
  );
}
