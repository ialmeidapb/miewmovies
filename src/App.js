import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./history";
import "./index.css"
import HomePage from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'



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
        <Route exact path="/home/:id" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
