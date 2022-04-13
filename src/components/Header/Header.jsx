import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Header = ({ logged, isPopup, openPopup }) => {
  return (
    <header className="header page__header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="header__auth">
        {logged ? (
          <Navigation isPopup={isPopup} openPopup={openPopup} />
        ) : (
          <>
            <Link to="/signup" className="header__signup hover-link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__signin hover-btn">
              Войти
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
