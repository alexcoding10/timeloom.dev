"use client";

import React from "react";

import Container from "../Container";
import { useSigningsContext } from "@/context/SigningsContext";


export default function ControlSignings() {
 
    const{controlData,onClickControl} = useSigningsContext()

  return (
    <Container>
      <ul className="flex flex-col gap-2 ">
        {controlData.info.map(
          ({
            name,
            title,
            icon: { icon: Icon, bgColor, color },
            hour: { h, m, s },
          }) => (
            <li
              key={name}
              className="flex gap-3 sm:gap-5 rounded-lg items-center border-b border-b-zinc-200 py-2 px-4  hover:bg-zinc-100 transition-all"
            >
              <div className={`${bgColor} ${color} p-2 rounded-lg`}>
                <Icon size={48} />
              </div>
              <div>
                <h1 className="font-montserrat text-base sm:text-xl text-neutral-dark-400">
                  {title}
                </h1>
                <p className="text-lg sm:text-2xl font-bold font-montserrat text-neutral-dark-400">
                  {h}h {m}m {s}s
                </p>
              </div>
            </li>
          )
        )}
        <li
          key={"controls"}
          className="flex  gap-3 sm:gap-5 rounded-lg items-center border-b border-b-zinc-200 py-2 px-4  hover:bg-zinc-100 transition-all"
        >
          {controlData.controls.map(
            ({
              name,
              icon: { icon: Icon, bgColor, color },
              title,
              disabled,
              hidden,
            }) => (
              <div
                key={name}
                className="flex flex-col justify-center items-center gap-1 "
              >
                <div
                  onClick={()=>onClickControl(name)}
                  className={`${disabled ? 'bg-zinc-300 text-zinc-400' : `${bgColor} ${color}`}  p-2 rounded-lg cursor-pointer transition-all ease-in duration-100`}
                >
                  <Icon size={48} />
                </div>
                <p>{title}</p>
              </div>
            )
          )}
        </li>
      </ul>
    </Container>
  );
}
