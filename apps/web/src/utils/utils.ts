import { CreateUserData } from "@/types/forms";
import { UserAuth } from "@/types/user";

export function generarPasswordSegura(longitud = 12) {
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "@$!%*?&_";

  const todos = mayusculas + minusculas + numeros + simbolos;

  let password = "";
  password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  password += minusculas[Math.floor(Math.random() * minusculas.length)];
  password += numeros[Math.floor(Math.random() * numeros.length)];
  password += simbolos[Math.floor(Math.random() * simbolos.length)];

  for (let i = password.length; i < longitud; i++) {
    password += todos[Math.floor(Math.random() * todos.length)];
  }

  // Mezclar los caracteres
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const quitarTildes = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};


export const mapSubmitUser = (data: any, user: UserAuth): CreateUserData => {
  const { User, Contract } = data;
  const requestData: CreateUserData = {
    user: {
      name: User.name,
      email: User.email,
      password: User.password,
      globalRol: {
        create: [{
          rol: {
            connect: {
              id: parseInt(User.globalRol.value)
            }
          }
        }]
      },
      company: {
        connect: {
          id: user.companyId
        }
      },
      office: {
        connect: {
          id: user.officeId
        }
      }
    },
    contract: {
      job: Contract.job,
      type: Contract.type.value,
      startDate: new Date(Contract.startDate),
      endDate: Contract.endDate === "" ? undefined : new Date(Contract.endDate),
      hoursForWeek: parseFloat(Contract.hoursForWeek),
      salaryHours: parseFloat(Contract.salaryHours),
      irpf_percentage: parseFloat(Contract.irpf_percentage),
      bonuses: Contract.bonuses ? { connect: Contract.bonuses.map((bonus: { value: number, label: string }) => ({ id: bonus.value })) } : undefined,
      deductions: { connect: Contract.deductions.map((deduction: { value: number, label: string }) => ({ id: deduction.value })) },
    }
  }
  return requestData;
}

type FormatDate = 'Hh Mm Ss' | 'hh:mm:ss dd/mm/yyyy' | 'hh:mm:ss' | 'dd/mm/yyyy' | 'dd-mm-yyyy' | 'hh:mm'

export const formatDate = (date: string, format?: FormatDate): string => {
  const parsedDate = new Date(date);

  // Obtener las partes de la fecha y hora
  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  const seconds = parsedDate.getSeconds().toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
  const year = parsedDate.getFullYear();

  // Formatear la fecha como hh:mm:ss dd/mm/yyyy
  switch (format) {
    case 'Hh Mm Ss':
      return `${hours}h ${minutes}m ${seconds}s`;
    case 'hh:mm:ss dd/mm/yyyy':
      return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    case 'hh:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'dd-mm-yyyy':
      return `${day}-${month}-${year}`;
    case 'hh:mm':
      return `${hours}:${minutes}`;
    default:
      return `${hours}:${minutes}:${seconds}`; // En caso de un formato no reconocido
  }
}