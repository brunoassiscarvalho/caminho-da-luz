import React, { Component } from 'react'
import { Container, Typography, Grid, Divider } from '@material-ui/core'
import TextLabel from '../../components/textLabel'
import ParticipantService from './participantService'
import { MARITAL_STATUS, KINSHIP } from '../../utils/constants'
import moment from 'moment'

export default class ParticipantDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.participantService = new ParticipantService()
    const { participantId } = this.props.match?.params || this.props;
    this.participantId = participantId;
  }

  componentDidMount() {
    this.getParticipant(this.participantId);
  }

  getParticipant(participantId) {
    this.participantService.getParticipant(participantId).then(data => {
      moment.locale('pt-br')      
      data.birthDate = moment.utc(data.birthDate).format('DD/MM/YYYY')
      this.setState({ participant: data })
    })
  }

  render() {
    return (
      <Container>
        <Typography variant="h4" gutterBottom style={{textAlign:'center'}}>
          Participante
      </Typography>

        {this.state.participant &&
          <Grid container spacing={1} >

            {/* <Fab
              color="primary"
              aria-label="add"
              style={{ position: "fixed", top: 100, right: 50 }}
              component={RouterLink}
              to={`/main/participant/edit/${this.participantId}`}>
              <EditIcon />
            </Fab> */}

            <TextLabel label={'nome'} value={this.state.participant.name} ></TextLabel>
            <TextLabel label={'CPF'} value={this.state.participant.cpf} ></TextLabel>
            <TextLabel label={'Profissão'} value={this.state.participant.profession} ></TextLabel>
            <TextLabel label={'Data de nascimento'} value={this.state.participant.birthDate} ></TextLabel>
            <TextLabel label={'Estado civil'} value={MARITAL_STATUS[this.state.participant.civilState]} ></TextLabel>
            <Grid item xs={12}>
                      <Divider light />
                    </Grid>
            {this.state.participant.family && this.state.participant.family.length > 0 &&
              <>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom style={{textAlign:'center'}}>
                    Família
                </Typography>
                </Grid>
                {this.state.participant.family.map((person) =>
                  <Grid container spacing={1}>
                    <TextLabel label={'Relação'} value={KINSHIP[person.kinship]} ></TextLabel>
                    <TextLabel label={'Nome'} value={person.name} ></TextLabel>
                    <TextLabel label={'Profissão'} value={person.profission} ></TextLabel>
                    <TextLabel label={'Idade'} value={person.age} ></TextLabel>
                    <TextLabel label={'É participante'} value={person.isParticipant ? "sim" : "não"} ></TextLabel>
                    <Grid item xs={12}>
                      <Divider light />
                    </Grid>
                  </Grid>

                )}
              </>
            }
          </Grid>
        }
      </Container>
    )
  }
}