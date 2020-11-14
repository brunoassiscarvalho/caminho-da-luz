import Service from "../../api/service"

export default class LoginService extends Service {
  
  async authenticate(params) {
    const res = await this.requestServer("POST", "/auth/authenticate", params)
    if (res.data && res.data.token) {
      console.log("authenticate status",res.data.user)
      if( res.data.user?.name) sessionStorage.setItem("caminhoDaLuz-name", res.data.user.name)
      sessionStorage.setItem("caminhoDaLuz-email", res.data.user.email)
      sessionStorage.setItem("caminhoDaLuz-token", res.data.token)
      sessionStorage.setItem("caminhoDaLuz-status", res.data.user.status)
    }
    return res;
  }
}