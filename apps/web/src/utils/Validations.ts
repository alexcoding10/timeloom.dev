
//valida un minimo de logintud de una cadena
export const validateMinLength = (data: string, minLeng: number):boolean => {
  return data.length >= minLeng
};

//valdia almenos una letra mayuscula
export const validateMinUppercase = (data: string, minUppercase: number): boolean => {
    const uppercaseCount = data.split("").filter(char => char >= 'A' && char <= 'Z').length;
    return uppercaseCount >= minUppercase;
};

