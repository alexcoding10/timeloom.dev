import { Bonus } from "@/types/bonus";
import { Deduction } from "@/types/deductions";
import { useMemo, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Select from "react-select";

type SectionItem = {
  id?: number;
  name: string;
  percentage: number;
  type?: string
};

type SectionListProps = {
  title: string;
  items: SectionItem[];
  emptyMessage: string;
  color: "green" | "red";
  allItems?: Bonus[] | Deduction[];
  typeContract: string
  editable?: Boolean
};

const SectionListWhitAdd = ({
  title,
  items,
  emptyMessage,
  color,
  allItems,
  typeContract,
  editable = true
}: SectionListProps) => {
  const bgColor = color === "green" ? "bg-green-200" : "bg-red-200";
  const textColor = color === "green" ? "text-green-700" : "text-red-700";
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.percentage, 0);
  }, [items]);

  const [add, setAdd] = useState(true);
  const handlerAddToggle = () => {
    setAdd(!add);
  };

  return (
    <div className=" w-full lg:w-[60%] mx-auto mt-5">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xs lg:text-lg text-neutral-dark-400 font-semibold">
            {title}
          </h2>
          <p className={textColor}>
            {color === "green" ? "↑ " : "↓ "}
            {total.toFixed(2)}%
          </p>
        </div>
        {
          editable && (
            <button
              title={add ? "Editar" : "Guardar"}
              onClick={handlerAddToggle}
              className={`${add ? "bg-lime-100 text-lime-700" : "bg-blue-100 text-blue-700"} rounded-full p-2 flex items-center justify-center cursor-pointer transition-all `}
            >
              {add ? <TbEdit /> : <IoCloudUploadOutline />}
            </button>

          )
        }
      </div>
      <hr className='text-zinc-300' />
      <div className="mt-5 w-full lg:w-[60%] mx-auto">
        {!add ? (
          <Select
            isMulti
            options={allItems?.filter(opt => opt.type === 'ALL' || opt.type === typeContract)
              .map((opt) => ({
                value: opt.id ? opt.id : -1,
                label: opt.name,
              }))}
            value={items.map((opt) => ({
              value: opt.id,
              label: opt.name,
            }))}
            placeholder="Seleccionar"
          />
        ) : items.length === 0 ? (
          <p className="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-lg text-center">
            {emptyMessage}
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className={`${bgColor} ${textColor} px-4 py-2 rounded-lg flex justify-between mb-2`}
            >
              <p>{item.name}</p>
              <p>{item.percentage}%</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionListWhitAdd;
