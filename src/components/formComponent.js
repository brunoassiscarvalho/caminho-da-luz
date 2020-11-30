import React, { Component } from 'react';
import Form from '@rjsf/material-ui';
import {Button} from '@material-ui/core'
import FormattedInputs from './formattedInputs'
import CustomComboBox from './customComboBox';


const widgets = {
  formattedInputs: FormattedInputs,
  SelectWidget: CustomComboBox
}

export default class FormComponent extends Component {

  state = {
    formData: this.props.formData
  };

  static getDerivedStateFromProps(props, state) {
    if (props.formData !== state.formData) {
      return {
        formData: props.formData
      };
    }
    return null;
  }

  render() {
    return (
      <Form
        widgets={widgets}
        {...this.props}
      >
        {this.props.children}
        {this.props.buttonSubmit && <Button
          variant="contained"
          type="submit"
          color="primary"
        >
          {this.props.buttonSubmit || "ok"}
          </Button>}
      </Form>
    );
  }

}