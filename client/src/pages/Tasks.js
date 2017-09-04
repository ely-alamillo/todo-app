import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';

export default class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      listOfTasks: [],

    }
    this.handleTask = this.handleTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const username = localStorage.getItem('User');
    axios.defaults.headers.common['username'] = username;
    axios.get('http://localhost:3030/showUserTasks')
      .then((data) => {
        this.setState({ listOfTasks: data.data.tasks})
      })
      .catch((err) => {
        alert('error in mount axios call')
      });
  }
  handleTask(event) {
    this.setState({ task: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const task = this.state.task;
    this.setState({ task: ''});
    const newTask = { task: task };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3030/createTask', newTask) // http://localhost:3030/signup
      .then((data) => {
        console.log(data.data.tasks);
        this.setState({ listOfTasks: data.data.tasks })
      })
      .catch((error) => {
        console.log('there is an error: ', error);
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type='text'
              placeholder= 'Enter a todo...'
              value={this.state.task}
              onChange={this.handleTask}
            />
          </FormGroup>
          <button className='btn btn-success' type='submit' > add todo</button>
        </form>
        <ul>
          {
            this.state.listOfTasks.map((task, index) => {
              return <li key={index}>{task.task}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
