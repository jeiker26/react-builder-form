export class Validator {
    functionValidator = () => false;

    constructor(functionValidator) {
         this.functionValidator = functionValidator || this.functionValidator;
    }

    exec = (value, formElment) => this.functionValidator(value, formElment)
}

export const isRequired = new Validator((value) => {
    const error = "Campo requerido";
    if (value) {
        if (Array.isArray(value) && !value.length) {
            return error;
        }
       return false;
    } 
    return error;
})