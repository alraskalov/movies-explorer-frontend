import React from "react";
import "./NavTab.css";

const NavTab = () => {
  return (
    <div className="nav-tab__anchors">
      <button className="nav-tab__button">
        <a className="nav-tab__anchor hover-link" href="#about">
          О проекте
        </a>
      </button>
      <button className="nav-tab__button">
        <a className="nav-tab__anchor hover-link" href="#techs">
          Технологии
        </a>
      </button>
      <button className="nav-tab__button">
        <a className="nav-tab__anchor hover-link" href="#student">
          Студент
        </a>
      </button>
    </div>
  );
};

export default NavTab;
