export function generarPasswordSegura(longitud = 12) {
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#%&*_-+=";
  
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
  