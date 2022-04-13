import React from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = () => {
  return (
    <label className='filter'>
      <input type="checkbox" className='filter__checkbox' />
      <div className="filter__div"></div>
      <p className="filter__text">Короткометражки</p>
    </label>
  );
};

export default FilterCheckbox;
