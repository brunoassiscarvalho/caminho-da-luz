
import React, { Component } from 'react';
import { Container, Grid, GridList, GridListTile, ListSubheader, ButtonBase, Paper, Typography } from '@material-ui/core'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { Link as RouterLink } from 'react-router-dom';
import IconCard from '../../components/IconCard';


const facilities = [
  {
    icon: PeopleAltIcon,
    name: "Participantes",
    description: "Gerenciar os participantes do postinho caminho da luz",
    url: "/main/participant"
  },
  {
    icon: PlaylistAddCheckIcon,
    name: "Evento",
    description: "Criar e alterar os eventos do postinho caminho da luz",
    url: "/main/event"
  },


]

export default class FacilitiesGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (

      <Grid container justify="center" spacing={3}>
        {facilities.map((facility) =>
          <IconCard {...facility}></IconCard>
        )}
      </Grid>

    );
  }
}