import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername (event) {
    this.setState({ username: event.target.value })
    // console.log('username: ', this.state.username);
  }
  handlePassword (event) {
    this.setState({ password: event.target.value })
    // console.log('password: ', this.state.password);
  }
  handleLogin(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const user = { username, password }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3030/login', user)
      .then((data) => {
        console.log(data);
        localStorage.setItem('User', data.data.user )
        setTimeout(() => {
          window.location = '/tasks';
        }, 1000);
      })
      .catch((error) => {
        console.log('err: ', error)
      });
  }
  render() {
    return (
      <form className='login-form'>
        <FormGroup>
          username
          <FormControl
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.handleUsername}
          />
        </FormGroup>
        <FormGroup>
          password
          <FormControl
            type='text'
            placeholder='password'
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <button className='btn btn-success' onClick={this.handleLogin}> Login </button>
        </FormGroup>
      </form>
    )
  }
}

// export default Signup;
