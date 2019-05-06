/* eslint-disable no-redeclare */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./components/Signup/Signup";
import Interests from "./components/Interests/Interests";
import Login from "./components/Login/Login";
import jwt_decode from "jwt-decode";

import Dashboard from "./components/Dashboard/Dashboard";


import "./App.css";
import "react-router-modal/css/react-router-modal.css";
import { ModalContainer, ModalRoute, Modal } from "react-router-modal";
import { setCurrentUser, logoutUser } from "./Actions/authAction";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/signup"
                render={props => <Signup {...props} />}
              />
              <Route
                exact
                path="/interests"
                render={props => <Interests {...props} />}
              />
              
              <Route path="/" component={Dashboard} />
              
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
