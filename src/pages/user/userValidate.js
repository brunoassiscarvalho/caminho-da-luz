import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormComponent from '../../components/formComponent'
import UserService from './userService';


const schema = {
  type: "object",
  properties: {    
    name: { type: "string", title: "Nome" },
    password: { type: "string", minLength: 6, title: "Nova Senha" },
    password2: { type: "string", minLength: 6, title: "Confirme a senha" },
  }
};

export default class UserValidate extends Component {
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
    const user = { ...data.formData, email: sessionStorage.getItem("caminhoDaLuz-email") }
    console.log("user ", user)
    this.userService.validateUser(user).then((data) =>
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