import Service from "../../api/service"

export default class LoginService extends Service {
  constructor() {
    super();
  }
  
  async authenticate(params) {
    const res = await this.requestServer("POST", "/auth/authenticate", params)
    if (res.data && res.data.token) {
      sessionStorage.setItem("caminhoDaLuz-name", res.data.user.name)
      sessionStorage.setItem("caminhoDaLuz-email", res.data.user.email)
      sessionStorage.setItem("caminhoDaLuz-token", res.data.token)
    }
    return res;
  }
}