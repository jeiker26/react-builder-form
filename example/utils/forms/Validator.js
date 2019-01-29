export class Validator {
  functionValidator = () => false;

  constructor(functionValidator) {
    this.functionValidator = functionValidator || this.functionValidator;
  }

  exec = (value, formElment) => this.functionValidator(value, formElment);
}

export const isRequired = new Validator(value => {
  const error = "Field is required";
  if (value) {
    if (Array.isArray(value) && !value.length) {
      return error;
    }
    return false;
  }
  return error;
});
