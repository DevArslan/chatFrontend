import React,  { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client'
import './App.css';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import Authorization from './components/authorization/Authorization';
import { render } from 'react-dom';


const BASE_URL = 'http://localhost:5050'
const socket = io(BASE_URL)


class App extends Component {
  render() {
    const { history } = this.props
    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/auth' component={Authorization} />
          <Redirect from='/' to='/auth' />
        </Switch>
      </div>
    );
  }
}

export default App;
