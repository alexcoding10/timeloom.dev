import { ContractType } from "@/types/contract";

export type CreateUserData = {
    user:{
        name:string,
        email:string,
        password:string,
        globalRol:{
            create:[
                {
                 rol:{connect:{id:number}}   
                }
            ]
        },
        company:{connect:{id:number}},
        office: { connect: { id: number } },
    },
    contract:{
        startDate:Date,
        endDate?:Date,
        salaryHours:number,
        job:string,
        type:ContractType,
        hoursForWeek:number,
        irpf_percentage:number,
        bonuses?:{connect:{id:number}[]},
        deductions:{connect:{id:number}[]},
    }
}