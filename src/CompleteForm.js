import React from "react";
import { formWrapper } from "./utils/forms/FormWrapper";
import { minstringvalidator, maxstringvalidator, emailValidator, equalValidatorEmail, checkIfTrue, isRequired } from "./utils/validators/validators";

export class CompleteFormComponent extends React.Component {
    componentDidMount() {
        // this.props.form.validationWriteWithoutSubmit(true);
        this.props.form.setFields({ 
            name: {
                validators: [minstringvalidator, maxstringvalidator, isRequired]
            },
            email: {
                validators: [emailValidator, isRequired]
            },
            repeatEmail: {
                validators: [equalValidatorEmail, isRequired]
            },
            policyPrivacy: {
                defaultValue: true,
                validators: [isRequired]
            },
            gender: {
                // defaultValue: "x",
                validators: [isRequired]
            },
            films: {
                defaultValue: "film1", // or ["film1", "film3"]
                validators: [isRequired]
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
            <form onSubmit={form.submit}>
                Name: 
                <input type="text" value={form.elements.name.value} onChange={form.elements.name.onChange} />
                <br />
                {form.getErrors("name").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                
                <br />
                <br />
                Email:
                <input type="text" value={form.elements.email.value} onChange={form.elements.email.onChange} />
                <br />
                {form.getErrors("email").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                
                <br />
                Repeat email:
                <input type="text" value={form.elements.repeatEmail.value} onChange={form.elements.repeatEmail.onChange} />
                <br />
                {form.getErrors("repeatEmail").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                
                <br />

                Condiciones de privacidad:
                <input type="checkbox" defaultChecked={form.elements.policyPrivacy.value} value={form.elements.policyPrivacy.value} onChange={form.elements.policyPrivacy.onChange} />
                <br />
                {form.getErrors("policyPrivacy").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}



                <br />

                Genero: 
                <input type="radio" name="drone" value="x" defaultChecked={form.elements.gender.value === "x"} onChange={form.elements.gender.onChange} />
                <label>x</label>
                <input type="radio" name="drone" value="y" defaultChecked={form.elements.gender.value === "y"} onChange={form.elements.gender.onChange}/>
                <label>y</label>
                {form.getErrors("gender").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                <br />


                Tipos de peliculas:
                <input type="checkbox" name="films[]" value="film1" defaultChecked={form.elements.films.value && form.elements.films.value.indexOf("film1") > -1 } onChange={form.elements.films.onChange} />
                <label>film1</label>
                <input type="checkbox" name="films[]" value="film2" defaultChecked={form.elements.films.value && form.elements.films.value.indexOf("film2") > -1 } onChange={form.elements.films.onChange} />
                <label>film2</label>
                <input type="checkbox" name="films[]" value="film3" defaultChecked={form.elements.films.value && form.elements.films.value.indexOf("film3") > -1 } onChange={form.elements.films.onChange}/>
                <label>film3</label>
                {form.getErrors("films").map(e => (<span key={e} style={{color: "red"}}>{e}</span>))}
                <br />

                
                <br />
                <br />

                <button>Submit</button>
                <button onClick={this.handleClearForm}>Clear</button>
                <button onClick={this.hanleSetValues}>SetValues</button>
            </form>
            </div>);
    }
}


export const CompleteForm = formWrapper(CompleteFormComponent);