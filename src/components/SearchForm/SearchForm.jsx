import React, { forwardRef } from "react";
import "./SearchForm.css";
import search from "../../images/search.svg";
import arrow from "../../images/arrow-search.svg";

const SearchForm = forwardRef(
  (
    {
      values,
      errors,
      onChange,
      isValid,
      onGetMovies,
      checked,
      onSubmitFlag,
      isLoad,
      onCheckMovies,
    },
    ref
  ) => {
    const handleChange = (e) => {
      onChange(e);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onGetMovies(checked, values.search, () => {
        onSubmitFlag();
        onCheckMovies();
      });
    };

    return (
      <div className="search">
        <img className="search__icon" src={search} alt="Search icon" />
        <form
          ref={ref}
          noValidate
          onSubmit={handleSubmit}
          name="search"
          className="search__form"
        >
          <label className="search__label">
            <input
              type="text"
              id="search"
              name="search"
              placeholder={errors.search || "Фильм"}
              className={`search__input ${
                errors.search ? "search__input_error" : ""
              }`}
              value={values.search || ""}
              onChange={handleChange}
              disabled={isLoad}
              required
            />
          </label>
          <button
            disabled={!isValid && !isLoad}
            type="submit"
            className={`search__button ${
              isValid && !isLoad ? "" : "search__button_disabled"
            } hover-btn`}
          >
            <img src={arrow} alt="Arrow icon" />
          </button>
        </form>
      </div>
    );
  }
);

export default SearchForm;
