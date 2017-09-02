import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';

export default class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      listOfTasks: null,

    }
    this.handleTask = this.handleTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // axios.get('http://localhost:3030/showAllTasks')
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
            this.state.listOfTasks.map((task) => {
              return <li>{task.task}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
