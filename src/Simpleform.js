import React from "react";
import { Form, FormElement } from "./utils/forms/forms";
import { minstringvalidator, startWithJJ, maxstringvalidator, more18age } from "./utils/validators/validators";

export class FormSimple extends React.Component {
    constructor(props) {
        super(props);
        this.form = new Form({ 
            name: new FormElement("Jeus", [minstringvalidator, startWithJJ, maxstringvalidator]),
            age: new FormElement("23", [more18age]),
        });

        this.state = {
            formErrors: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if (!this.form.valid()) {
            this.setState({ formErrors: this.form.errors });
            return;
        } 
        console.log(this.form.values());
    }

    handleClearForm = e => {
        e.preventDefault();
        this.form.clear();
    }

    hanleSetValues = () => {
        this.form.setValues({ name: "Jesussss", age: 42});
    }

    componentDidMount() {
        this.form.completeDefault();
    }

    render() {
        return (<div>
            Soy un formulario
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={this.form.elements.name.ref} />

                {this.state.formErrors && this.state.formErrors.name && this.state.formErrors.name.length &&this.state.formErrors.name.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}

                <input type="number" ref={this.form.elements.age.ref} />
                {this.state.formErrors && this.state.formErrors.age && this.state.formErrors.age.length &&this.state.formErrors.age.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                <button>Submit</button>
                <button onClick={this.handleClearForm}>Clear</button>
                <button onClick={this.hanleSetValues}>SetValues</button>
            </form>
            </div>);
    }
}
