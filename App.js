import React from "react";

/**
 * Class Validators => function + error
 * 
 * Class form element
 *  - ref
 *  - defaultValue
 *  - validators[]
 *  - valid()
 *  - value() 
 *  - clear()
 * 
 * Class form
 *  - valid()
 *  - value()
 *  - clear()
 */
 class Form {
    elements = {};

    constructor(elements) {
        this.elements = elements;
    }

    valid = () => {
        // check all element
        return true;
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
 }

 class FormElement {
     ref = "";
     defaultValue = "";
     validators = [];

     constructor(defaultValue, validators) {
         this.ref = React.createRef();
         this.defaultValue = defaultValue;
         this.validators = validators;
     }

     setDefaultValue = () => {
         if(!this.defaultValue) return;
        this.ref.current.defaultValue = this.defaultValue;
     }

     clear = () => {
        this.ref.current.value = "";
     }
     
     value = () => this.ref.current.value;
 }

export class App extends React.Component {
    form = new Form({ 
        name: new FormElement("hola", []),
        age: new FormElement("23", []),
    });

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.form.values());
    }

    handleClearForm = e => {
        e.preventDefault();
        this.form.clear();
    }

    componentDidMount() {
        this.form.completeDefault();
    }

    render() {
        return (<div>
            Soy un formulario
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={this.form.elements.name.ref} />
                <input type="number" ref={this.form.elements.age.ref} />
                <button>Submit</button>
                <button onClick={this.handleClearForm}>Clear</button>
            </form>
            </div>);
    }
}

