import React from "react";
import PropTypes from "prop-types";
import { formWrapper, isRequired } from "../../dist/react-form-builder";

import {
  minstringvalidator,
  maxstringvalidator,
  emailValidator,
  equalValidatorEmail
} from "./utils/validators/validators";

export class CompleteFormComponent extends React.Component {
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
    // this.props.form.validationWriteWithoutSubmit(true);
    this.props.form.setFields({
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
    });
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
    this.props.form.setValues({
      name: "Jesussss",
      email: "jesusgrads@mmm.es",
      age: "1992-04-19",
      policyPrivacy: true,
      gender: "y",
      films: ["film2"],
      car: "mercedes"
    });
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
          <button onClick={this.handleClearForm}>Clear</button>
          <button onClick={this.hanleSetValues}>SetValues</button>
        </form>
      </div>
    );
  }
}

export const CompleteForm = formWrapper(CompleteFormComponent);
