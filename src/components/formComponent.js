import React from 'react';
import Form from '@rjsf/material-ui';
import FormattedInputs from './formattedInputs'

const widgets = {
	"formattedInputs": FormattedInputs
}

export default function FormComponent(props) {
	return (
		<Form
			widgets={widgets}
			{...props}
		>
			{props.children}
		</Form>
	);
}