import { Validator } from "../forms/Validator";

export const minstringvalidator = new Validator(value => {
  const error = "El elemento debe tener más de 3 caracteres.";
  if (value && value.length > 3) {
    return false;
  }
  return error;
});

export const startWithJJ = new Validator(value => {
  const error = "El elemento debe empezar por jj.";
  if (value && /^jj/.test(value)) {
    return false;
  }
  return error;
});

export const maxstringvalidator = new Validator(value => {
  const error = "El elemento debe tener menos de 10 caracteres.";
  if (value && value.length < 10) {
    return false;
  }
  return error;
});

export const more18age = new Validator(value => {
  const error = "La edad minima es de 18 años.";
  if (value && value > 17) {
    return false;
  }
  return error;
});

export const moreAgeEqual = new Validator((value, formElements) => {
  const error = "LA EDAD NO COINCIDE.";
  if (value && value === formElements.age.value) {
    return false;
  }
  return error;
});

export const emailValidator = new Validator(value => {
  const error = "Email invalido";
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && emailPattern.test(String(value).toLowerCase())) {
    return false;
  }
  return error;
});

export const equalValidatorEmail = new Validator((value, formElements) => {
  const error = "EL EMAIL NO COINCIDE.";
  if (value && value === formElements.email.value) {
    return false;
  }
  return error;
});

export const checkIfTrue = new Validator(value => {
  const error = "Debes aceptar la política de privacidad.";
  if (value) {
    return false;
  }
  return error;
});
