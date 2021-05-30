import React, { Component } from 'react';
import "./App.scss";
import { Login, Register } from "./login/index";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import FirstPage from './login/FirstPage';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

export default class App extends Component {

  render() {
    return (
      <div className="wrapper">

        <Router>
          <PrivateRoute exact path='/' component={MainPage} />
          <Route exact path='/login' component={FirstPage} />
          <Route component={NotFound} />
        </Router>

      </div>
    )
  }
}
