import React, { Component } from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core'
import EventService from './eventService';
import ParticipantDetail from '../participant/participantDetail';
import { withSnackbar } from 'notistack';

class EventRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.serviceEvent = new EventService();
    const { participantId, eventId } = this.props.match.params;
    this.participantId = participantId;
    this.eventId = eventId;
    this.confirmation = this.confirmation.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    this.serviceEvent.getEvent(this.eventId).then((data) => {
      this.setState({ event: data })
    }).catch()
  }

  confirmation() {
    this.serviceEvent.fetchRegistry({ participant: this.participantId, event: this.eventId }).then((data) => {
      this.setState({ register: true },
        () => this.props.enqueueSnackbar("Registro efetuado com sucesso", { variant: 'success' }))
    }).catch((err) =>
      this.props.enqueueSnackbar(err.response.data.error, { variant: 'error' }))
  }
  goBack() {
    this.props.history.go(-2);
  }

  render() {
    return (
      <Container style={{ paddingTop: 40 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
              {this.state.event?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ParticipantDetail participantId={this.participantId}></ParticipantDetail>
          </Grid>
          {!this.state.register &&
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {`Deseja confirmar a ${this.state.event?.name}?`}
            </Typography>
          </Grid>}
          {!this.state.register &&
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <Button variant="contained" color="primary" onClick={this.confirmation}>
                    Sim
              </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                  <Button variant="contained" color="secondary" onClick={this.goBack}>
                    Não
            </Button>
                </Grid>
              </Grid>
            </Grid>}
        </Grid>
      </Container>
    )
  }
}

export default withSnackbar(EventRegister)