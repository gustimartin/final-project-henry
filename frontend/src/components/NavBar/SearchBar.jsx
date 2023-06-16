import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { fetchProductByName } from "../../features/productsSlice";
import "./searchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchProduct, setSearchProduct] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setSearchProduct(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProductByName(searchProduct));
    setSearchProduct("");
  };

  return (
    <>
      <div className=" search-container ">
        <input
          className="search-input"
          value={searchProduct}
          type="text"
          placeholder="Search product"
          onChange={handleInput}
        />
        <button className="search-buttom " type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
