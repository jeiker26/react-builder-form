import React from "react";
import { FormSimple } from "./Simpleform";
import { CompleteForm } from "./CompleteForm";

export class App extends React.Component {
    render() {
        return (<React.Fragment>
                <FormSimple />
                <CompleteForm />
            </React.Fragment>);
    }
}