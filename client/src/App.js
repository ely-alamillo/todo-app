import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Signup from './pages/Signup'
import Success from './pages/Success'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
// import * as Pages from './pages'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>todo app</h2>
        </div>
        <p className="App-intro">
          im the navbar soon...
        </p>

        {/* <Route path='/' exact component={ Pages.Login }></Route> */}
        <Route path='/signup' component={ Signup }></Route>
        <Route path='/login' component={ Login }></Route>
        <Route path='/tasks' component={ Tasks }></Route>
      </div>
    );
  }
}

export default App;
