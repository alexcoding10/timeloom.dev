import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border-2 border-zinc-200 shadow-md h-full  py-4">
        {children}
    </div>
  );
}
