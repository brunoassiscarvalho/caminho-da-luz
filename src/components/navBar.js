import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  console.log("caminhoDaLuz-name", sessionStorage.getItem("caminhoDaLuz-name"))
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Caminho da Luz
        </Typography>
        <Button color="inherit" component={RouterLink} to="/main/user">
          {sessionStorage.getItem("caminhoDaLuz-name") ||
            sessionStorage.getItem("caminhoDaLuz-email") ||
            ""}
        </Button>
      </Toolbar>
    </AppBar>

  );
}

