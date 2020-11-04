import React, { Component } from 'react'
import { Grid, ButtonBase, Paper, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Brightness1Icon from '@material-ui/icons/Brightness1';

export default class IconCard extends Component {

  constructor(props) {
    super(props)
    this.state = { size: 200 }
  }


  render() {
    const { url, name } = this.props
    return (
      <Grid key={url} item>
        <ButtonBase
          focusRipple
          key={name}
          component={RouterLink} to={url}
        >
          <Paper style={{ width: 100, height: 100 }} color="secondary">
            <Grid container justify="center" spacing={0}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <this.props.icon style={{ width: 50, height: 50, marginTop: 10, }} color="action" />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant="button" display="block" gutterBottom style={{ fontSize: "x-small", marginTop: "3px" }}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </ButtonBase>
      </Grid>
    )
  }
}

IconCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.element
}
IconCard.defaultProps = {
  icon: Brightness1Icon
}
