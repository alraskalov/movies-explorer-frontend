import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import ProfileButton from "../ProfileButton/ProfileButton";

const Navigation = ({ isOpen, openPopup }) => {
  const { pathname } = useLocation();
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link
            to="/movies"
            className={`navigation__link hover-link ${
              pathname === "/movies" ? "navigation__link_active" : ""
            }`}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to="/saved-movies"
            className={`navigation__link hover-link ${
              pathname === "/saved-movies" ? "navigation__link_active" : ""
            }`}
          >
            Сохранённые фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <ProfileButton />
        </li>
      </ul>
      <button onClick={openPopup} className="burger-menu" />
    </nav>
  );
};

export default Navigation;
