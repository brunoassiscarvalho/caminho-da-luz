import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormComponent from '../../components/formComponent'
import UserService from './userService';
import { Link as RouterLink} from 'react-router-dom';


const schema = {
  type: "object",
  required: ["name", "password", "password2"],
  properties: {
    name: { type: "string", title: "Nome" },
    password: { type: "string", minLength: 6, title: "Nova Senha" },
    password2: { type: "string", minLength: 6, title: "Confirme a senha" },
  }
};

const uiSchema = {
  password: {
    "ui:widget": "password"
  },
  password2: {
    "ui:widget": "password"
  },
}

export default class UserValidate extends Component {
  constructor(props) {
    super(props)
    this.state={}
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
      this.setState({success:true}))
      .catch((err) =>
        console.log("erro", err)
      )
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          Alteração de senha
         {!this.state.success && <FormComponent
            schema={schema}
            uiSchema={uiSchema}
            validate={this.validate}
            onSubmit={this.onSubmit}
            >
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >
              Salvar
                        </Button>

          </FormComponent>}
          {this.state.success && <>
          Dados registrados com sucesso

          <Button
              component={RouterLink} to="/"
              fullWidth
              variant="contained"
              color="primary"
            >
              Continuar
            </Button>
          </>}
        </Grid>
      </Grid>
    )
  }
}