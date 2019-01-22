import React from "react";
import { formWrapper} from "./utils/forms/FormWrapper";
import { FormElement } from "./utils/forms/forms";
import { minstringvalidator, startWithJJ, maxstringvalidator, more18age } from "./utils/validators/validators";

export class CompleteFormComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.form.setElements({ 
            name: new FormElement("Jeus", [minstringvalidator, startWithJJ, maxstringvalidator]),
            age: new FormElement("23", [more18age]),
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.compile();
    }

    handleClearForm = e => {
        e.preventDefault();
        this.props.form.clear();
    }

    hanleSetValues = e => {
        e.preventDefault();
        this.props.form.setValues({ name: "Jesussss", age: 42});
    }

    render() {
        const { form } = this.props;
        return form.loading ?  
            (<p>Loading...</p>)
        : 
        (<div>
            Soy un formulario
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={form.elements.name.ref} />
                <input type="number" ref={form.elements.age.ref} />
                
                {form.errors.name && form.errors.name.length && form.errors.name.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}

                {form.errors.age && form.errors.age.length && form.errors.age.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}


                <button>Submit</button>
                <button onClick={this.handleClearForm}>Clear</button>
                <button onClick={this.hanleSetValues}>SetValues</button>
            </form>
            </div>);
    }
}


export const CompleteForm = formWrapper(CompleteFormComponent);