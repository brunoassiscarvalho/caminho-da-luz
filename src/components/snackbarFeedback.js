import React, { Component } from 'react'
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

export default class SnackbarFeedback extends Component {

  constructor(props){
    super(props)
    this.state = {...props}
    this.handleClose = this.handleClose.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    // Sempre que o usuário atual mudar,
    // Redefina quaisquer partes do estado que estejam vinculadas a esse usuário.
    // Neste exemplo simples, seria apenas o email.
    if (props.message !== state.message) {
      return {
        message: props.message,
        status: props.status,
        open: true              
      };
    }
    return null;
  }


  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false})
  };

  

  transitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  render() {    
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={6000}
        TransitionComponent={this.transitionDown}
        onClose={this.handleClose}
        key={this.state.message}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={this.state.status || "info"  }
          onClose={this.handleClose}>
          {this.state.message}
        </MuiAlert>
      </Snackbar>
    )
  }
}