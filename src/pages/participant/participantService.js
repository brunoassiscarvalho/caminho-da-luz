import Service from "../../api/service"
import axios from "axios"

export default class ParticipantService extends Service {

  async createParticipant(params) {
    console.log("create", params)
    const res = await this.requestServer("POST", "/participant/create", params)
    return res.data;
  }

  async getParticiantList() {
    const res = await this.requestServer("GET", "/participant/list")
    return res.data;
  }

  async getParticipant(id) {
    const res = await this.requestServer("GET", "/participant/detail", { id })
    return res.data;
  }

  async updateParticipant(params) {
    const res = await this.requestServer("PUT", "/participant/update", params)
    return res.data;
  }

  async getStates() {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    const res = await axios.get(url);
    return res.data;
  }
  async getCities(state) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
    const res = await axios.get(url)
    return res.data;
  }

  async getAddress(cep) {
    const url = `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`
    const res = await axios.get(url)
    return res.data;
  }
}