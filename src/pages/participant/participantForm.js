
import React, { Component } from 'react';
import { Container, Button } from '@material-ui/core';
import ParticipantService from './participantService';
import Utils from '../../utils/utils'
import FormComponent from '../../components/formComponent';
import SnackbarFeedback from '../../components/snackbarFeedback';



const schema = {
  title: "Dados Pessoais",
  type: "object",
  required: ["name", "cpf"],
  properties: {
    name: { type: "string", title: "Nome", default: "" },
    cpf: { type: "string", title: "CPF", default: "", format: "cpf" },
    profession: { type: "string", title: "Profissão", default: "" },
    birthDate: { type: "string", title: "Data Nascimento", format: "date" },
    civilState: {
      type: "number", title: "Estado Civil", default: 0,
      "enum": [0, 1, 2, 3, 4, 5],
      "enumNames": [" ", "Solteira(o)", "Casada(o)", "Separada(o)", "Divorciada(o)", "Viúva(o)"]
    },
    originState: {
      type: "string", title: "UF de Nascimento",
      enum: []
    },
    originCity: { type: "string", title: "Cidade de Nascimento" },
    address: {
      type: "object",
      title: "Endereço",
      properties: {
        cep: { type: "string", title: "CEP", default: "", format: "cep" },
        neighbor: { type: "string", title: "Bairro", default: "" },
        street: { type: "string", title: "Logradouro", default: "" },
        number: { type: "string", title: "Número", default: "" },
        complement: { type: "string", title: "Complemento", default: "" },
      }
    },
    tel: {
      title: "Telefone(s)",
      type: "array",
      items: { type: "string", title: "Número", default: "", format: "tel" }
    },
    family: {
      title: "Família",
      type: "array",
      items: {
        type: "object",
        properties: {
          kinship: {
            type: "number", title: "Parentesco", default: "",
            "enum": [0, 1,],
            "enumNames": ["conjuge", "filha(o)"]
          },
          name: { type: "string", title: "Nome", default: "" },
          profission: { type: "string", title: "Profissão", default: "" },
          age: { type: "number", title: "Idade", default: "" },
          isParticipant: { type: "boolean", title: "Frequenta o Postinho?", default: "" },
        }
      },
    },
  },
  dependencies: {
    originState: {
      oneOf: []
    }
  }
};

const UiSchema = {
  cpf: {
    "ui:widget": "formattedInputs",

  },
  telTeste: {
    "ui:widget": "formattedInputs",

  },
  tel: {
    items: {
      "ui:widget": "formattedInputs",
    }
  },
  address: {
    cep: {
      "ui:widget": "formattedInputs",
    }
  }
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.participantService = new ParticipantService()
    this.onSubmit = this.onSubmit.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = { formData: {}, disableForm: false };
    this.copyformData = {};
    const { participantId } = this.props.match.params;
    this.participantId = participantId;
  }

  componentDidMount() {
    if (this.participantId) this.getParticipant(this.participantId);
    this.insertStatesAndCitiesOnSchema();
  }

  getParticipant(participantId) {
    this.participantService.getParticipant(participantId).then(data => {  
      if (data.birthDate) data.birthDate = data.birthDate.toString().split("T")[0];
      this.setState({ formData: data })
    })
  }

  insertStatesAndCitiesOnSchema() {
    this.participantService.getStates().then((data) => {
      const states = data.map(item => item.sigla)
      schema.properties.originState.enum = states;
      states.map(stateItem => {
        this.participantService.getCities(stateItem).then((data) => {
          const citiesList = data.map(city => city.nome)
          const properties = {
            originState: {
              enum: [
                stateItem
              ]
            },
            originCity: { type: "string", title: "Cidade de Nascimento", default: "", enum: citiesList },
          }
          schema.dependencies.originState.oneOf.push({ properties })
        })
        this.setState({ schemaForm: schema });
      }
      )
    })
  }

  onSubmit(data) {
    this.copyformData = data.formData;
    if (this.participantId)
      this.updateParticipant(data)
    else
      this.createParticipant(data)

  }

  createParticipant(data) {
    this.participantService.createParticipant(data.formData).then((data) => {
      if (data.birthDate) data.birthDate = data.birthDate.toString().split("T")[0];
      this.participantId = data._id
      this.setState({ feedBackMessage: "Participante cadastado com sucesso", feedBackStatus: "success" })
    }).catch((err) => {
      this.setState({ feedBackMessage: err.response.data.error, feedBackStatus: "error" })
    })
    this.setState({ formData: this.copyformData })
  }

  updateParticipant(data) {
    this.participantService.updateParticipant(data.formData).then((data) => {
      if (data.birthDate) data.birthDate = data.birthDate.toString().split("T")[0];
      this.setState({ formData: data }, () => this.setState({ feedBackMessage: "Participante Atualizado com sucesso", feedBackStatus: "success" }))
    }).catch((err) => {
      this.setState({ feedBackMessage: err.response.data.error, feedBackStatus: "error" })
    })
    this.setState({ formData: this.copyformData })
  }

  onChange(data) {
    this.copyformData = data.formData;
  }

  onBlur(id, value) {
    if (id === "root_address_cep") {
      this.participantService.getAddress(value).then(data => {
        const address = {
          cep: value,
          neighbor: data.bairro,
          street: data.logradouro
        }
        this.setState({ formData: { ...this.copyformData, address: address } });
      })
    }
  }

  validate(formData, errors) {
    if (!Utils.isValidCPF(formData.cpf.toString())) {
      errors.cpf.addError("CPf Inváldo");
    }
    return errors;
  }

  render() {
    const { routes } = this.props
    return (
      <Container style={{ paddingBottom: 80, paddingTop: 20 }}>
        {this.state.schemaForm &&
          <FormComponent
            formData={this.state.formData}
            schema={schema}
            uiSchema={UiSchema}
            onSubmit={this.onSubmit}
            validate={this.validate}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={this.state.disableForm}
          >
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >
              Salvar
                        </Button>
          </FormComponent>
        }        
        {(this.state.feedBackMessage && this.state.feedBackStatus) && <SnackbarFeedback message={this.state.feedBackMessage} status={this.state.feedBackStatus} ></SnackbarFeedback>}
      </Container>
    );
  }
}

