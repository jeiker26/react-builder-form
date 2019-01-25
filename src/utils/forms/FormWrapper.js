import React from "react";

export const formWrapper = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                elements: null,
                errors: {},
                values: {},
                isValid: false,
                loading: true,
                isValidationWrite: false,
                submited: false
            };
        }

        validationWrite = value => this.setState({ isValidationWrite: value });

        compile = e => {
            e.preventDefault();
            const errors = this.checkErrors();
            const values = this.values();
            this.setState({ errors, values, isValid: !errors.totalErrors, submited: true });
        }

        getErrors = elementName => (this.state.errors[elementName] || []);

        interfaceform = () => {
            return {
                ...this.state,
                submit: this.compile,
                clear: this.clear,
                setValues: this.setValues,
                setFields: this.setElements,
                getErrors: this.getErrors,
                validationWriteWithoutSubmit: this.validationWrite
            }
        }
  
        render() {
            return <WrappedComponent form={this.interfaceform()} {...this.props} />;
        }


        /** Form functions */
        checkErrors = state => {
            state = state || this.state;
            let _errors = {
                totalErrors: 0
            }
            Object.keys(state.elements).forEach(e => {
                const elementErrors = this.formElementValid(e);
                if (elementErrors) {
                    _errors[e] = elementErrors;
                    _errors.totalErrors += elementErrors.length;
                }
            });

            return _errors;
        }

        values = () => {
            const _values = {};
            Object.keys(this.state.elements).forEach(e => {
                _values[e] = this.state.elements[e].value;
            })
            return _values;
        }

        clear = () => {
            const clearElementsObject = {};
            Object.keys(this.state.elements).forEach(e => {
                clearElementsObject[e] = { ...this.state.elements[e], value: "" };
            });
            
            this.setState({ errors: {}, values: {}, isValid: false, elements: clearElementsObject });
        }

        setValues = values => {
            const elementsWithValues = {};
            Object.keys(this.state.elements).forEach(e => {
                elementsWithValues[e] = { ...this.state.elements[e], value: values[e] };
            });
            
            this.setState({ errors: {}, values: {}, isValid: false, elements: elementsWithValues });
        }

        setElements = elements => {
            const elementsTransform = {};
            Object.keys(elements).forEach(e => {
                elementsTransform[e] = this.createFormElement(e, elements[e]);
            });
            this.setState({ elements: elementsTransform, loading: false });
        }


        /** Element functions */
        createFormElement(name, {defaultValue, validators}) {
            return { defaultValue, validators, value: defaultValue, onChange: e => this.formElementOnChange(e, name) };
        }

        formElementValid = elementName => {
            let element = this.readFormElement(elementName);
            const responseValidations = element.validators.map(validator => validator.exec(element.value, this.state.elements));
            return responseValidations.filter(res => !!res);
        }

        formElementOnChange = (e, elementName) => {
            let element = this.readFormElement(elementName);
            let value = null;
            switch(e.target.type) {
                case "radio":
                    if (/(\[\])$/.test(e.target.name)) {
                        value = (Array.isArray(element.value) ? [...element.value] : [element.value]).filter(e => !!e);
                        const index = value.indexOf(e.target.value);
                        index === -1 ? value.push(e.target.value) : value.splice(index,1);
                    } else {
                        value = e.target.value;
                    }
                    break;
                case "checkbox":
                    if (/(\[\])$/.test(e.target.name)) {
                        value = (Array.isArray(element.value) ? [...element.value] : [element.value]).filter(e => !!e);
                        const index = value.indexOf(e.target.value);
                        index === -1 ? value.push(e.target.value) : value.splice(index,1);
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
        }

        readFormElement = elementName => this.state.elements[elementName];

        saveFormElement = (elementName, data) => {
            let elements = this.state.elements;
            delete elements[elementName];
            
            this.setState({ elements: {...elements, [elementName]: data }}, () => {
                // Get and set error errors
                if (this.state.isValidationWrite || this.state.submited) {
                    const errors = this.state.errors;
                    errors[elementName] = this.formElementValid(elementName);
                    this.setState({ errors });
                }
            });
            
        }
    };
}