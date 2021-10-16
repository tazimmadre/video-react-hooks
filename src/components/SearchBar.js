import React,{useState} from "react";

const SearchBar=({onFormSubmit})=>{
  const [term,setTerm]=useState('');
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
          <label style={{ color: "white", fontSize: "24px" }}>Youtube</label>
          <input
          style={{ borderRadius: "10px" }}
 
            type="text"
            value={term}
            onChange={onInputChange}
          />
        </div>
        
      </form>
    </div>
  );
}
export default SearchBar;
