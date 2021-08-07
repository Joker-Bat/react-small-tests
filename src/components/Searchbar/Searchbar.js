import React, { useState, useEffect, useRef } from "react";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

// Styles
import classes from "./Searchbar.module.scss";

const Searchbar = ({ placeholder, data }) => {
  const searchContainer = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [isVisble, setIsVisible] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [cursor, setCursor] = useState(0);

  const handleFilter = event => {
    const currentWord = event.target.value;
    setSearchWord(currentWord);
    const newFilter = data.filter(item => {
      return item.name.toLowerCase().includes(currentWord.toLowerCase());
    });

    if (currentWord === "") setFilteredProducts([]);
    else setFilteredProducts(newFilter);
  };

  const showSuggestion = () => setIsVisible(true);
  const hideSuggestion = () => setIsVisible(false);

  const handleOutsideClick = e => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(e.target)
    ) {
      hideSuggestion();
    }
  };

  const keyboardNavigation = e => {
    if (e.key === "ArrowDown") {
      isVisble
        ? setCursor(c => (c < filteredProducts.length - 1 ? c + 1 : c))
        : showSuggestion();
    }
    if (e.key === "ArrowUp") {
      setCursor(c => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      hideSuggestion();
    }
    if (e.key === "Enter") {
      setSearchWord(filteredProducts[cursor].name);
      console.log(filteredProducts[cursor].slug);
      hideSuggestion();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.Search} ref={searchContainer}>
      <div className={classes.SearchInputs}>
        <input
          type='search'
          name='name'
          placeholder={placeholder}
          value={searchWord}
          autoComplete='off'
          onClick={showSuggestion}
          onChange={handleFilter}
          onKeyDown={e => keyboardNavigation(e)}
        />
        <div className={classes.SearchIcon}>
          {filteredProducts.length === 0 ? <SearchIcon /> : <CloseIcon />}
        </div>
      </div>
      {isVisble && (
        <div className={classes.DataResult}>
          {filteredProducts.length !== 0 ? (
            filteredProducts.slice(0, 8).map((value, key) => {
              const highightClass = [
                classes.DataItem,
                cursor === key ? classes.Active : "",
              ];
              return (
                <a
                  href='##'
                  key={key}
                  target='_blank'
                  data-id={value.slug}
                  className={highightClass.join(" ")}
                  onClick={e => console.log(e.target.closest("a").dataset.id)}
                >
                  <p>{value.name}</p>
                </a>
              );
            })
          ) : (
            <p href='#' className={classes.DataItem}>
              {searchWord === ""
                ? "Search some product"
                : "No matched products!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
