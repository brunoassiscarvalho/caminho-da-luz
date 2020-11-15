import React, { Component } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import FormComponent from '../../components/formComponent'
import UserService from './userService';
import { Link as RouterLink} from 'react-router-dom';

const schema = {
  type: "object",
  properties: {
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

export default class UserPass extends Component {
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
    console.log("data",data.formData);
    this.userService.changePass({ password: data.formData.password }).then(() =>
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
            onSubmit={this.onSubmit}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >
              Salvar
                        </Button>

          </FormComponent>}

          {this.state.success &&
          <>
            <Typography variant="subtitle1">
              Senha alterada com sucesso!!!
            </Typography>
            <Button
              component={RouterLink} to="/"
              fullWidth
              variant="contained"
              color="primary"
            >
              Ir para o Login
            </Button>
          </>
        }
        </Grid>
      </Grid>
    )
  }
}