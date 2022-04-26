import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { API_CONFIG } from "../../utils/utils";

const MoviesCard = ({ movie, onCardLike, savedMovies, flag }) => {
  const { pathname } = useLocation();

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч" + minutes + "м";
  };
  const handleLikeClick = () => {
    onCardLike(movie);
  };

  const isLiked = savedMovies?.some((i) => i.movieId === movie.id);
  const cardLikeButtonName = `${isLiked ? "movies-card__like_active" : ""}`;
  const movieClick = (e) => {
    window.open(movie.trailerLink);
  };
  return (
    <div className="movies-card">
      <img
        src={
          flag ? `${movie.image}` : `${API_CONFIG.URL_IMAGE}${movie.image.url}`
        }
        alt="Movies"
        onClick={(e) => movieClick(e)}
        className="movies-card__image"
      />
      <div className="movies-card__description">
        <div className="movies-card__description-container">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          <p className="movies-card__time">{getTimeFromMins(movie.duration)}</p>
        </div>
        {pathname === "/saved-movies" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
            className="movies-card__delete"
          ></button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
            className={`movies-card__like ${cardLikeButtonName}`}
          ></button>
        )}
      </div>
    </div>
  );
};

export default MoviesCard;
