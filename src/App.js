import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./history";
import "./index.css"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import SeeMoreDetails from './components/SeeMoreDetails'
import Footer from './components/Footer'
import NavbarB4 from './components/NavbarB4'


class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  render() {
      return (
        <div className="App">
          <Router history={history}>
            {this.state.isLoggedIn ? (
              <Switch>
                <Route path="/:userId" component={Navbar} />
                <Route path="/:userId/:whatever" component={Navbar} />
              </Switch>
            ) : (
              <Route path="/" component={NavbarB4} />
            )}
            <Switch>
              {this.state.isLoggedIn ? (
                <Route exact path="/:userId" component={Home} />
              ) : (
                <Route exact path="/" component={Home} />
              )}
              {this.state.isLoggedIn ? (
                <Route
                  path="/:userId/details/:location/:id"
                  component={SeeMoreDetails}
                />
              ) : (
                <Route path="/details/:location/:id" component={SeeMoreDetails} />
              )}
              <Route exact path="/login">
                <Login
                  handleLogIn={this.handleLogIn}
                  history={this.props.history}
                />
              </Route>
              <Route exact path="/signup">
                <Signup
                  handleLogIn={this.handleLogIn}
                  history={this.props.history}
                />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      );
    }
  }

export default App;
