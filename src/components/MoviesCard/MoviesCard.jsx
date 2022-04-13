import React from "react";
import "./MoviesCard.css";
import image from "../../images/card.png";
import { useLocation } from "react-router-dom";

const MoviesCard = () => {
  const { pathname } = useLocation();
  return (
    <div className="movies-card">
      <img src={image} alt="" className="movies-card__image" />
      <div className="movies-card__description">
        <div className="movies-card__description-container">
          <h3 className="movies-card__title">33 слова о дизайне</h3>
          <p className="movies-card__time">1ч42м</p>
        </div>
        {pathname === "/saved-movies" ? (
          <button className="movies-card__delete"></button>
        ) : (
          <button className="movies-card__like"></button>
        )}
      </div>
    </div>
  );
};

export default MoviesCard;
