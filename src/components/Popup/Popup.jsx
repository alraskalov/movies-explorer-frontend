import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";
import "./Popup.css";

const Popup = ({ isPopup, closePopup }) => {
  const { pathname } = useLocation();
  return (
    <div className={`popup ${isPopup ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button onClick={closePopup} className="popup__exit" />
        <ul className="popup__list">
          <li className="popup__item">
            <Link onClick={closePopup}
              to="/"
              className={`popup__link hover-link ${
                pathname === "/" ? "popup__link_active" : ""
              }`}
            >
              Главная
            </Link>
          </li>
          <li className="popup__item">
            <Link onClick={closePopup}
              to="/movies"
              className={`popup__link hover-link ${
                pathname === "/movies" ? "popup__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
          </li>
          <li className="popup__item">
            <Link onClick={closePopup}
              to="/saved-movies"
              className={`popup__link hover-link ${
                pathname === "/saved-movies" ? "popup__link_active" : ""
              }`}
            >
              Сохранённые фильмы
            </Link>
          </li>
          <li className="popup__item">
            <ProfileButton closePopup={closePopup} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Popup;
