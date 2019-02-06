export class Validator {
  functionValidator = () => false;

  constructor(functionValidator) {
    this.functionValidator = functionValidator || this.functionValidator;
  }

  exec = (value, formElment) => this.functionValidator(value, formElment);
}

export const IS_REQUIRED_ERROR = "Field is required";
export const isRequired = new Validator(value => {
  const error = IS_REQUIRED_ERROR;
  if (value) {
    if (Array.isArray(value) && !value.length) {
      return error;
    }
    return false;
  }
  return error;
});
