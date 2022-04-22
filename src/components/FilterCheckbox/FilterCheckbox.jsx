import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ onChange, checked }) => {
  return (
    <label className="filter">
      <input
        onChange={(e) => {
          onChange(e)
        }}
        type="checkbox"
        name="checkbox"
        checked={checked || false}
        className="filter__checkbox"
      />
      <div className="filter__div"></div>
      <p className="filter__text">Короткометражки</p>
    </label>
  );
};

export default FilterCheckbox;
