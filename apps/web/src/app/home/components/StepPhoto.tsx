import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  image : string | null,
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  viewImage:string,
  handleSetViewImage:(event: React.ChangeEvent<HTMLInputElement>) => void
}

function StepPhoto({image,handleImageChange,viewImage,handleSetViewImage}:Props) {
  


  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-sm lg:text-lg"
    >
      <h1 className="text-gray-600 font-medium">
        ¿Quieres agregar un foto de perfil para la empresa?
      </h1>
      <div className="flex flex-col items-start gap-4 my-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="si"
            checked={viewImage === "si"}
            onChange={handleSetViewImage}
            className="w-5 h-5"
          />
          Sí, quiero agregar una foto 📸
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="no"
            checked={viewImage === "no"}
            onChange={handleSetViewImage}
            className="w-5 h-5"
          />
          No, prefiero dejarlo así ❌
        </label>
      </div>

      {viewImage === "si" && (
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-lg  mt-6">
          <label className="cursor-pointer flex flex-col items-center justify-center w-full py-2 border-2 border-dashed border-gray-400 rounded-lg bg-white hover:bg-gray-200 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              />
              {image && (
                <div className="flex flex-col items-center mb-2 ">
                  <img
                    src={image}
                    alt="Vista previa"
                    className="w-40 h-40 object-cover rounded-full border border-neutral-300"
                  />
                </div>
              )}
            <span className="text-gray-500">📷 Selecciona una imagen</span>
          </label>
        </motion.div>
      )}
    </motion.div>
  );
}

export default StepPhoto;
