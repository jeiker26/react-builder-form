
[![build status][travis-image]][travis-url]
[![node version](https://badgen.net/badge/node/>=5.4/green)](http://nodejs.org/download/)

[travis-image]: https://travis-ci.org/jeiker26/react-builder-form.svg?branch=master
[travis-url]: https://travis-ci.org/jeiker26/react-builder-form
[![Coverage Status](https://coveralls.io/repos/github/jeiker26/react-builder-form/badge.svg?branch=master)](https://coveralls.io/github/jeiker26/react-builder-form?branch=master)
[![license](https://img.shields.io/github/license/jeiker26/react-builder-form.svg)](https://github.com/jeiker26/react-builder-form)

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![Last commit][last-commit-image]][last-commit-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url]

[![code style: prettier](https://badgen.net/badge/code%20style/prettier/green)](https://github.com/prettier/prettier)
![minzipped size](https://badgen.net/bundlephobia/minzip/@jkr26/react-forms-builder-logic)
[![PRs welcome](https://badgen.net/badge/PRs/welcome/green)](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)



Small library to simplify the use of forms in React.

With a simple **higher**-**order** component (HOC), you can get:
1.  The values ​​of the inputs.
2.  The status of the form.
3.  Control of validations.


## Getting Started

### Installation
You can install with [NPM](https://npmjs.com/): [@jkr26/react-forms-builder-logic](https://www.npmjs.com/package/@jkr26/react-forms-builder-logic)
```js
npm i --save @jkr26/react-forms-builder-logic 
```

### Step 1: Create your component and do the HOC
```jsx
import { formWrapper } from "@jkr26/react-forms-builder-logic";

class ExampleFormComponent extends React.Component {
  ...
}

export const ExampleForm = formWrapper(ExampleFormComponent);
```


### Step 2: Add the fields and initialize the form.
```jsx
  ...
  constructor(props) {
    super(props);
    this.setFields();
  }

  setFields() {
    this.props.form.initForm({
      name: {
        defaultValue: "asdasd",
        validators: [minStringValidator, maxStringValidator, isRequired]
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
        validators: [equalValidatorEmail, isRequired]
      },
      policyPrivacy: {
        defaultValue: true,
        validators: [isRequired]
      }
    },
    true
    );
  }
  ...
```
`initForm` second param optional: true for validation fields in real time || [default] false only in submit state


### Step 3: Do not forget, add to each of the fields of your html form your handler (props.form.getInput, props.form.getSelect, ...)
```jsx
  ...
  render() {
    const { form } = this.props;
    return (
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


### Step 4: In submit
```jsx
    ...
    <form onSubmit={form.submit}>
    ...
```

### Step 5: Finally, you will receive the result of the form by props, "componentDidUpdate"
```jsx
    ...
    componentDidUpdate() {
        if (this.props.form.isValidAfterSubmit) {
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

## [Examples] (https://github.com/jeiker26/react-builder-form-demos.git) In progress

* [Basics]
```jsx
import { formWrapper } from "@jkr26/react-forms-builder-logic";
class BasicFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setFields();
  }

	setFields() {
		this.props.form.initForm({
			name: {}
		});
	}

	componentDidUpdate(prevProps) {
		if (!this.props.form.isValidAfterSubmit) {
            console.log("Form errors:", this.props.form.errors);
            return;
        }
        console.log("Form data:", this.props.form.values);
	}

	render() {
		const { form } = this.props;
		return (<div>
              <form onSubmit={form.submit}>
                  <input type="text" {...form.getInput("name")} />
                  
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
* [Advanced]
```jsx
import { formWrapper } from "@jkr26/react-forms-builder-logic";
export class CompleteFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setFields();
  }

  setFields() {
    this.props.form.initForm({
      name: {
        defaultValue: "asdasd",
        validators: [minStringValidator, maxStringValidator, isRequired]
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
    }, true);
  }

  componentDidUpdate() {
    if (this.props.form.isValidAfterSubmit) {
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
    return (
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

### Doc
#### Functions
| function | params | description |
|--|--|--|
| `initForm()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }`, `boolean` | Add the init form fields, along with their default value and validations. The second parameter indicates validations in real time, by default false. Method used in the `contructor()` |
| `setFields()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }` | Add the form fields, along with their default value and validations. |
| `setValues()` | `{ nameField1: "foo", nameField2: "var", nameFieldN: "test" }` | Set values. The form must have the `loading` to `false`. |
| `clear()` | `no params` | Set default values ​​for `errors`, `values` ​​and `isValidAfterSubmit`.
| `submit()` | `no params` | Check all the validators of all the fields and set the values ​​of the form: `values`, `errors` and `isValidAfterSubmit`
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
| `isValidAfterSubmit` | `boolean` | `false`| All fields comply with their validations. After `submit()`. |
| `isValid` | `boolean` | `false`| All fields comply with their validations in real time. Example: `<button style={{ backgroundColor: form.isValid ? "green" : "red" }}>Submit</button>` |
| `init` | `boolean` | `true` | `false`, when the form is ready. After `initForm()`.|


---


## Validations
### Example
The validation "isRequired" is included in the library.

Other examples of validation:
```jsx
import { Validator } from "@jkr26/react-forms-builder-logic";
export const startWithJJ = new Validator(value => {
  const error = "The element must start with jj.";
  if (value && /^jj/.test(value)) {
    return false;
  }
  return error;
});

export const maxStringValidator = new Validator(value => {
  const error = "The item must have less than 10 characters.";
  if (value && value.length < 10) {
    return false;
  }
  return error;
});

export const emailValidator = new Validator(value => {
  const error = "Invalid email";
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value && emailPattern.test(String(value).toLowerCase())) {
    return false;
  }
  return error;
});

export const equalValidatorEmail = new Validator((value, formFields) => {
  const error = "THE EMAIL DOES NOT MATCH.";
  if (value && value === formFields.email.value) {
    return false;
  }
  return error;
});

```
The validators work in a very simple way, as the first parameter they receive the value of the element and as a second parameter they receive all the values ​​of the form, as an object: `formFields = {
 name: "John",
 age: "33",
 email: "john@example.com",
 repeatEmail: "john"
}`




---

MIT License.

---


[last-commit-image]: https://img.shields.io/github/last-commit/jeiker26/react-builder-form.svg
[last-commit-url]: https://github.com/jeiker26/react-builder-form/commits

[npm-downloads-image]: https://img.shields.io/npm/dm/@jkr26/react-forms-builder-logic.svg
[npm-downloads-url]: https://www.npmjs.com/package/@jkr26/react-forms-builder-logic
[npm-dependencies-image]: https://img.shields.io/david/jeiker26/react-builder-form.svg
[npm-dependencies-url]: https://david-dm.org/jeiker26/react-builder-form
[release-image]: https://img.shields.io/github/release-date/jeiker26/react-builder-form.svg
[release-url]: https://github.com/jeiker26/react-builder-form/releases
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/