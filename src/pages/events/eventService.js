import Service from "../../api/service"

export default class EventService extends Service {
  constructor() {
    super();

  }
  async createEvent(params) {
    const res = await this.requestServer("POST", "/event/create", params)
    return res.data;
  }

  async getEventList() {
    const res = await this.requestServer("GET", "/event/list")
    return res.data;
  }

  async getEvent(id) {
    const res = await this.requestServer("GET", "/event/detail", { id })
    return res.data;
  }

  async updateEvent(params) {
    const res = await this.requestServer("PUT", "/event/update", params)
    return res.data;
  }
  
  async fetchRegistry(params) {
    const res = await this.requestServer("POST", "/registry/create", params)
    return res.data;
  }
  async getRegistries(params) {
    const res = await this.requestServer("GET", "/registry/event/participants", params)
    return res.data;
  }
}