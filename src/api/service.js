import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_MY_SERVICE;

export default class Service {

  _objectRequest(method, data, headers) {
    const values = {
      method: method,
    };
    if (method.toUpperCase() === "GET")
      return { ...values, params: data, headers: headers };
    return { ...values, data: data, headers: headers };
  }

  async requestServer(method, url, data) {
    const headers = { Authorization: `Bearer ${sessionStorage.getItem("caminhoDaLuz-token")}` };
    return axios(url, this._objectRequest(method, data, headers));
  }

  async requestLogin(url, method, data) {
    const headers = {};
    return axios(url, this._objectRequest(method, data, headers));
  }
}
