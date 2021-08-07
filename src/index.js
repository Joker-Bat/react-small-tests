import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Components
import App from "./App";
import Rating from "./components/Rating/Rating";
import Searchbar from "./components/Searchbar/App";
import UserPagination from "./components/UserPagination/UserPagination";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/rating' component={Rating} />
        <Route path='/searchbar' component={Searchbar} />
        <Route path='/user-pagination' component={UserPagination} />
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
