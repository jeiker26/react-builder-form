import React from "react";
import PropTypes from "prop-types";
import { formWrapper } from "../../src/lib/FormWrapper";
import { isRequired } from "../../src/lib/Validator";

export class GeneratorFieldComponent extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      setFields: PropTypes.func,
      initForm: PropTypes.func,
      setValues: PropTypes.func,
      isValid: PropTypes.bool,
      values: PropTypes.any,
      clear: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.setFields();

    this.state = {
      moreFields: []
    };
  }

  componentDidUpdate() {
    if (this.props.form.isValid) {
      console.log("Send data:", this.props.form.values);
    }
  }

  setFields() {
    this.props.form.initForm(
      {
        fieldName: {}
      },
      true
    );
  }

  hanleSetValues = e => {
    e.preventDefault();
    this.props.form.setValues({
      mobile: "777"
    });
  };

  addField = inputName => {
    this.props.form.setFields({
      [inputName]: {
        validators: [isRequired]
      }
    });

    this.setState(prevState => {
      const moreFields = [...prevState.moreFields, inputName];
      return { moreFields };
    });
  };

  render() {
    const { form } = this.props;
    console.log(form);
    return (
      <div>
        <form onSubmit={form.submit}>
          Field name:
          <input type="text" {...form.getInput("fieldName")} />
          <button
            id="btn-add-field"
            onClick={e => {
              e.preventDefault();
              this.addField(form.elements.fieldName && form.elements.fieldName.value);
            }}
          >
            Add Field by input
          </button>
          <br />
          {form.getErrors("fieldName").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          {this.state.moreFields.map(inputName => (
            <span key={inputName}>
              {inputName}:
              <input type="text" {...form.getInput(inputName)} />
              <br />
              {form.getErrors(inputName).map(e => (
                <span key={e} style={{ color: "red" }}>
                  {e}
                </span>
              ))}
            </span>
          ))}
          <button>Submit</button>
          <hr />
          <br />
          <button id="btn-set-values" onClick={this.hanleSetValues}>
            SetValues
          </button>
          <span>WARNING: Previous add field &quot;mobile&quot;</span>
        </form>
      </div>
    );
  }
}

export const GeneratorFields = formWrapper(GeneratorFieldComponent);
