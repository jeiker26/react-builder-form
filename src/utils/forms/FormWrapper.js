import React from "react";
import { FormElement } from "./forms";

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

        compile = () => {
            const errors = this.checkErrors();
            const values = this.values();
            this.setState({ errors, values, isValid: !errors.totalErrors });
        }

        checkErrors = () => {
            let _errors = {
                totalErrors: 0
            }
            Object.keys(this.state.elements).forEach(e => {
                const elementErrors = this.state.elements[e].valid();
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
                _values[e] = this.state.elements[e].value();
            })
            return _values;
        }

        clear = () => {
            this.setState({ errors: {}, values: {}, isValid: false }, () => Object.keys(this.state.elements).forEach(e => this.state.elements[e].clear()));
        }

        _completeDefaultValues = () => {
            this.setState({ loading: false }, () => Object.keys(this.state.elements).forEach(e => this.state.elements[e].defaultValue && this.state.elements[e].setDefaultValue()))
        };

        setValues = values => {
            Object.keys(this.state.elements).forEach(e => { values[e] && this.state.elements[e].setValue(values[e]); });

            this.setState({ errors: {}, values: {}, isValid: false })
        }

        createElement = element => new FormElement(element.defaultValue, element.validators)

        /** New implements */
        setElements = elements => {
            const elementsTransform = {};
            Object.keys(elements).forEach(e => {
                elementsTransform[e] = this.createElement(elements[e]);
            });
            this.setState({ elements: elementsTransform }, this._completeDefaultValues);
        }

        interfaceform = () => {
            return {
                ...this.state,
                compile: this.compile,
                clear: this.clear,
                setValues: this.setValues,
                setElements: this.setElements
            }
        }
  
        render() {
            return <WrappedComponent form={this.interfaceform()} {...this.props} />;
        }
    };
  }