import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  heightAuto?:boolean
}

export default function Container({ children ,heightAuto=false}:Props) {
  return (
  <div className={`flex flex-col items-center gap-2 rounded-3xl border-2 border-zinc-200 shadow-md  py-4 ${heightAuto? 'h-auto' : 'h-full overflow-y-auto'} `}>
        {children}
    </div>
  );
}
