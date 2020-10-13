import Service from "../../api/service"
import axios from "axios"

export default class ParticipantService extends Service {
  constructor() {
    super();

  }
  async createParticipant(params) {
    const res = await this.requestServer("POST", "/participant/create", params)
    return res;
  }

  async getParticiantList() {
    const res = await this.requestServer("GET", "/participant/list")
    return res;
  }

  async getParticipant(id) {
    const res = await this.requestServer("GET", "/participant/detail", { id })
    return res;
  }

  async updateParticipant(params) {
    const res = await this.requestServer("PUT", "/participant/update", params)
    return res;
  }

  async getStates() {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    return await axios.get(url);
  }
  async getCities(state) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
    return await axios.get(url)
  }

  async getAddress(cep) {
    const url = `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`
    return await axios.get(url)
  }
}