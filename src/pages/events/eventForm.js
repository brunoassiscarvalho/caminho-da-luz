import React, { Component } from 'react'
import { Container, Button } from '@material-ui/core'
import FormComponent from '../../components/formComponent';
import SnackbarFeedback from '../../components/snackbarFeedback';
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
  description:{
    "ui:widget":"textarea"
  }
   
}

export default class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.eventService = new EventService();
    const { eventId} = this.props.match.params;
    this.eventId = eventId;
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    if(this.eventId) this.getEvent(this.eventId)
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
      this.setState({ formData: data })
      this.setState({ feedBackMessage: "Evento criado com sucesso", feedBackStatus: "success" })
    }).catch((err) => {
      this.setState({ feedBackMessage: err.response.data.error, feedBackStatus: "error" })
    })

  }

  updateEvent(data) {
    this.eventService.updateEvent(data.formData).then((data) => {  
      if (data.date) data.date = data.date.toString().split("T")[0];    
      this.setState({ formData: data }, () => this.setState({ feedBackMessage: "Evento Atualizado com sucesso", feedBackStatus: "success" }))
    }).catch((err) => {
      this.setState({ feedBackMessage: err.response.data.error, feedBackStatus: "error" })
    })
    this.setState({ formData: this.copyformData })
  }

  render() {
    return (
      <Container>
        {/* {this.state.schemaForm && */}
        <FormComponent
          formData={this.state.formData}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={this.onSubmit}
        >
          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Salvar
                        </Button>
        </FormComponent>
        {/* } */}
        {(this.state.feedBackMessage && this.state.feedBackStatus) && <SnackbarFeedback message={this.state.feedBackMessage} status={this.state.feedBackStatus} ></SnackbarFeedback>}

      </Container>
    )
  }
}