import { IconType } from "react-icons"

export type ControlSigningsType = {
    info: 
        {
            icon: {
                bgColor: string,
                color: string,
                icon: IconType
            },
            title: string,
            hour: {
                h: number,
                m: number,
                s: number,
            }
        }[],
    controls:
        {
            disabled:boolean,
            hidden:boolean,
            icon:{
                bgColor:string,
                color:string,
                icon:IconType
            },
            title:string,
            action:()=>void
        }[]
    
}