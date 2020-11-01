import { Container } from '@material-ui/core';
import React, { Component } from 'react'
import ParticipantService from './participantService';
import { Link as RouterLink, withRouter  } from 'react-router-dom';
import AddIcon from '@material-ui/icons/PersonAdd';
import Fab from '@material-ui/core/Fab';
import ListParticipants from '../../components/listParticipants';


// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} component={RouterLink} to={`/main/participant/detail/${props.participantId}`} />;
// }

class ParticipantList extends Component {
  constructor() {
    super()
    this.participantService = new ParticipantService()
    this.state = {};
    this.listParticipants = [];
    this.selectParticipant = this.selectParticipant.bind(this)
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
    console.log(participant)
    this.props.history.push(`/main/participant/edit/${participant._id}`)
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

        <Fab color="primary" aria-label="add" style={{ position: "fixed", bottom: 50 }} component={RouterLink} to="/main/participant/new">
          <AddIcon />
        </Fab>
      </Container>
    );
  }
}


export default withRouter(ParticipantList)