import React from "react";
import "./Main.css";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import NavTab from "../NavTab/NavTab";
import Portfolio from "../Portfolio/Portfolio";

const Main = () => {
  return (
    <main className="content">
      <Promo>
        <NavTab />
      </Promo>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
