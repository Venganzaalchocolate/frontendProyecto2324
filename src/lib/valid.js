export const validEmail = (email) => {
  // Expresión regular para validar una dirección de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verificar si el correo electrónico coincide con la expresión regular
  return emailRegex.test(email);
};

export const validPassword = (pass) => {
  if (pass == undefined) return false
  // Verificar si la contraseña tiene al menos 8 caracteres
  if (pass.length < 8) {
    return false;
  }

  // Verificar si la contraseña contiene al menos una letra minúscula
  if (!/[a-z]/.test(pass)) {
    return false;
  }
  // Verificar si la contraseña contiene al menos una letra mayúscula
  if (!/[A-Z]/.test(pass)) {
    return false;
  }
  // Verificar si la contraseña contiene al menos un número
  if (!/\d/.test(pass)) {
    return false;
  }
  // Verificar si la contraseña contiene al menos un carácter especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
    return false;
  }
  // La contraseña cumple con todos los criterios
  return true;
};

export const validText=(texto, longitudMinima, longitudMaxima, numerosycaracteresespeciales=false)=>{
  // Verificar la longitud del texto
  if (texto.length < longitudMinima || texto.length > longitudMaxima) {
      return false;
  }

  // Definir la expresión regular para caracteres permitidos (letras, números y espacios)
  const regex =(numerosycaracteresespeciales) ?/^[a-zA-ZÀ-ÿ0-9\s,º:/()]+$/:/^[a-zA-ZÀ-ÿ\s]+$/;
  return regex.test(texto);
}

export const validPasswordRepeat=(str1,str2)=>{
  return str1 === str2;
}
