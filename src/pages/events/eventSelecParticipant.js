import { Container } from '@material-ui/core';
import React, { Component } from 'react'
import ParticipantService from '../participant/participantService';
import { withRouter  } from 'react-router-dom';
import ListParticipants from '../../components/listParticipants';


class EventSelectParticipant extends Component {

  constructor(props) {
    super(props)
    this.participantService = new ParticipantService()
    this.state = {};
    this.listParticipants = [];
    this.selectParticipant = this.selectParticipant.bind(this)
    const { eventId } = this.props.match.params;
    this.eventId = eventId
  }

  componentDidMount() {
    this.getParticipantList();
  }

  getParticipantList() {
    this.participantService.getParticiantList().then((data) => {
      console.log("data", data)
      this.listParticipants = data;
      this.setState({ listParticipants: data })
    })
  }

  selectParticipant(participant) {
    console.log("participante", participant)
    this.props.history.push(`/main/event/register/${this.eventId}/${participant._id}`)
  }

  render() {
    return (
      <Container>

        {this.state.listParticipants &&
          <ListParticipants
            list={this.state.listParticipants}
            onClick={this.selectParticipant}
          />
        }        
      </Container>
    )
  }
}

export default withRouter(EventSelectParticipant)