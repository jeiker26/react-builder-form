import { Validator } from "./../forms/forms";

export const minstringvalidator = new Validator((ref, error = "El elemento debe tener más de 3 caracteres.") => {
    if (ref.current.value.length > 3) {
        return false;
    }
    return error;
});

export const startWithJJ = new Validator((ref, error = "El elemento debe empezar por jj.") => {
    if (/^jj/.test(ref.current.value)) {
        return false;
    }
    return error;
});

export const maxstringvalidator = new Validator((ref, error = "El elemento debe tener menos de 10 caracteres.") => {
    if (ref.current.value.length < 10) {
        return false;
    }
    return error;
});

export const more18age = new Validator((ref, error = "La edad minima es de 18 años.") => {
    if (ref.current.value > 17) {
        return false;
    }
    return error;
});