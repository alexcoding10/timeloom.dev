import React, { Children, ReactNode} from "react";


//Titulos y encabezados
interface Props {
    children:ReactNode;
    textColor?:string;
    textWeight?:string;
}

export const HeadingXL = ({children, textColor,textWeight}: Props) => {
    return (
        <h1 className={`font-montserrat ${textWeight || "font-medium" } text-5xl ${textColor || "text-neutral-dark-500"}`}>
      {children}
    </h1>
    )
  }

  export const TextLG = ({children, textColor,textWeight}: Props) => {
    return (
        <p className={`font-roboto ${textWeight || "font-regular" } text-xl md:text-3xl ${textColor || "text-neutral-dark-500"}`}>
      {children}
    </p>
    )
  }
  export const TextBase = ({children, textColor,textWeight}: Props) => {
    return (
        <p className={`font-roboto ${textWeight || "font-regular" } text-2xl ${textColor || "text-neutral-dark-500"}`}>
      {children}
    </p>
    )
  }
  export const TextSM = ({children, textColor,textWeight}: Props) => {
    return (
        <p className={`font-roboto ${textWeight || "font-regular" } text-base ${textColor || "text-neutral-dark-500"}`}>
      {children}
    </p>
    )
  }
