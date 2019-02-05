import { formWrapper, INPUTS_TYPES } from "./FormWrapper";
import { Validator, isRequired } from "./Validator";

export const FIELDS_MOCKS = {
  name: {
    defaultValue: "asdasd",
    validators: [minstringvalidator, isRequired]
  },
  age: {
    defaultValue: "2017-06-01", // TODO: importante apuntar formato de la fecha
    validators: [isRequired]
  },
  email: {
    defaultValue: "jesus-aaaaaa@gml.c",
    validators: [isRequired]
  },
  repeatEmail: {
    defaultValue: "jesus-aaaaaa@gml.c",
    validators: [isRequired]
  },
  policyPrivacy: {
    defaultValue: true,
    validators: [isRequired]
  },
  gender: {
    defaultValue: "x",
    validators: [isRequired]
  },
  films: {
    defaultValue: "film1",
    validators: [isRequired]
  },
  car: {
    defaultValue: "audi",
    validators: [isRequired]
  }
};

export const MOCKS_NEW_VALUES = {
  name: "Jesussss",
  email: "jesusgrads@mmm.es",
  repeatEmail: "", // only for test
  age: "1992-04-19",
  policyPrivacy: true,
  gender: "y",
  films: ["film2"],
  car: "mercedes"
};

export const MOCKS_CLEAR_VALUES = {
  name: "",
  email: "",
  repeatEmail: "",
  age: "",
  policyPrivacy: false,
  gender: "",
  films: "",
  car: ""
};

export const FIELDS_ONCHANGE_MOCKS = {
  name: { target: { value: "var", type: INPUTS_TYPES.input } },
  age: { target: { value: "1992-04-19", type: INPUTS_TYPES.input } },
  policyPrivacy: {
    target: { name: "policyPrivacy", type: INPUTS_TYPES.checkbox, checked: false }
  },
  gender: { target: { type: INPUTS_TYPES.radio, value: "y" } },
  films: { target: { type: INPUTS_TYPES.checkbox, name: "films[]", value: "foo" } },
  car: { target: { value: "renault", type: INPUTS_TYPES.select } }
};

export const FakeComponent = () => {};
export const FormMock = formWrapper(FakeComponent);

/** Mocks Validators */
export const MINSTRINGVALIDATOR_ERROR = "El elemento debe tener más de 3 caracteres.";
export const minstringvalidator = new Validator(value => {
  const error = MINSTRINGVALIDATOR_ERROR;
  if (value && value.length > 3) {
    return false;
  }
  return error;
});
