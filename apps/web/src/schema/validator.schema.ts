import {z} from 'zod'


export const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  name: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(25, "El nombre debe tener como máximo 25 caracteres"),
  password: z.string()
    .min(8, "Debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[\W_]/, "Debe contener al menos un símbolo (!@#$%^&*)"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Asigna el error al campo correcto
});

