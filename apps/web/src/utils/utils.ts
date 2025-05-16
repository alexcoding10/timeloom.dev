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