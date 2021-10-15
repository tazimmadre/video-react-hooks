import React, { useState } from "react";

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");
  const onInputChange = (event) => {
    setTerm(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(term);
  };
  return (
    <div
      style={{ background: "red", borderRadius: "10px" }}
      className="search-bar ui segment"
    >
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <div class="ui search focus">
            <div class="ui icon input">
              <label style={{ color: "white", fontSize: "24px" }}>
                Youtube
              </label>
              <input
                class="search"
                autocomplete="off"
                style={{ borderRadius: "10px" }}
                type="text"
                value={term}
                onChange={onInputChange}
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
