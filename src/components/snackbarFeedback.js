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

  handleClose() {
    this.setState({ message: false, status: "" })
  }

  transitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  render() {    
    return (

      <Snackbar
        open={this.state.message}
        autoHideDuration={6000}
        TransitionComponent={this.transitionDown}
        onClose={this.handleClose}
        key="snack">
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={this.state.status}
          onClose={this.handleClose}>
          {this.state.message}
        </MuiAlert>
      </Snackbar>
    )
  }
}