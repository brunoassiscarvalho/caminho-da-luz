
import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core'
import IconCard from '../../components/IconCard';
import EventService from './eventService';
import AddIcon from '@material-ui/icons/Add';

export default class EventGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.serviceEvent = new EventService();
  }

  componentDidMount() {
    this.serviceEvent.getEventList().then((data) => {
      this.setState({ events: data })
    }).catch()
  }

  render() {
    return (
      <Container>
        <Grid container justify="center" spacing={3}>
          <IconCard const url="/main/event/new" name="novo evento" icon={AddIcon} size="large"></IconCard>
          {this.state.events && this.state.events.map((event) =>
            <IconCard {...event} url={`/main/event/participants/${event._id}`} size="large"></IconCard>
          )}
        </Grid>
      </Container>
    );
  }
}