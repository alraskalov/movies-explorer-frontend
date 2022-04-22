import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = ({
  children,
  isLoad,
  movies,
  loadMovies,
  countMovies,
  checked,
  checkMovies,
}) => {
  const { pathname } = useLocation();
  return (
    <>
      <div
        className={`card-list ${
          isLoad || (checkMovies && !movies?.length) ? "card-list_load" : ""
        }`}
      >
        {children}
      </div>
      {pathname === "/movies" &&
      !isLoad &&
      !!movies?.length &&
      countMovies < movies?.length &&
      !checked ? (
        <button onClick={loadMovies} className="card-list__button hover-btn">
          Еще
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default MoviesCardList;
