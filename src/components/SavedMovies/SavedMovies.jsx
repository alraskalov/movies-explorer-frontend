import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css'

const SavedMovies = () => {
  return (
    <section className='saved-movies page__saved-movies'>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </MoviesCardList>
    </section>
  );
};

export default SavedMovies;
