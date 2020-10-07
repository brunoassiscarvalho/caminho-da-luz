import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core'

export default function Login() {
    return (
        <Container maxWidth="sm">
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Usuário" />
                <TextField id="standard-basic" label="Senha" />
                <Button component={RouterLink} to="/main">
                    Entrar
                </Button>
            </form>
        </Container>
    )
}