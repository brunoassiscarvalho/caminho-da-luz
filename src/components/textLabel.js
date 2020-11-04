import React, { Component } from 'react'
import { Typography, Grid } from '@material-ui/core'

export default class TextLabel extends Component {


  render() {
    const { label, value } = this.props;
    return (
      <>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle2" gutterBottom style={{ marginRight: 15, paddingTop:1 }}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1" gutterBottom>
            {value}
          </Typography>
        </Grid>
      </>
    )
  }
}