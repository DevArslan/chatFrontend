import React,  { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import Authorization from './components/authorization/Authorization';
import Rooms from './components/rooms/Rooms';
import { render } from 'react-dom';


class App extends Component {
  render() {
    
    const { history } = this.props
    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/auth' component={Authorization} />
          <Route history={history} path='/rooms/:id' component={Rooms} />
          <Redirect from='/' to='/auth' />
        </Switch>
      </div>
    );
  }
}

export default App;
