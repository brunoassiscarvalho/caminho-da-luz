import React, { Component } from 'react'
import { ListItem, ListItemText, IconButton, InputBase, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export default class ListParticipants extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.listParticipants = this.props.list
    this.state = { listParticipants: this.props.list }
  }

  onChange(event) {
    console.log("onchange", event.target.value)
    const filtredList = this.listParticipants.filter(
      (participant) => {
        if (participant.name.toLowerCase().includes(event.target.value.toLowerCase()) || participant.cpf.includes(event.target.value)) return true;
        return false
      }
    )
    this.setState({ listParticipants: filtredList })
  }

  onClick(participant) {
    if (this.props.onClick) this.props.onClick(participant)
  }

  render() {
    return (
      <>
        <Paper component="form" >
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Pesquisar"
            inputProps={{ 'aria-label': 'Pesquisar' }}
            onChange={this.onChange}
          />
        </Paper>
        {
          this.state.listParticipants.map((participant) =>
            <ListItem button component="a">
              <ListItemText primary={`${participant.cpf} - ${participant.name}`} onClick={() => this.onClick(participant)} />
            </ListItem>
          )
        }
      </>
    )
  }

}