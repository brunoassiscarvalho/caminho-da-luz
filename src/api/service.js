import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVICE_URL
    ? `https://${process.env.REACT_APP_SERVICE_URL}`
    : `http://localhost:3005`;

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
        // if (
        //   sessionStorage.getItem(Storage.KEY) &&
        //   sessionStorage.getItem(Storage.TOKEN)
        // ) {
        //   let headers = {
        //     "kodiak-key": sessionStorage.getItem(Storage.KEY),
        //     Authorization: `Bearer ${sessionStorage.getItem(Storage.TOKEN)}`,
        //   };
        //   if (sessionStorage.getItem(Storage.PARTNER))
        //     headers["kodiak-partner"] = sessionStorage.getItem(Storage.PARTNER);
        //   if (sessionStorage.getItem(Storage.SERVICE))
        //     headers["kodiak-service"] = sessionStorage.getItem(Storage.SERVICE);
const headers={};
        return axios(url, this._objectRequest(method, data, headers));
        // }
    }

    async requestLogin(url, method, data) {
        const headers = {};
        return axios(url, this._objectRequest(method, data, headers));
    }
}
