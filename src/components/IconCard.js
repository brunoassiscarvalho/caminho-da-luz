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

  componentDidMount() {
    this.setState({size:this.defineSize(this.props.size)})
  }

  defineSize(size) {
    switch (size) {
      case 'large':
        return 200
      case 'medium':
        return 100
      case 'small':
        return 50
      default: 
        return 200
    }
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
            <Paper style={{ width: 200, height: 200 }}>
              <Grid container justify="center" spacing={1}>
                <Grid item xs={24} sm={12} style={{ textAlign: "center" }}>
                  <this.props.icon style={{ width: 60, height: 60, marginTop: 40 }} color="action" />
                </Grid>
                <Grid item xs={24} sm={12} style={{ textAlign: "center" }}>
                  <Typography variant="button" display="block" gutterBottom>
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
