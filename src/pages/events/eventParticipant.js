import React, { Component } from 'react'
import ParticipantService from '../participant/participantService';
import { Container, Box, Fab, Divider } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import EventDetail from './eventDetail';
import ListParticipants from '../../components/listParticipants';
import EventService from './eventService';
import AddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';


class EventParticipant extends Component {
  constructor(props) {
    super(props)
    this.participantService = new ParticipantService()
    this.eventService = new EventService()
    this.state = {};
    this.listParticipants = [];
    const { eventId } = this.props.match.params;
    this.selectParticipant = this.selectParticipant.bind(this)
    this.getEvent = this.getEvent.bind(this);
    this.eventId = eventId;
  }

  componentDidMount() {
    this.getRegistries();
  }

  getParticipantList() {
    this.participantService.getParticiantList().then((data) => {
      this.listParticipants = data;
      this.setState({ listParticipants: data })
    })
  }

  getRegistries() {
    this.eventService.getRegistries({ event: this.eventId }).then((data) => {
      this.listParticipants = data;
      this.setState({ listParticipants: data })
    })
  }

  selectParticipant(participant) {
    console.log("participante", participant)
    this.props.history.push(`/main/participant/detail/${participant._id}`)
  }

  getEvent(event) {
    this.setState({ event }, () => console.log("getEvent", this.state.event));
  }

  render() {
    return (
      <Container style={{ paddingBottom: 80, paddingTop: 20 }}>
        <EventDetail eventId={this.eventId} onGetEvent={this.getEvent}></EventDetail>
        {this.state.listParticipants &&
          <Box style={{marginTop: 20}}>
            <Divider light style={{marginBottom: 20}}/>
            <ListParticipants
              list={this.state.listParticipants}
              onClick={this.selectParticipant}
            />
            {this.state.event &&
              <Box component="div" m={1} style={{ position: "fixed", bottom: 50 }}>
                <Fab
                  color="secondary"
                  aria-label="add"
                  component={RouterLink}

                  to={`/main/event/edit/${this.eventId}`}>
                  <EditIcon />
                </Fab>
                <Fab
                  variant={this.state.listParticipants.length >= this.state.event.capacity ? "extended" : "round"}
                  disabled={this.state.listParticipants.length >= this.state.event.capacity}
                  color="primary"
                  aria-label="add"
                  style={{ marginLeft: 60 }}
                  component={RouterLink}
                  to={`/main/event/add-participant/${this.eventId}`}>
                  <AddIcon /> {this.state.listParticipants.length >= this.state.event.capacity ? "esgotado" : ""}
                </Fab>
              </Box>}
          </Box>
        }
      </Container>
    );
  }
}

export default withRouter(EventParticipant)

