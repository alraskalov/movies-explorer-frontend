import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Popup from "../Popup/Popup";

const App = () => {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isPopup, setIsPopup] = useState(false);

  const openPopup = () => {
    setIsPopup(true);
  };

  const closePopup = () => {
    setIsPopup(false);
  };

  return (
    <div className="page">
      {pathname === "/" ? (
        <Header logged={loggedIn} isPopup={isPopup} openPopup={openPopup} />
      ) : null}
      {pathname === "/movies" ? (
        <Header logged={loggedIn} isPopup={isPopup} openPopup={openPopup} />
      ) : null}
      {pathname === "/saved-movies" ? (
        <Header logged={loggedIn} isPopup={isPopup} openPopup={openPopup} />
      ) : null}
      {pathname === "/profile" ? (
        <Header logged={loggedIn} isPopup={isPopup} openPopup={openPopup} />
      ) : null}
      <Popup isPopup={isPopup} closePopup={closePopup} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
      {pathname === "/" ? <Footer /> : null}
      {pathname === "/movies" ? <Footer /> : null}
      {pathname === "/saved-movies" ? <Footer /> : null}
    </div>
  );
};

export default App;
