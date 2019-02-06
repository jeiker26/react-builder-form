
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]

[travis-image]: https://travis-ci.org/jeiker26/react-builder-form.svg?branch=develop
[travis-url]: https://travis-ci.org/jeiker26/react-builder-form
[node-image]: https://img.shields.io/badge/node.js-%3E=5.4-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

Small library to simplify the use of forms in React.

With a simple **higher**-**order** component (HOC), you can get:
1.  The values ​​of the inputs.
2.  The status of the form.
3.  Control of validations.

## Todo
- Tests.
- Tests Props order props(father to children).
- Examples.
- Installation (In progress NPM package) and travis CI
- Open fields properties for include (onclick, onFocus, ...)


## Getting Started

### Installation (In progress NPM package)
You can install with [NPM](https://npmjs.com/)

### Step 1: Create your component and do the HOC
```jsx
class ExampleFormComponent extends React.Component {
  ...
}

export const ExampleForm = formWrapper(ExampleFormComponent);
```


### Step 2: Add the fields of your form in the "componentDidMount"
```jsx
  ...
  componentDidMount() {
    this.props.form.setFields({
      name: {
        defaultValue: "asdasd",
        validators: [minstringvalidator, maxstringvalidator, isRequired]
      },
      age: {
        defaultValue: "2017-06-01",
        validators: [isRequired]
      },
      email: {
        defaultValue: "jesus-aaaaaa@gml.c",
        validators: [emailValidator, isRequired]
      },
      repeatEmail: {
        defaultValue: "jesus-aaaaaa@gml.c",
        validators: [equalValidatorEmail, isRequired]
      },
      policyPrivacy: {
        defaultValue: true,
        validators: [isRequired]
      }
    });
  }
  ...
```


### Step 3: Do not forget, add to each of the fields of your html form your handler (props.form.getInput, props.form.getSelect, ...)
```jsx
  ...
  render() {
    const { form } = this.props;
    return form.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <form onSubmit={form.submit}>
          Name:
          <input type="text" {...form.getInput("name")} />
        
          Age:
          <input type="date" {...form.getInput("age")} />
          
          Email:
          <input type="text" {...form.getInput("email")} />
          
          Repeat email:
          <input type="text" {...form.getInput("repeatEmail")} />
          
          Condiciones de privacidad:
          <input type="checkbox" {...form.getCheckbox("policyPrivacy")} />
          
          <button>Submit</button>
        </form>
      </div>
    );
  }
  ...
```


### Step 4: In submit release the X
```jsx
    ...
    <form onSubmit={form.submit}>
    ...
```

### Step 5: Finally, you will receive the result of the form by props, "componentDidUpdate"
```jsx
    ...
    componentDidUpdate() {
        if (this.props.form.isValid) {
        console.log("Send data:", this.props.form.values);
        }
    }
    ...
```

### Optional: you can get the errors of each of the fields
```jsx
    ...
    render() {
        ...
        <form onSubmit={form.submit}>
          Name:
          <input type="text" {...form.getInput("name")} />
          {form.getErrors("name").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}

          Age:
          <input type="date" {...form.getInput("age")} />
          {form.getErrors("age").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
    ...
```

- You can also get all the errors, with props `props.form.errors`.
- Or enable error detection in real time, putting props `props.form.validationWriteWithoutSubmit()` in `componentDidMount()`.

## Examples 

* [Basics]
```jsx
// Todo: add import
class BasicFormComponent extends React.Component {
	componentDidMount() {
		// Add elements
		this.props.form.setFields({
			name: {
				defaultValue: "Jeus",
				validators: []
			}
		});
	}

	componentDidUpdate(prevProps) {
		// Check if isValid form
		if (!this.props.form.isValid) {
            console.log("Form errors:", this.props.form.errors);
            return;
        }
        console.log("Form data:", this.props.form.values);
	}

	render() {
		const { form } = this.props;
		return form.loading ?
            (<p>Loading...</p>)
            :
            (<div>
                Soy un formulario
                <form onSubmit={form.submit}>
                {/** Add property value and onChange to the field */}
                <input 
                    type="text"
                    value={form.elements.name.value}
                    onChange={form.elements.name.onChange} />
                    
                    {/** Get field errors */}
                    {/** Way 1 */}
                    {form.errors.name && form.errors.name.map(e  => (<span  key={e}  style={{color:  "red"}}>{e}</span>))}
                    {/** Way 2 */}
                    {form.getErrors("name").map(e  => (<span  key={e}  style={{color:  "red"}}>{e}</span>))}

                    <button>Submit</button>
                </form>
            </div>);
	}

}

export const BasicForm = formWrapper(BasicFormComponent);
```
* [Avanced Validation]
```jsx
export class CompleteFormComponent extends React.Component {
  componentDidMount() {
    this.props.form.validationWriteWithoutSubmit(true);
    this.props.form.setFields({
      name: {
        defaultValue: "asdasd",
        validators: [minstringvalidator, maxstringvalidator, isRequired]
      },
      age: {
        defaultValue: "2017-06-01",
        validators: [isRequired]
      },
      email: {
        defaultValue: "jesus-aaaaaa@gml.c",
        validators: [emailValidator, isRequired]
      },
      repeatEmail: {
        defaultValue: "jesus-aaaaaa@gml.c",
        validators: [equalValidatorEmail, isRequired]
      },
      policyPrivacy: {
        defaultValue: true,
        validators: [isRequired]
      },
      gender: {
        defaultValue: "x",
        validators: [isRequired]
      },
      films: {
        defaultValue: ["film1", "film3"],
        validators: [isRequired]
      },
      car: {
        defaultValue: "audi",
        validators: [isRequired]
      }
    });
  }

  componentDidUpdate() {
    if (this.props.form.isValid) {
      console.log("Send data:", this.props.form.values);
    }
  }

  handleClearForm = e => {
    e.preventDefault();
    this.props.form.clear();
  };

  hanleSetValues = e => {
    e.preventDefault();
    this.props.form.setValues({
      name: "Jesussss",
      email: "jesusgrads@mmm.es",
      age: "1992-04-19",
      policyPrivacy: true,
      gender: "y",
      films: ["film2"],
      car: "mercedes"
    });
  };

  render() {
    const { form } = this.props;
    return form.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <form onSubmit={form.submit}>
          Name:
          <input type="text" {...form.getInput("name")} />
          <br />
          {form.getErrors("name").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          Age:
          <input type="date" {...form.getInput("age")} />
          <br />
          {form.getErrors("age").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          Email:
          <input type="text" {...form.getInput("email")} />
          <br />
          {form.getErrors("email").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Repeat email:
          <input type="text" {...form.getInput("repeatEmail")} />
          <br />
          {form.getErrors("repeatEmail").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Condiciones de privacidad:
          <input type="checkbox" {...form.getCheckbox("policyPrivacy")} />
          <br />
          {form.getErrors("policyPrivacy").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Genero:
          <input type="radio" {...form.getRadio("gender", "x")} />
          <label>x</label>
          <input type="radio" {...form.getRadio("gender", "y")} />
          <label>y</label>
          {form.getErrors("gender").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          Tipos de peliculas:
          <input type="checkbox" {...form.getCheckboxMulti("films", "film1")} />
          <label>film1</label>
          <input type="checkbox" {...form.getCheckboxMulti("films", "film2")} />
          <label>film2</label>
          <input type="checkbox" {...form.getCheckboxMulti("films", "film3")} />
          <label>film3</label>
          {form.getErrors("films").map(e => (
            <span key={e} style={{ color: "red" }}>
              {e}
            </span>
          ))}
          <br />
          <br />
          <br />
          <select {...form.getSelect("car")}>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <br />
          <br />
          <button>Submit</button>
          <button id="btn-clear" onClick={this.handleClearForm}>
            Clear
          </button>
          <button id="btn-set-values" onClick={this.hanleSetValues}>
            SetValues
          </button>
        </form>
      </div>
    );
  }
}

export const CompleteForm = formWrapper(CompleteFormComponent);
```

### Usage


### Doc
#### Functions
| function | params | description |
|--|--|--|
| `setFields()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }` | Add the form fields, along with their default value and validations. Method used in the `componentDidMount()` |
| `validationWriteWithoutSubmit()` | `bool` default false | Check the fields while the user fills them. It is not necessary to submit. Method used in the `componentDidMount()` |
| `setValues()` | `{ nameField1: "foo", nameField2: "var", nameFieldN: "test" }` | Set values. The form must have the `loading` to `false`. |
| `clear()` | `no params` | Set default values ​​for `errors`, `values` ​​and `isValid`.
| `submit()` | `no params` | Check all the validators of all the fields and set the values ​​of the form: `values`, `errors` and `isValid`
| `getErrors()` | `nameField` | Get the errors of a field. Returns an error array or an empty one.
| `getInput()` | `nameField` | Get input attributes. Only text, number and date.
| `getSelect()` | `nameField` | Get input attributes. Only for select.
| `getCheckbox()` | `nameField` | Get input attributes. Only for simple checkbox: true/false.
| `getRadio()` | `"nameField"` , `"value"` | Get input attributes. Only for radio type.
| `getCheckboxMulti()` | `"nameField"` , `"value"` | Get input attributes. Only for check with multiple options.




#### Render props
| prop | types | default value | description |
|--|--|--|--|
| `errors` | `{ elementKey: String[], ... }` | `{}` | Errors by fields. |
| `values` | `{ element: String, ... }` | `{}` | Values by fields. |
| `isValid` | `boolean` | `false`| All fields comply with their validations. After `submit()`. |
| `loading` | `boolean` | `true` | `false`, when the form is ready. After `setFields()`.|

---

MIT License.

---