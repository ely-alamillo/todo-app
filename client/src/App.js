import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Signup from './pages/Signup'
import Success from './pages/Success'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
// import * as Pages from './pages'
import './App.css';

class App extends Component {
  constructor() {
    super();
    // this.logOut = this.logOut.bind(this);
  }
  logOut() {
    delete localStorage.User;
    window.location = '/';
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>todo app</h2>
          <Link to='/login'>Login</Link> &nbsp;
          { localStorage.User ? <button className='btn btn-danger' onClick={this.logOut}>logout</button> : null }
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
