
import React, { Component } from 'react';
import FormComponent from '../../components/formComponent'
import { Container } from '@material-ui/core';

const schema = {
    title: "Assistido",
    type: "object",
    required: ["name", "cpf"],
    properties: {

        name:{type: "string", title: "Nome", default: ""  },
    cpf:{type: "number", title: "CPF", default: ""  },
    birthDate:{type: "string", title: "Data Nascimento", default: "" },
    civilState: {type: "string", title: "Estado Civil", default: "" },
    originState: {type: "string", title: "UF", default: "" },
    originCity: {type: "string", title: "Cidade", default: "" },

        
        // nome: { type: "string", title: "Nome", default: "" },
        // cpf: { type: "string", title: "CPF", default: "" },
        // estadoCivil: { type: "string", title: "Estado Civil", default: "" },
        // familia: {
        //     title: "Família",
        //     type: "array",
        //     items: {
        //         type: "object",
        //         required: ["Nome", "CPF", "CEP"],
        //         properties: {
        //             parentesco: {
        //                 type: "string", title: "Parentesco", default: "",
        //                 "enum": [0, 1, 2],
        //                 "enumNames": ["conjuge", "irmã(o)", "filho"]
        //             },
        //             nome: { type: "string", title: "Nome", default: "" },
        //             profissao: { type: "string", title: "Profissão", default: "" },
        //             idade: { type: "string", title: "Idade", default: "" },
        //         }
        //     },
        // },
        // endereco: {
        //     type: "object",
        //     title: "Endereço",
        //     required: ["CEP", "Bairro", "Logradouro"],
        //     properties: {
        //         cep: { type: "string", title: "CEP", default: "" },
        //         bairro: { type: "string", title: "Bairro", default: "" },
        //         logradouro: { type: "string", title: "Logradouro", default: "" },
        //         numero: { type: "string", title: "Número", default: "" },
        //         complemento: { type: "string", title: "Complemento", default: "" },
        //     }
        // },

    }
};

export default class Main extends Component {
    constructor() {
        super()
        console.log("MAIN Constructor")
    }

    onSubmit(data){
        console.log("submit", data.formData)
    }

    render() {
        const { routes } = this.props
        return (
            <Container>
                <FormComponent schema={schema} onSubmit={this.onSubmit}></FormComponent>
            </Container>
        );
    }
}

