import React, { createRef, useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useWidthSize } from "../../hooks/useWidthSize";
import { useError } from "../../hooks/useError";
import ErrorText from "../ErrotText/ErrorText";
import { MOVIES, WIDTH_SIZE } from "../../utils/utils";

const Movies = ({ onGetMovies, isLoad, onCardLike, savedMovies, globalError }) => {
  const { values, handleChange, errors, isValid, setIsValid, setValues } =
    useFormWithValidation();

  const [checked, setChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [countMovies, setCountMovies] = useState(MOVIES.COUNT_INITIAL_CARDS);
  const [flag, setFlag] = useState(false);
  const [checkMovies, setCheckMovies] = useState(false);
  const widthSize = useWidthSize();
  const errorApi = useError(globalError)
  const inputText = localStorage.getItem("input") || "";
  const checkbox = JSON.parse(localStorage.getItem("checkbox")) || false;
  const cards = JSON.parse(localStorage.getItem("movies")) || [];
  const ref = createRef();

  const filterWithCheckbox = [
    ...cards?.filter(
      (c) =>
        c.nameRU.toLowerCase().includes(inputText.toLowerCase()) &&
        c.duration <= MOVIES.MOVIE_DURATION
    ),
  ];

  const filterWithoutCheckbox = [
    ...cards?.filter((c) =>
      c.nameRU.toLowerCase().includes(inputText.toLowerCase())
    ),
  ];

  const handleSubmitFlag = () => {
    setFlag(true);
  };
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const loadMovies = () => {
    if (widthSize >= WIDTH_SIZE.XXSMALL && widthSize <= WIDTH_SIZE.XSMALL) setCountMovies(countMovies + MOVIES.RENDER_MIN_CARDS);
    if (widthSize > WIDTH_SIZE.XSMALL && widthSize <= WIDTH_SIZE.LARGE) setCountMovies(countMovies + MOVIES.RENDER_MIN_CARDS);
    if (widthSize > WIDTH_SIZE.LARGE) setCountMovies(countMovies + MOVIES.RENDER_MAX_CARDS);
  };
  const checkEmptyMovies = () => {
    setCheckMovies(true)
  }

  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  useEffect(() => {
    setValues({
      search: inputText,
    });
    setChecked(checkbox);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkbox", checked);
  }, [checked])

  useEffect(() => {
    if (widthSize >= WIDTH_SIZE.XXSMALL && widthSize <= WIDTH_SIZE.XSMALL) setCountMovies(MOVIES.COUNT_320PX_CARD);
    if (widthSize > WIDTH_SIZE.XSMALL && widthSize <= WIDTH_SIZE.LARGE) setCountMovies(MOVIES.COUNT_768PX_CARD);
    if (widthSize > WIDTH_SIZE.LARGE) setCountMovies(MOVIES.COUNT_INITIAL_CARDS);
  }, [widthSize]);

  useEffect(() => {
    checked || flag
      ? setMovies(filterWithCheckbox)
      : setMovies(filterWithoutCheckbox);
    setFlag(false);
  }, [checked, flag]);

  return (
    <section className="movies page__movies">
      <SearchForm
        ref={ref}
        values={values}
        errors={errors}
        onChange={handleChange}
        isValid={isValid}
        onGetMovies={onGetMovies}
        onSubmitFlag={handleSubmitFlag}
        checked={checked}
        isLoad={isLoad}
        onCheckMovies={checkEmptyMovies}
      />
      <FilterCheckbox onChange={handleCheckboxChange} checked={checked} />
      <MoviesCardList
        isLoad={isLoad}
        movies={movies}
        loadMovies={loadMovies}
        countMovies={countMovies}
        checked={checked}
        checkMovies={checkMovies}
      >
        {isLoad && <Preloader />}
        {errorApi === 500 && <ErrorText>{errorApi}</ErrorText>}
        {!movies?.length && checkMovies && <ErrorText>Ничего не найдено</ErrorText>}
        {!checked
          ? !!movies?.length &&
            movies
              .slice(0, countMovies)
              .map((movie) => <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} savedMovies={savedMovies} />)
          : !!movies?.length &&
            movies.map((movie) => <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} savedMovies={savedMovies} />)}
      </MoviesCardList>
    </section>
  );
};

export default Movies;
