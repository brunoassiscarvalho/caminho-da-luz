


import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
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

    function onSubmit(form) {
        loginService.authenticate(form.formData).then(
            (data) => {
                console.log("auth ok:", data.data)
                history.push('/main')
            }
        ).catch(err => {
            setOpen(true);
            console.log(err)
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
                    <FormComponent schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}></FormComponent>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        component={RouterLink} to="/main"
                    >
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueci minha senha?
                    </Link>
                        </Grid>
                        {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
        <Copyright />
      </Box> */}
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
                    Dados incorretos. Não foi possível entrar.
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}