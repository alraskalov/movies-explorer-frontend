import { API_CONFIG } from "./utils";

class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._getResponse(res));
  }

  setUserInfo(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._getResponse(res));
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._getResponse(res));
  }

  changeLikeCard(movie, isLiked, token) {
    console.log(movie);
    const moviesId = isLiked
      ? movie.find((el) => {
          return el._id;
        })
      : movie;
      console.log(moviesId);
    return fetch(`${this._url}/movies/${isLiked ? moviesId._id : ""}`, {
      method: isLiked ? "DELETE" : "POST",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: isLiked
        ? JSON.stringify({ movieId: moviesId._id })
        : JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${API_CONFIG.URL_IMAGE}${movie.image.url}`,
            trailerLink:
              movie.trailerLink || `${API_CONFIG.URL_IMAGE}${movie.image.url}`,
            thumbnail: `${API_CONFIG.URL_IMAGE}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU || movie.nameEN,
            nameEN: movie.nameEN || movie.nameRU,
          }),
    }).then((res) => this._getResponse(res));
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const mainApi = new MainApi({
  baseUrl: API_CONFIG.URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
