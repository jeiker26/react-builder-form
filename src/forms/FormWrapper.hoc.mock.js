import React from "react";
import PropTypes from "prop-types";
import { formWrapper } from "./FormWrapper";
import { Validator, isRequired } from "./Validator";

export const FIELDS_MOCKS = {
  name: {
    defaultValue: "asdasd",
    validators: [minstringvalidator, maxstringvalidator, isRequired]
  },
  age: {
    defaultValue: "2017-06-01", // TODO: importante apuntar formato de la fecha
    validators: [isRequired]
  },
  email: {
    defaultValue: "jesus-aaaaaa@gml.c",
    validators: [emailValidator, isRequired]
  },
  repeatEmail: {
    defaultValue: "jesus-aaaaaa@gml.c",
    validators: [equalValidatorEmail, isRequired]
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
    defaultValue: ["film1", "film3"],
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
  age: "1992-04-19",
  policyPrivacy: true,
  gender: "y",
  films: ["film2"],
  car: "mercedes"
};
export class FormMockComponent extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      setFields: PropTypes.func,
      setValues: PropTypes.func,
      isValid: PropTypes.bool,
      values: PropTypes.any,
      clear: PropTypes.func
    })
  };

  componentDidMount() {
    this.props.form.setFields(FIELDS_MOCKS);
  }

  componentDidUpdate() {
    if (this.props.form.isValid) {
      console.log("Send data:", this.props.form.values);
    }
  }

  handleClearForm = e => {
    e.preventDefault();
    this.props.form.clear();
  };

  hanleSetValues = e => {
    e.preventDefault();
    this.props.form.setValues(MOCKS_NEW_VALUES);
  };

  render() {
    const { form } = this.props;
    return form.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <form onSubmit={form.submit}>
          Name:
          <input type="text" {...form.getInput("name")} />
          <br />
          {form.getErrors("name").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          Age:
          <input type="date" {...form.getInput("age")} />
          <br />
          {form.getErrors("age").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          Email:
          <input type="text" {...form.getInput("email")} />
          <br />
          {form.getErrors("email").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Repeat email:
          <input type="text" {...form.getInput("repeatEmail")} />
          <br />
          {form.getErrors("repeatEmail").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Condiciones de privacidad:
          <input type="checkbox" {...form.getCheckbox("policyPrivacy")} />
          <br />
          {form.getErrors("policyPrivacy").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Genero:
          <input type="radio" {...form.getRadio("gender", "x")} />
          <label>x</label>
          <input type="radio" {...form.getRadio("gender", "y")} />
          <label>y</label>
          {form.getErrors("gender").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Tipos de peliculas:
          <input type="checkbox" {...form.getCheckboxMulti("films", "film1")} />
          <label>film1</label>
          <input type="checkbox" {...form.getCheckboxMulti("films", "film2")} />
          <label>film2</label>
          <input type="checkbox" {...form.getCheckboxMulti("films", "film3")} />
          <label>film3</label>
          {form.getErrors("films").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          <br />
          <select {...form.getSelect("car")}>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <br />
          <br />
          <button>Submit</button>
          <button id="btn-clear" onClick={this.handleClearForm}>
            Clear
          </button>
          <button id="btn-set-values" onClick={this.hanleSetValues}>
            SetValues
          </button>
        </form>
      </div>
    );
  }
}

export const FormMock = formWrapper(FormMockComponent);

/** Mocks Validators */
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
