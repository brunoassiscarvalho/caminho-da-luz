import Service from "../../api/service"

export default class UserService extends Service {
  
  async changePass(params) {
    const res = await this.requestServer("POST", "/user/change-pass", params)    
    return res;
  }

  async resetPass(params) {
    const res = await this.requestServer("POST", "/auth/reset-password", params)    
    return res;
  }

  async validateUser(params) {
    const res = await this.requestServer("POST", "/user/validate-user", params)
    return res;
  }
}