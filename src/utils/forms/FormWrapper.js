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
                loading: true
            };
        }

        compile = e => {
            e.preventDefault();
            const errors = this.checkErrors();
            const values = this.values();
            this.setState({ errors, values, isValid: !errors.totalErrors });
        }

        getErrors = elementName => (this.state.errors[elementName] || []);

        interfaceform = () => {
            return {
                ...this.state,
                submit: this.compile,
                clear: this.clear,
                setValues: this.setValues,
                setFields: this.setElements,
                getErrors: this.getErrors
            }
        }
  
        render() {
            return <WrappedComponent form={this.interfaceform()} {...this.props} />;
        }


        /** Form functions */
        checkErrors = () => {
            let _errors = {
                totalErrors: 0
            }
            Object.keys(this.state.elements).forEach(e => {
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
            return { defaultValue, validators, value: defaultValue || "", onChange: e => this.formElementOnChange(e, name) };
        }

        formElementValid = elementName => {
            let element = this.readFormElement(elementName);
            return element.validators.map(validator => validator.exec(element.value, this.state.elements)).filter(res => !!res);
        }

        formElementOnChange = (e, elementName) => {
            let element = this.readFormElement(elementName);
            element.value = e.target.value;
            this.saveFormElement(elementName, element);
        }

        readFormElement = elementName => this.state.elements[elementName];

        saveFormElement = (elementName, data) => {
            let elements = this.state.elements;
            delete elements[elementName];
            this.setState({ elements: {...elements, [elementName]: data }});
        }
    };
}