import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Popup from "../Popup/Popup";
import moviesApi from "../../utils/MoviesApi";
import auth from "../../utils/Auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const jwt = localStorage.getItem("jwt") || "";
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((userInfo) => {
          const { user } = userInfo;
          setCurrentUser(user);
          mainApi
            .getMovies(jwt)
            .then((movie) => {
              setSavedMovies(() => movie);
              setLoggedIn(true);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt && (pathname === "/signin" || pathname === "/signup")) {
      navigate("/movies");
    }
  }, []);

  useEffect(() => {
    setGlobalError("");
  }, [pathname]);

  const setLocalStorage = (input, checkbox, movie) => {
    localStorage.setItem("input", input);
    localStorage.setItem("checkbox", checkbox);
    localStorage.setItem("movies", JSON.stringify(movie));
  };

  const handleCardLike = (movie) => {
    const isLiked = savedMovies.some((i) => {
      return i.movieId === (movie.id !== undefined ? movie.id : movie.movieId);
    });
    const moviesId = savedMovies.filter((i) => {
      return i.movieId === (movie.id !== undefined ? movie.id : movie.movieId);
    });

    mainApi
      .changeLikeCard(isLiked ? moviesId : movie, isLiked, jwt)
      .then((newCard) => {
        if (isLiked) {
          setSavedMovies((state) => {
            return state.filter((i) => i.movieId !== newCard.movieId);
          });
        } else {
          setSavedMovies((state) => [...state, newCard]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetMovies = (checked, inputText, callback) => {
    if (!localStorage.getItem("movies")) {
      setIsLoad(true);
      moviesApi
        .getCards()
        .then((cards) => {
          setMovie(() => cards);
          callback();
          setLocalStorage(inputText, checked, cards);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoad(false));
    } else {
      setLocalStorage(inputText, checked, movie);
      callback();
    }
  };

  const openPopup = () => {
    setIsPopup(true);
  };

  const closePopup = () => {
    setIsPopup(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("input");
    localStorage.removeItem("checkbox");
    localStorage.removeItem("movies");
    setMovie([]);
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleUpdateUser = ({ name, email }, callback) => {
    setIsLoad(true);
    mainApi
      .setUserInfo(name, email, jwt)
      .then((user) => {
        setCurrentUser(user);
        setGlobalError(200);
        callback();
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") setGlobalError(409);
        if (err === "Ошибка: 500") setGlobalError(500);
        if (err === "Ошибка: 400") setGlobalError(400);
      })
      .finally(() => setIsLoad(false));
  };

  const handleRegisterSubmit = (
    { password, email, name },
    callbackResetValues
  ) => {
    setIsLoad(true);
    auth
      .register(password, email, name)
      .then((res) => {
        if (res) {
          callbackResetValues();
          handleLoginSubmit({ password, email }, () => undefined);
          setGlobalError(200);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") setGlobalError(409);
        if (err === "Ошибка: 500") setGlobalError(500);
        if (err === "Ошибка: 400") setGlobalError(400);
      })
      .finally(() => setIsLoad(false));
  };
  const handleLoginSubmit = ({ password, email }, callbackResetValues) => {
    setIsLoad(true);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          callbackResetValues();
          handleLogin();
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res);
          setGlobalError(200);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 500") setGlobalError(500);
        if (err === "Ошибка: 400") setGlobalError(400);
        if (err === "Ошибка: 401") setGlobalError(401);
      })
      .finally(() => setIsLoad(false));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={jwt}>
                <Movies
                  onGetMovies={handleGetMovies}
                  isLoad={isLoad}
                  onCardLike={handleCardLike}
                  savedMovies={savedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={jwt}>
                <SavedMovies
                  savedMovies={savedMovies}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={jwt}>
                <Profile
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                  globalError={globalError}
                  isLoad={isLoad}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                globalError={globalError}
                isLoad={isLoad}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLoginSubmit}
                globalError={globalError}
                isLoad={isLoad}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {pathname === "/" ? <Footer /> : null}
        {pathname === "/movies" ? <Footer /> : null}
        {pathname === "/saved-movies" ? <Footer /> : null}
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
