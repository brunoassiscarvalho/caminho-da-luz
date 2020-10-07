import React, { Component } from 'react';
import Form from '@rjsf/material-ui';



export default class Main extends Component {
    constructor() {
        super()

    }

    render() {
        const { routes, schema } = this.props
        return (

            <Form schema={schema}
                onChange={console.log("changed")}
                onSubmit={console.log("submitted")}
                onError={console.log("errors")} />


        );
    }
}