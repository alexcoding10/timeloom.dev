import { HiOutlineClock } from "react-icons/hi";
import { LuClockAlert, LuAlarmClockCheck } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoCheckmark } from "react-icons/io5";


export default function Welcome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-9 justify-center items-center p-20 h-full md:h-screen  w-full bg-radial from-light-blue-200 from-40% to-secondary-400  place-items-center">
      <div className="flex flex-col  gap-6  p-1 md:p-20  justify-center items-center max-w-[600px]">
        <h1 className="font-montserrat font-bold text-neutral-dark-500 text-3xl  sm:text-4xl lg:text-5xl">
          Optimiza tu jornada laboral con TimeLoom
        </h1>
        <p className="font-montserrat text-black text-xl  sm:text-2xl lg:text-3xl">
          La mejor herramienta para gestionar tu horario de trabajo de manera
          eficiente y sin esfuerzo.
        </p>
        <a
          href="/login"
          className="font-montserrat text-center text-nowrap text-xl sm:text-2xl lg:text-3xl p-5 bg-secondary-500 text-white rounded-3xl "
        >
          Comienza Gratis
        </a>
      </div>

      <div className="bg-white flex flex-col  gap-6  p-4 md:p-10  justify-center items-center w-full max-w-[600px] rounded-3xl">

        <div className="border-b border-b-neutral-400 flex flex-col items-center md:flex-row md:items-start gap-5 w-full pb-5">
          <div className="w-20 h-20 rounded-2xl bg-secondary-300 text-secondary-600 flex justify-center items-center text-5xl">
             <HiOutlineClock/>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Tiempo trabajado</p>
            <p className="text-3xl font-bold text-neutral-dark-400">0h 00m</p>
          </div>
        </div>

        <div className="border-b border-b-neutral-400 flex flex-col items-center md:flex-row md:items-start gap-5 w-full pb-5">
          <div className="w-20 h-20 rounded-2xl bg-warning-400 text-accent-primary-600 flex justify-center items-center text-5xl">
            <LuClockAlert/>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Tiempo pausado</p>
            <p className="text-3xl font-bold text-neutral-dark-400">0h 00m</p>
          </div>
        </div>

        <div className="border-b border-b-neutral-400 flex flex-col items-center md:flex-row md:items-start gap-5 w-full pb-5 ">
          <div className="w-20 h-20 rounded-2xl bg-accent-tertiary-400 flex justify-center items-center text-5xl text-accent-tertiary-600">
            <LuAlarmClockCheck/>
          </div>
          <div className="flex flex-col">
            <p className="text-xl">Hora de salida esperada</p>
            <p className="text-3xl font-bold text-neutral-dark-400">18h 00m</p>
          </div>
        </div>
        
        <div className="border-b border-b-neutral-400 flex flex-col items-center md:flex-row md:items-start gap-10 w-full pb-5 justify-center">
          <div className="w-20 h-20 rounded-2xl bg-neutral-300 flex justify-center items-center text-5xl ">
            <CgPlayButtonO/>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-primary-400 flex justify-center items-center text-5xl text-[#9B0505]">
            <FaRegCirclePause/>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-neutral-300 flex justify-center items-center text-5xl">
            <GiAnticlockwiseRotation/>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-success-400 flex justify-center items-center text-5xl text-success-700">
            <IoCheckmark/>
          </div>
        </div>

      </div>
    </div>
  );
}
