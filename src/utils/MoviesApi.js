import { API_CONFIG } from "./utils";

class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
    this.headers = options.headers;
  }
  getCards() {
    return fetch(this._url, {
      method: "GET",
      headers: this.headers,
    }).then((res) => this._getResponse(res));
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: API_CONFIG.URL_MOVIES,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
