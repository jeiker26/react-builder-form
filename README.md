  
Small library to simplify the use of forms in React.

With a simple **higher**-**order** component (HOC), you can get:
1.  The values ​​of the inputs.
2.  The status of the form.
3.  Control of validations.

## Todo
- Tests.
- Installation (In progress NPM package).
- Examples.

## Getting Started

### Installation (In progress NPM package)
You can install with [NPM](https://npmjs.com/)

### Usage


### Doc
#### Functions
| function | params | description |
|--|--|--|
| `setElements()` | `{ exampleFieldName: { defaultValue: "foo", validators: [Validator1, Validator2, ValidatorN ] } }` | Add the form fields, along with their default value and validations. Method used in the `componentDidMount()` |
| `setValues()` | `{ nameField1: "foo", nameField2: "var", nameFieldN: "test" }` | Set values. The form must have the `loading` to `false`. |
| `clear()` | `no params` | Set default values ​​for `errors`, `values` ​​and `isValid`.
| `compile()` | `no params` | Check all the validators of all the fields and set the values ​​of the form: `values`, `errors` and `isValid`

#### Render props
| prop | types | default value | description |
|--|--|--|--|
| `elements` | `{ defaultValue: string, validators: Validators[]}` | `null` | Form elements. |
| `errors` | `{ elementKey: String[], ... }` | `{}` | Errors by fields. |
| `values` | `{ element: String, ... }` | `{}` | Values by fields. |
| `isValid` | `boolean` | `false`| All fields comply with their validations. After `compile()`. |
| `loading` | `boolean` | `true` | `false`, when the form is ready. After `setElements()`.|

## Examples (in progress)

* [Basics]
```jsx
class BasicFormComponent extends React.Component {
	componentDidMount() {
		// Add elements
		this.props.form.setElements({
			name: {
				defaultValue: "Jeus",
				validators: []
			}
		});
	}

	componentDidUpdate(prevProps) {
		// Check if isValid form
		if (this.props.form.isValid) {
			console.log("Form data:", this.props.form.values);
			console.log("Form errors:", this.props.form.errors);
		}
	}

	render() {
		const { form } = this.props;
		return form.loading ?
            (<p>Loading...</p>)
            :
            (<div>
                Soy un formulario
                <form onSubmit={e  => {
                    e.preventDefault();
                    form.compile();
                }}>
                {/** Add property value and onChange to the field */}
                <input 
                    type="text"
                    value={form.elements.name.value}
                    onChange={form.elements.name.onChange} />
                    
                    {/** Get field errors */}
                    {form.errors.name && form.errors.name.map(e  => (<span  key={e}  style={{color:  "red"}}>{e}</span>))}

                    <button>Submit</button>
                </form>
            </div>);
	}

}

export const BasicForm = formWrapper(BasicFormComponent);
```
* [Avanced Validation]


---

MIT License.

---
