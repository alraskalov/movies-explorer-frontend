import React, { createRef, useCallback, useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ErrorText from "../ErrotText/ErrorText";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = ({ savedMovies, onCardLike }) => {
  const { values, handleChange, errors, isValid, setIsValid } =
    useFormWithValidation();
  const flag = true;
  const [checked, setChecked] = useState(false);
  const [inputText, setInputText] = useState("");
  const [cards, setCards] = useState([]);
  const [flagForm, setFlagForm] = useState(false);
  const [checkMovies, setCheckMovies] = useState(false);
  const ref = createRef();

  const filterWithCheckbox = savedMovies.filter(
    (c) =>
      c.nameRU.toLowerCase().includes(inputText.toLowerCase()) &&
      c.duration <= 40
  );

  const filterWithoutCheckbox = savedMovies.filter((c) =>
    c.nameRU.toLowerCase().includes(inputText.toLowerCase())
  );
  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  useEffect(() => {
    setCards(savedMovies);
    switchCheckbox();
  }, [savedMovies]);

  const switchCheckbox = useCallback(() => {
    checked || flagForm
      ? setCards(filterWithCheckbox)
      : setCards(filterWithoutCheckbox);
    setFlagForm(false);
  });

  useEffect(() => {
    switchCheckbox();
  }, [checked, flagForm]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmitFlag = () => {
    setFlagForm(true);
  };

  const handleSubmitForm = (checked, input, callback) => {
    setInputText(input);
    setChecked(checked);
    callback();
  };

  const checkEmptyMovies = () => {
    setCheckMovies(true);
  };

  return (
    <section className="saved-movies page__saved-movies">
      <SearchForm
        ref={ref}
        values={values}
        errors={errors}
        onChange={handleChange}
        isValid={isValid}
        checked={checked}
        name="search-save"
        onGetMovies={handleSubmitForm}
        onSubmitFlag={handleSubmitFlag}
        onCheckMovies={checkEmptyMovies}
      />
      <FilterCheckbox onChange={handleCheckboxChange} checked={checked} />
      <MoviesCardList checkMovies={checkMovies}>
        {!cards?.length && checkMovies && (
          <ErrorText>Ничего не найдено</ErrorText>
        )}
        {!!cards.length &&
          cards.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              flag={flag}
              onCardLike={onCardLike}
            />
          ))}
      </MoviesCardList>
    </section>
  );
};

export default SavedMovies;
