import { Container } from '@material-ui/core';
import React, { Component } from 'react'
import ParticipantService from './participantService';
import {ListItem, ListItemText} from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} component={RouterLink} to={`/main/participant-detail/${props.participantId}`}/>;
  }


export default class Main extends Component {
    constructor() {
        super()
        this.participantService = new ParticipantService()
        this.state = {};
    }

    componentDidMount() {
        this.getParticipantList();
    }

    getParticipantList() {
        this.participantService.getParticiantList().then((data) => {
            console.log(data)
            this.setState({ listParticipants: data.data })
        })
    }

    render() {
        const { routes } = this.props
        return (
            <Container style={{ paddingBottom: 80, paddingTop: 20 }}>
                {this.state.listParticipants &&
                    this.state.listParticipants.map((participant) =>
                        <ListItemLink participantId={participant._id}>
                            <ListItemText primary={`${participant.cpf} - ${participant.name}`} />
                        </ListItemLink>
                    )

                }
            </Container>
        );
    }
}

