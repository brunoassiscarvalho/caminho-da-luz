import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import FormComponent from '../../components/formComponent';
import { withSnackbar } from 'notistack';
import EventService from './eventService';

const schema = {
  title: "Dados Pessoais",
  type: "object",
  required: ["name", "date", "capacity"],
  properties: {
    name: { type: "string", title: "Título", default: "" },
    description: { type: "string", title: "Descrição", default: "" },
    date: { type: "string", title: "Data Início", format: "date" },
    capacity: { type: "number", title: "Capacidade" }
  },
};

const uiSchema = {
  description: {
    "ui:widget": "textarea"
  }

}

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.eventService = new EventService();
    const { eventId } = this.props.match.params;
    this.eventId = eventId;
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.eventId) this.getEvent(this.eventId)
  }
  getEvent(eventId) {
    this.eventService.getEvent(eventId).then(data => {
      if (data.date) data.date = data.date.toString().split("T")[0];
      this.setState({ formData: data })
    })
  }

  onSubmit(data) {
    if (this.eventId)
      this.updateEvent(data)
    else
      this.createEvent(data)
  }

  createEvent(data) {
    this.eventService.createEvent(data.formData).then((data) => {
      if (data.date) data.date = data.date.toString().split("T")[0];
      this.props.enqueueSnackbar("Evento criado com sucesso", { variant: 'success' })
    }).catch((err) => {
      this.props.enqueueSnackbar(err.response.data.error, { variant: 'error' })
    })

  }

  updateEvent(data) {
    this.eventService.updateEvent(data.formData).then((data) => {
      if (data.date) data.date = data.date.toString().split("T")[0];
      this.props.enqueueSnackbar("Evento atualizado com sucesso", { variant: 'success' })
    }).catch((err) => {
      this.props.enqueueSnackbar(err.response.data.error, { variant: 'error' })
    })
  }

  render() {
    return (
      <Container>
        <FormComponent
          formData={this.state.formData}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={this.onSubmit}
        >
          
        </FormComponent>
      </Container>
    )
  }
}

export default withSnackbar(EventForm);