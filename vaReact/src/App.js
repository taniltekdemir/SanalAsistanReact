import React, { Component } from 'react';
import "./App.scss";
import { Login, Register } from "./Components/login/index";
import { Route, Router, Switch } from "react-router-dom";
import MainPage from './MainPage';
import FirstPage from './Components/login/FirstPage';
import NotFound from './NotFound';

export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route exact path='/' component={FirstPage}/>
          <Route exact path='/home' component={MainPage}/>
          <Route component={NotFound} />
        </Switch>

      </div>
    )
  }
}
