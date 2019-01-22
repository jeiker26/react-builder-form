import React from "react";

export class Form {
    elements = {};
    errors = {};

    constructor(elements) {
        this.elements = elements || this.elements;
    }

    valid = () => {
        this.errors = {};
        let _totalErrors = 0;
        Object.keys(this.elements).forEach(e => {
            const elementErrors = this.elements[e].valid();
            if (elementErrors) {
                this.errors[e] = this.elements[e].valid();
                _totalErrors += this.errors[e].length;
            }
        });
        this.errors._totalErrors = _totalErrors;

        return !this.errors._totalErrors;
    }

    values = () => {
        const _values = {};
        Object.keys(this.elements).forEach(e => {
            _values[e] = this.elements[e].value();
            
        })
        return _values;
    }

    clear = () => Object.keys(this.elements).forEach(e => this.elements[e].clear())

    completeDefault = () => Object.keys(this.elements).forEach(e => this.elements[e].setDefaultValue());

    setValues = values => Object.keys(this.elements).forEach(e => { values[e] && this.elements[e].setValue(values[e]); });

    /** New implements */
    setElements = elements => { this.elements = elements; }
}

export class FormElement {
    ref = "";
    defaultValue = "";
    validators = [];
    errors = [];

    constructor(defaultValue, validators) {
        this.ref = React.createRef();
        this.defaultValue = defaultValue;
        this.validators = validators;
    }

    setDefaultValue = () => {
        if(!this.defaultValue) return;
        this.ref.current.defaultValue = this.defaultValue;
    }

    setValue = value => {
        this.ref.current.value = value;
    }

    clear = () => {
        this.ref.current.value = "";
    }

    value = () => this.ref.current.value;

    valid = () => {
        this.errors = this.validators.map(validator => validator.exec(this.ref)).filter(res => !!res);
        return this.errors.length ? this.errors : false;
    };
}

export class Validator {
    functionValidator = () => false; // no errors

    constructor(functionValidator) {
         this.functionValidator = functionValidator || this.functionValidator;
    }

    exec = ref => this.functionValidator(ref)
}

