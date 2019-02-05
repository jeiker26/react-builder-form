import React from "react";
import { transformFalseValue, insertOrDeleteElemntArray, convertIntoArray } from "./utils";

export const INPUTS_TYPES = {
  radio: "radio",
  checkbox: "checkbox",
  checkboxMulti: "checkboxMulti",
  input: "input",
  select: "select"
};

const initialState = {
  errors: {},
  values: {},
  isValid: false,
  loading: true,
  submited: false
};

export const formWrapper = WrappedComponent => {
  return class FormWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        elements: null,
        isValidationWrite: false,
        ...initialState
      };
    }

    /** Options/configuration */
    validationWrite = value => this.setState({ isValidationWrite: value });

    /** End Options/configuration */

    /** Public Interface */
    getErrors = elementName => this.state.errors[elementName] || [];

    getInput = (type = "input", fieldName, value = false) => {
      const field = this.getFormField(fieldName);
      const iField = {};
      iField.name = fieldName;
      iField.value = field.value;
      switch (type) {
        case INPUTS_TYPES.radio:
          iField.checked = field.value === value;
          iField.value = value;
          break;
        case INPUTS_TYPES.checkbox:
          iField.checked = field.value;
          break;
        case INPUTS_TYPES.checkboxMulti:
          iField.checked = field.value && field.value.indexOf(value) > -1;
          iField.value = value;
          iField.name = `${fieldName}[]`;
          break;
      }
      iField.onChange = field.onChange;

      return iField;
    };

    interfaceform = () => {
      return {
        ...this.state,
        submit: this.compile,
        clear: this.clear,
        setValues: this.setValues,
        setFields: this.setElements,
        getErrors: this.getErrors,
        getInput: fieldName => this.getInput(INPUTS_TYPES.input, fieldName),
        getSelect: fieldName => this.getInput(INPUTS_TYPES.input, fieldName), // todo add type select
        getCheckbox: fieldName => this.getInput(INPUTS_TYPES.checkbox, fieldName),
        getRadio: (fieldName, value) => this.getInput(INPUTS_TYPES.radio, fieldName, value),
        getCheckboxMulti: (fieldName, value) =>
          this.getInput(INPUTS_TYPES.checkboxMulti, fieldName, value),
        validationWriteWithoutSubmit: this.validationWrite
      };
    };

    /** End Public Interface */

    /** Form functions
     * 1 - Utils
     * 2 - Core Form
     * 3 - Core FormField
     */
    /* 1 - Utils */
    getFormField = elementName => this.state.elements[elementName];

    /* 2 - Core Form */
    compile = e => {
      e.preventDefault();
      const errors = this.checkErrors();
      const values = this.values();
      this.setState({
        errors,
        values,
        isValid: !errors.totalErrors,
        submited: true,
        isValidationWrite: true
      });
    };

    checkErrors = state => {
      state = state || this.state;
      let _errors = {
        totalErrors: 0
      };
      Object.keys(state.elements).forEach(e => {
        const elementErrors = this.formElementValid(e); //deepClone
        if (elementErrors) {
          _errors[e] = elementErrors;
          _errors.totalErrors += elementErrors.length;
        }
      });

      return _errors;
    };

    values = () => {
      const _values = {};
      Object.keys(this.state.elements).forEach(e => {
        _values[e] = this.state.elements[e].value; // deepClone
      });
      return _values;
    };

    clear = () => {
      const clearElementsObject = {};
      Object.keys(this.state.elements).forEach(e => {
        clearElementsObject[e] = {
          ...this.state.elements[e], // deepClone
          value: transformFalseValue(this.state.elements[e].value)
        };
      });

      this.setState({
        errors: {},
        values: {},
        isValid: false,
        submited: false,
        elements: clearElementsObject
      });
    };

    setValues = values => {
      const elementsWithValues = {};
      Object.keys(this.state.elements).forEach(e => {
        elementsWithValues[e] = {
          ...this.state.elements[e], // deepClone
          value: values[e] || transformFalseValue(this.state.elements[e].value)
        };
      });

      this.setState({
        errors: {},
        values: {},
        isValid: false,
        submited: false,
        elements: elementsWithValues
      });
    };

    setElements = elements => {
      const elementsTransform = {};
      Object.keys(elements).forEach(e => {
        elementsTransform[e] = this.createFormElement(e, elements[e]);
      });
      this.setState({
        elements: elementsTransform,
        ...initialState,
        loading: false
      });
    };

    /* 3 - Core FormField */
    createFormElement(name, { defaultValue, validators }) {
      return {
        defaultValue,
        validators,
        value: defaultValue,
        onChange: e => this.formElementOnChange(e, name)
      };
    }

    formElementValid = elementName => {
      let element = this.getFormField(elementName);
      const responseValidations = element.validators.map(validator =>
        validator.exec(element.value, this.state.elements)
      );
      return responseValidations.filter(res => !!res);
    };

    formElementOnChange = (e, elementName) => {
      let element = this.getFormField(elementName); // deepClone
      let value = null;
      switch (e.target.type) {
        case INPUTS_TYPES.checkbox:
          if (/(\[\])$/.test(e.target.name)) {
            value = convertIntoArray(element.value);
            value = insertOrDeleteElemntArray(value, e.target.value);
          } else {
            value = e.target.checked;
          }
          break;
        default:
          value = e.target.value;
          break;
      }
      element.value = value;
      this.saveFormElement(elementName, element);
    };

    saveFormElement = (elementName, data) => {
      let elements = this.state.elements; // deepClone
      let errors = this.state.errors; // deepClone
      delete elements[elementName];

      this.setState(
        {
          elements: { ...elements, [elementName]: data },
          submited: false,
          isValid: false
        },
        () => {
          // Get and set error errors
          if (this.state.isValidationWrite) {
            errors[elementName] = this.formElementValid(elementName);
            this.setState({ errors });
          }
        }
      );
    };

    /** End Form functions */

    render() {
      return <WrappedComponent form={this.interfaceform()} {...this.props} />;
    }
  };
};
