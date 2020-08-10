import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import Authorization from './components/main/authorization/Authorization';
import Rooms from './components/main/rooms/Rooms';
import Main from "./components/main/Main";
import { render } from 'react-dom';


class App extends Component {



  render() {

    const { history } = this.props
    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/main' component={Main}>
          </Route>

          <Redirect from='**' to='main/auth' />
        </Switch>
      </div>
    );
  }
}

export default App;
