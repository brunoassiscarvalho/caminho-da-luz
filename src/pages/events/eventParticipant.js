import React, { Component } from 'react'
import ParticipantService from '../participant/participantService';
import { Container } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import EventDetail from './eventDetail';
import ListParticipants from '../../components/listParticipants';
import EventService from './eventService';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';

class EventParticipant extends Component {
  constructor(props) {
    super(props)
    this.participantService = new ParticipantService()
    this.eventService = new EventService()
    this.state = {};
    this.listParticipants = [];
    const { eventId } = this.props.match.params;
    // this.onChange = this.onChange.bind(this)
    this.selectParticipant = this.selectParticipant.bind(this)
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

  // onChange(event) {
  //   console.log("onchange", event.target.value)
  //   const filtredList = this.listParticipants.filter(
  //     (participant) => {
  //       if (participant.name.includes(event.target.value) || participant.cpf.includes(event.target.value)) return true;
  //       return false
  //     }
  //   )
  //   this.setState({ listParticipants: filtredList })
  // }

  selectParticipant(participant) {
    console.log("participante", participant)
    this.props.history.push(`/main/participant/detail/${participant._id}`)
  }

  render() {
    return (
      <Container style={{ paddingBottom: 80, paddingTop: 20 }}>
        <EventDetail eventId={this.eventId}></EventDetail>
        {this.state.listParticipants &&
          <ListParticipants
            list={this.state.listParticipants}
            onClick={this.selectParticipant} />
        }
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 50 }}
          component={RouterLink}
          to={`/main/event/add-participant/${this.eventId}`}>
          <AddIcon />
        </Fab>
      </Container>
    );
  }
}

export default withRouter(EventParticipant)

