import Service from "../../api/service"

export default class UserService extends Service {
  
  async changePass(params) {
    const res = await this.requestServer("POST", "/user/change-pass", params)    
    return res;
  }
}