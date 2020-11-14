import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormComponent from '../../components/formComponent'
import UserService from './userService';


const schema = {
  type: "object",
  properties: {
    password: { type: "string", minLength: 3 },
    password2: { type: "string", minLength: 3 },
  }
};

export default class UserPass extends Component {
  constructor(props) {
    super(props)
    this.userService = new UserService()
    this.onSubmit = this.onSubmit.bind(this)
  }

  validate(formData, errors) {
    if (formData.password !== formData.password2) {
      errors.password2.addError("Passwords don't match");
    }
    return errors;
  }

  onSubmit(data) {
    console.log("data",data.formData);
    this.userService.changePass({ password: data.formData.password }).then((data) =>
      console.log("Dta", data))
      .catch((err) =>
        console.log("erro", err)
      )
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          Alteração de senha
          <FormComponent
            schema={schema}
            validate={this.validate}
            onSubmit={this.onSubmit}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >
              Salvar
                        </Button>

          </FormComponent>
        </Grid>
      </Grid>
    )
  }
}