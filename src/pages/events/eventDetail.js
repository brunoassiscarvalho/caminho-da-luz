import React, { Component } from 'react'
import { Container, Grid } from '@material-ui/core'
import EventService from './eventService';
import TextLabel from '../../components/textLabel';
import IconCard from '../../components/IconCard';
import EditIcon from '@material-ui/icons/Edit';
import moment from'moment'

export default class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.eventService = new EventService();
    const { eventId } = this.props.match?.params || this.props;
    this.eventId = eventId;
  }

  componentDidMount() {
    this.getEvent(this.eventId);
  }

  getEvent(eventId) {
    this.eventService.getEvent(eventId).then(data => {
      moment.locale('pt-br')      
      data.date = moment.utc(data.date).format('DD/MM/YYYY')
      this.setState({ event: data })
    })
  }

  render() {
    return (
      <Container>
        {this.state.event &&
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <TextLabel label={'Nome'} value={this.state.event.name} ></TextLabel>
                <TextLabel label={'Descrição'} value={this.state.event.descrption} ></TextLabel>
                <TextLabel label={'Data de início'} value={this.state.event.date} ></TextLabel>
                <TextLabel label={'Capacidade'} value={this.state.event.capacity} ></TextLabel>
                {this.state.event.closeDate && <TextLabel label={'nome'} value={this.state.event.closeDate} ></TextLabel>}
              </Grid>
            </Grid>
            {/* <Grid item xs={6} sm={3}>
              <IconCard const url="/main/participant/new" name="participante" icon={AddIcon} ></IconCard>
            </Grid> */}
            <Grid item xs={6} sm={3}>
            <IconCard const url={`/main/event/edit/${this.eventId}`} name="editar" icon={EditIcon} ></IconCard>
            </Grid>
          </Grid>
        }
      </Container>
    )
  }
}