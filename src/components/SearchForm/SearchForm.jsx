import React from "react";
import "./SearchForm.css";
import search from "../../images/search.svg";
import arrow from "../../images/arrow-search.svg";

const SearchForm = () => {
  return (
    <div className="search">
      <img className="search__icon" src={search} alt="Search icon" />
      <form name="search" className="search__form">
        <label className="search__label">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Фильм"
            className="search__input"
            required
          />
        </label>
      </form>
      <button className="search__button">
        <img src={arrow} alt="Arrow icon" />
      </button>
    </div>
  );
};

export default SearchForm;
