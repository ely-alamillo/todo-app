import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';

export default class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
    }
    this.handleTask = this.handleTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTask(event) {
    this.setState({ task: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const task = this.state.task;
    console.log('task: ', task);
    const newTask = { task: task };
    console.log(newTask)
    axios.post('http://localhost:3030/createTask', newTask) // http://localhost:3030/signup
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          window.location = '/taskSaved'
        }, 200);
      })
      .catch((error) => {
        console.log('there is an error: ', error);
      });
  }
  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl
              type='text'
              placeholder= 'Enter a todo...'
              value={this.state.task}
              onChange={this.handleTask}
            />
          </FormGroup>
        </form>
        <button className='btn btn-success' onClick={this.handleSubmit} > add todo</button>
      </div>
    )
  }
}
