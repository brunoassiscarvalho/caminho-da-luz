import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import LoginService from './loginService';
import FormComponent from '../../components/formComponent'

const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", title: "Email", default: "" },
    password: { type: "string", title: "Senha", default: "" },
  }
};

const uiSchema = {
  password: {
    "ui:widget": "password"
  },
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const loginService = new LoginService();


export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [erroMessage, setErroMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  function onSubmit(form) {
    setEmail(form.formData.email);
    loginService.authenticate(form.formData).then(
      () => {
        history.push('/main')
      }
    ).catch(err => {
      setErroMessage(err.response?.data?.error || "Não foi possível logar")
      setOpen(true);
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Caminho da Luz
				</Typography>
        <form className={classes.form} noValidate>
          <FormComponent schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} formData={{ email }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
					</Button>
          </FormComponent>

          <Grid container>
            <Grid item xs>
              <Link to="/reset-pass" variant="body2">
                Esqueci minha senha?
					</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key="snack">
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleClose}>
          {erroMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}