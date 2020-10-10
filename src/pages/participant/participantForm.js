
import React, { Component } from 'react';
import FormComponent from '../../components/formComponent'
import { Container } from '@material-ui/core';
import ParticipantService from './participantService';
import Utils from '../../utils/utils'


const schema = {
    title: "Dados Pessoais",
    type: "object",
    required: ["name", "cpf"],
    properties: {

        name: { type: "string", title: "Nome", default: "" },
        cpf: { type: "string", title: "CPF", default: "", maxLength: 11 },
        profession: { type: "string", title: "Profissão", default: "" },
        birthDate: { type: "string", title: "Data Nascimento", default: "" },
        civilState: { type: "string", title: "Estado Civil", default: "" },
        originState: { type: "string", title: "UF", default: "" },
        originCity: { type: "string", title: "Cidade", default: "" },
               
        endereco: {
            type: "object",
            title: "Endereço",
            required: ["CEP", "Bairro", "Logradouro"],
            properties: {
                cep: { type: "string", title: "CEP", default: "" },
                bairro: { type: "string", title: "Bairro", default: "" },
                logradouro: { type: "string", title: "Logradouro", default: "" },
                numero: { type: "string", title: "Número", default: "" },
                complemento: { type: "string", title: "Complemento", default: "" },
            }
        },
        tel: {
            title: "Telefone(s)",
            type: "array",
            items: {type: "string", title: "Número", default: ""}
        }, 
        familia: {
            title: "Família",
            type: "array",
            items: {
                type: "object",
                properties: {
                    parentesco: {
                        type: "string", title: "Parentesco", default: "",
                        "enum": [0, 1,],
                        "enumNames": ["conjuge", "filha(o)"]
                    },
                    nome: { type: "string", title: "Nome", default: "" },
                    profissao: { type: "string", title: "Profissão", default: "" },
                    idade: { type: "string", title: "Idade", default: "" },
                    isParticipant: { type: "boolean", title: "Frequenta o Postinho?", default: "" },
                }
            },
        },

    }
};



export default class Main extends Component {
    constructor() {
        super()
        console.log("MAIN Constructor")
        this.participantService = new ParticipantService()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(data) {
        this.participantService.createParticipant(data.formData).then()
        console.log("submit", data.formData)
    }

    validate(formData, errors) {
        console.log("validadte", formData.cpf)
        if (!Utils.isValidCPF(formData.cpf.toString())) {
            errors.cpf.addError("CPf Inváldo");
        }
        return errors;
    }

    render() {
        const { routes } = this.props
        return (
            <Container>
                <FormComponent
                    schema={schema}
                    onSubmit={this.onSubmit}
                    validate={this.validate}></FormComponent>
            </Container>
        );
    }
}

