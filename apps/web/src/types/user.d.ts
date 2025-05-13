export type FormOptionInputCreateUser = {
    id: number | string;
    name: string;
    desc?: string;
    hidden: boolean;
};

export type FormInputCreateUser = {
    name:string; //<-- nombre real del campo en base de datos
    label: string;
    type: string;
    hidden:boolean;
    multiple?: boolean;
    steps?: string;
    max?: string;
    min?: string;
    dynamicKey?:DinamicKeyFormCreateUser;
    option?: FormOptionInputCreateUser[];
    required?: boolean;
    helperText?: string;
    errorText?: string;
};

export type FormCreateUser = {
    table:string;//<-- nombre real de la tabla en base de datos
    title: string;
    inputs: FormInputCreateUser[];
};

type DinamicKeyFormCreateUser = 'rol'| 'bonus' | 'deduction'  //podria generar mas, mas adelante
