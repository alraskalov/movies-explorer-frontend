import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

const MoviesCardList = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="card-list">{children}</div>
      {pathname === "/movies" ? (
        <button className="card-list__button hover-btn">Еще</button>
      ) : (
        ""
      )}
    </>
  );
};

export default MoviesCardList;
