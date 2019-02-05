  
Small library to simplify the use of forms in React.

With a simple **higher**-**order** component (HOC), you can get:
1.  The values ​​of the inputs.
2.  The status of the form.
3.  Control of validations.

## Todo
- Tests.
- Tests Props order props.
- Open fields properties for include (onclick, onFocus, ...)
- Installation (In progress NPM package). [rollup](https://github.com/rollup/rollup)
- Examples.

## Getting Started

### Installation (In progress NPM package)
You can install with [NPM](https://npmjs.com/)

## Examples (in progress)

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
| `getInputCheck()` | `nameField` | Get input attributes. Only for check and radio, not multiple.


getInputCheck

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