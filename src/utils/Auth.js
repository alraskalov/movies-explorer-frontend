import { API_CONFIG } from "./utils";

class Auth {
  constructor(options) {
    this._url = options.baseUrl;
  }

  register(password, email, name) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email, name }),
    })
      .then((response) => this._getResponse(response))
      .then((res) => res);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((response) => this._getResponse(response));
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => this._getResponse(response))
      .then((data) => data);
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const auth = new Auth({
  baseUrl: API_CONFIG.URL_API,
  headers: {
    "Content-Type": "application/json",
  },
})
export default auth;
