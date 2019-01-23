import { Validator } from "./../forms/forms";

export const minstringvalidator = new Validator((value, error = "El elemento debe tener más de 3 caracteres.") => {
    if (value.length > 3) {
        return false;
    }
    return error;
});

export const startWithJJ = new Validator((value, error = "El elemento debe empezar por jj.") => {
    if (/^jj/.test(value)) {
        return false;
    }
    return error;
});

export const maxstringvalidator = new Validator((value, error = "El elemento debe tener menos de 10 caracteres.") => {
    if (value.length < 10) {
        return false;
    }
    return error;
});

export const more18age = new Validator((value, error = "La edad minima es de 18 años.") => {
    if (value > 17) {
        return false;
    }
    return error;
});