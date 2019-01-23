import React from "react";
import { formWrapper } from "./utils/forms/FormWrapper";
import { minstringvalidator, startWithJJ, maxstringvalidator, more18age, moreAgeEqual } from "./utils/validators/validators";

export class CompleteFormComponent extends React.Component {
    componentDidMount() {
        this.props.form.setFields({ 
            name: {
                defaultValue: "Jeus", 
                validators: [minstringvalidator, startWithJJ, maxstringvalidator]
            },
            age: {
                defaultValue: "23", 
                validators: [more18age]
            },
            repeatAge: {
                defaultValue: "",
                validators: [more18age, moreAgeEqual]
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.form.isValid) {
          console.log("Send data:", this.props.form.values);
        }
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
            <form onSubmit={e => {
                e.preventDefault(); 
                form.compile();
            }}>
                <input type="text" value={form.elements.name.value} onChange={form.elements.name.onChange} />
                <br />
                {form.getErrors("name").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                
                <br />
                <br />

                <input type="number" value={form.elements.age.value} onChange={form.elements.age.onChange} />
                <br />
                {form.errors.age && form.errors.age.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                <br />
                <input type="number" value={form.elements.repeatAge.value} onChange={form.elements.repeatAge.onChange} />
                <br />
                {form.errors.repeatAge && form.errors.repeatAge.map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}

                <br />
                <button>Submit</button>
                <button onClick={this.handleClearForm}>Clear</button>
                <button onClick={this.hanleSetValues}>SetValues</button>
            </form>
            </div>);
    }
}


export const CompleteForm = formWrapper(CompleteFormComponent);