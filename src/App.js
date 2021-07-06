import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./history";

import HomePage from './components/Home'



class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
