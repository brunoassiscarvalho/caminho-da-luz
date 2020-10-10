import React from 'react';
import Form from '@rjsf/material-ui';

// const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);

export default function formComponent({ routes, schema, formData, onSubmit, validate }) {
    return (
        <Form schema={schema}
            formData={formData}
            onChange={console.log("changed")}
            onSubmit={onSubmit}
            validate={validate}
            onError={console.log("errors")} />
    );
}