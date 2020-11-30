import React, { Component } from 'react'
import { Container} from '@material-ui/core'
import EventService from './eventService';
import TextLabel from '../../components/textLabel';
import moment from 'moment'

export default class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.eventService = new EventService();
    const { eventId } = this.props.match?.params || this.props;
    this.eventId = eventId;
    this.onGetEvent = this.onGetEvent.bind(this)
  }

  componentDidMount() {
    this.getEvent(this.eventId);
  }

  getEvent(eventId) {
    this.eventService.getEvent(eventId).then(data => {
      moment.locale('pt-br')
      data.date = moment.utc(data.date).format('DD/MM/YYYY')
      this.setState({ event: data })
      this.onGetEvent(data)
    })
  }
  onGetEvent(data) {
    if (this.props.onGetEvent!=null)
      this.props.onGetEvent(data)
    return null
  }


  render() {
    return (
      <Container>
        {this.state.event &&
          <>
            <TextLabel label={'Nome'} value={this.state.event.name} ></TextLabel>
            <TextLabel label={'Descrição'} value={this.state.event.descrption} ></TextLabel>
            <TextLabel label={'Data de início'} value={this.state.event.date} ></TextLabel>
            <TextLabel label={'Capacidade'} value={this.state.event.capacity + " participantes"} ></TextLabel>
            {this.state.event.closeDate && <TextLabel label={'nome'} value={this.state.event.closeDate} ></TextLabel>}
          </>
        }
      </Container>
    )
  }
}