
import React, { Component } from 'react';
// import FormComponent from '../../components/formComponent'
import Form from '@rjsf/material-ui';
import { Container, Snackbar, Fab } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ParticipantService from './participantService';
import Utils from '../../utils/utils'
import Slide from '@material-ui/core/Slide';
import { NavigationIcon, Add as AddIcon } from '@material-ui/icons';


const schema = {
    title: "Dados Pessoais",
    type: "object",
    required: ["name", "cpf"],
    properties: {
        name: { type: "string", title: "Nome", default: "" },
        cpf: { type: "string", title: "CPF", default: "" },
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
                cep: { type: "string", title: "CEP", default: "" },
                neighbor: { type: "string", title: "Bairro", default: "" },
                street: { type: "string", title: "Logradouro", default: "" },
                number: { type: "string", title: "Número", default: "" },
                complement: { type: "string", title: "Complemento", default: "" },
            }
        },
        tel: {
            title: "Telefone(s)",
            type: "array",
            items: { type: "string", title: "Número", default: "" }
        },
        family: {
            title: "Família",
            type: "array",
            items: {
                type: "object",
                properties: {
                    kinship: {
                        type: "string", title: "Parentesco", default: "",
                        "enum": [0, 1,],
                        "enumNames": ["conjuge", "filha(o)"]
                    },
                    name: { type: "string", title: "Nome", default: "" },
                    profission: { type: "string", title: "Profissão", default: "" },
                    age: { type: "string", title: "Idade", default: "" },
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

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }


export default class Main extends Component {
    constructor() {
        super()
        console.log("MAIN Constructor")
        this.participantService = new ParticipantService()
        this.onSubmit = this.onSubmit.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleClose = this.handleClose.bind(this)

        this.state = { formData: {}, disableForm: false };
        this.copyformData = {};

    }

    componentDidMount() {
        this.insertStatesAndCitiesOnSchema();
    }

    insertStatesAndCitiesOnSchema() {
        this.participantService.getStates().then((data) => {
            const states = data.data.map(item => item.sigla)
            schema.properties.originState.enum = states;
            states.map(stateItem => {
                this.participantService.getCities(stateItem).then((data) => {
                    const citiesList = data.data.map(city => city.nome)
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
        this.participantService.createParticipant(data.formData).then((data) => {
            console.log("err.message 3", data)
            this.setState({ feedBackMessage: "Participante cadastado com sucesso", feedBackStatus: "success" })
        }).catch((err) => {
            console.log("err.message", err.response.data)
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
                    neighbor: data.data.bairro,
                    street: data.data.logradouro
                }
                this.setState({ formData: { ...this.copyformData, address: address } });
            })
        }
    }
    handleClose() {
        this.setState({ feedBackMessage: false, feedBackStatus: "" })
    }

    validate(formData, errors) {
        if (!Utils.isValidCPF(formData.cpf.toString())) {
            errors.cpf.addError("CPf Inváldo");
        }
        return errors;
    }

    TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }



    render() {
        const { routes } = this.props
        return (
            <Container style={{ paddingBottom: 80, paddingTop:20 }}>
                {this.state.schemaForm &&
                    <Form
                        formData={this.state.formData}
                        schema={schema}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        disabled={this.state.disableForm}
                    >
                    </Form>
                }

                <Snackbar
                    open={this.state.feedBackMessage}
                    autoHideDuration={6000}
                    TransitionComponent={this.TransitionDown}
                    onClose={this.handleClose}
                    key="snack">
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity={this.state.feedBackStatus}
                        onClose={this.handleClose}>
                        {this.state.feedBackMessage}
                    </MuiAlert>
                </Snackbar>
            </Container>
        );
    }
}

