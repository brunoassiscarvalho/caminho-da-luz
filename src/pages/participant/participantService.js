import Service from "../../api/service"

export default class ParticipantService extends Service{
    constructor() {
        super();
        
    }
    async createParticipant(params){
        const res = this.requestServer("POST", "/participant/create", params)
    }
}