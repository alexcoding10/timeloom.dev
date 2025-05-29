import { RolName } from "./rol";

export type FormOptionInputCreateUser = {
    id: number | string;
    name: string;
    desc?: string;
    hidden: boolean;
};

export type FormInputCreateUser = {
    name: string; //<-- nombre real del campo en base de datos
    label: string;
    type: string;
    hidden: boolean;
    multiple?: boolean;
    steps?: string;
    max?: string;
    min?: string;
    dynamicKey?: DinamicKeyFormCreateUser;
    option?: FormOptionInputCreateUser[];
    required?: boolean;
    helperText?: string;
    errorText?: string;
};

export type FormCreateUser = {
    table: string;//<-- nombre real de la tabla en base de datos
    title: string;
    inputs: FormInputCreateUser[];
};

type DinamicKeyFormCreateUser = 'rol' | 'bonus' | 'deduction'  //podria generar mas, mas adelante


export type UserAuth = {
    id: number;
    companyId: number;
    officeId: number;
    name: string;
    email: string;
    address: string | null;
    zipCode: string | null;
    imgProfile: string | null;
    company: {
        id: number;
        name: string;
        email: string;
        address: string;
        zipCode: string | null;
        logoUrl: string;
        coordinates: {
            lat: number;
            lon: number;
        };
    };
    globalRol: Array<{
        id: number;
        rol: {
            name: string;
        };
    }>;
};


export type UserControl = {
  id: number;
  name: string;
  email: string;
  imgProfile: string | null;
  address: string | null;
  zipCode: string | null;
  globalRol: {
    name: RolName;
  }[];
};


type User = {
  id: number;
  companyId: number;
  officeId: number;
  name: string;
  email: string;
  address: string | null;
  zipCode: string | null;
  imgProfile: string | null;
  globalRol: GlobalRol[];
  incidents: any[]; // Ajusta si tienes el tipo real
  contract: Contract[];
  timeEntries: TimeEntry[];
  office: Office;
  company: Company;
};

type GlobalRol = {
  id: number;
  userId: number;
  rolId: number;
};

type Contract = {
  id: number;
  userId: number;
  startDate: string; // ISO 8601 format
  endDate: string | null;
  salaryHours: number;
  hoursForWeek: number;
  job: string;
  irpf_percentage: number;
  type: "FIXED" | string; // puedes usar un union más completo si hay más tipos
};

type TimeEntry = {
  id: number;
  userId: number;
  clockIn: string;
  clockOut: string | null;
  duration: number | null;
  coordinates: Coordinates;
  timebreaks: TimeBreak[];
};

type TimeBreak = {
  id: number;
  timeEntryId: number;
  clockIn: string;
  clockOut: string | null;
  duration: number | null;
  coordinates: Coordinates;
  pauseTypeId: number;
  description: string;
};

type Coordinates = {
  lat: number;
  lon: number;
};

type Office = {
  id: number;
  companyId: number;
  name: string;
  email: string;
  address: string;
  zipCode: string;
  state: string;
  coordinates: Coordinates | null;
};

type Company = {
  id: number;
  name: string;
  email: string;
  address: string;
  zipCode: string | null;
  logoUrl: string;
  coordinates: Coordinates;
};
