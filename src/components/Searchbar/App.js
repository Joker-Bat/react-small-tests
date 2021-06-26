import React, { useEffect, useState } from "react";

import classes from "./Searchbar.module.scss";
import Searchbar from "./Searchbar";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://freeestoreapi.herokuapp.com/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data.products);
        });
    };

    fetchData();
  }, []);

  return (
    <div className={classes.App}>
      <Searchbar placeholder="Search products here..." data={products} />
    </div>
  );
};

export default App;
