Small library to simplify the use of forms in React 
------

[![build status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/github/jeiker26/react-builder-form/badge.svg?branch=master)](https://coveralls.io/github/jeiker26/react-builder-form?branch=master) [![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] 
[![license](https://img.shields.io/github/license/jeiker26/react-builder-form.svg)](https://github.com/jeiker26/react-builder-form) [![NPM downloads][npm-downloads-image]][npm-downloads-url] [![code style: prettier](https://badgen.net/badge/code%20style/prettier/green)](https://github.com/prettier/prettier) 
[![Last commit][last-commit-image]][last-commit-url] [![PRs welcome](https://badgen.net/badge/PRs/welcome/green)](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![node version](https://badgen.net/badge/node/>=5.4/green)](http://nodejs.org/download/)
![minzipped size](https://badgen.net/bundlephobia/minzip/@jkr26/react-forms-builder-logic)

With a simple **higher**-**order** component (HOC), you can get:
1.  The values of the inputs.
2.  The status of the form.
3.  Control of validations.


------

## Examples.
- [Simple Form](https://codesandbox.io/s/xpnyv4vpyo)
- [Advanced Form](https://codesandbox.io/s/18vkn34l6j)
- [Field Generator Form](https://codesandbox.io/s/w02lkn71vw)
- [Custom Fields](https://codesandbox.io/s/qxqpr7klp4) Use of the getInput interface ({ name, value, onChange})

## Getting Started

### Installation
You can install with [NPM](https://npmjs.com/): [@jkr26/react-forms-builder-logic](https://www.npmjs.com/package/@jkr26/react-forms-builder-logic)
```js
npm i --save @jkr26/react-forms-builder-logic 
```

### Step 1: Create your component and do the HOC
```jsx
import { formWrapper, Form } from "@jkr26/react-forms-builder-logic";

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
        <Form form={form}>
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
        </Form>
      </div>
    );
  }
  ...
```


### Step 4: Wrapper form html
```jsx
    ...
    <Form form={form}>
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
        <Form form={form}>
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

### Doc
#### Functions
| function | params | description |
|--|--|--|
| `initForm()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }`, `boolean` | Add the init form fields, along with their default value and validations. The second parameter indicates validations in real time, by default false. Method used in the `contructor()` |
| `setFields()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }` | Add the form fields, along with their default value and validations. |
| `setValues()` | `{ nameField1: "foo", nameField2: "var", nameFieldN: "test" }` | Set values. The form must have the `loading` to `false`. |
| `clear()` | `no params` | Set default values ​​for `errors`, `values` ​​and `isValidAfterSubmit`.
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


#### Component Form
Although the philosophy is not to create components, for the best control of the form we had to create a Form component to guarantee the load cycles and the alerts of uncontrolled components when they change to controlled:
```jsx
    ...
    <Form form={this.props.form}>
    ...
```

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
[travis-image]: https://travis-ci.org/jeiker26/react-builder-form.svg?branch=master
[travis-url]: https://travis-ci.org/jeiker26/react-builder-form
