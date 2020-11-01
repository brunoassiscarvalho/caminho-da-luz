
import React, { Component } from 'react';
import {Grid} from '@material-ui/core'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
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