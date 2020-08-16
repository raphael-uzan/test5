import React, { Component } from "react";
import Task from "./Task";

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      count: 0,
      userInput: "",
    };
  }

  handleInput(event) {
    this.setState({ userInput: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const todoUpdated = this.state.todo.slice();
    todoUpdated.push({
      id: this.state.count,
      task: this.state.userInput,
      done: false,
      favourite: false,
    });
    this.setState({
      todo: todoUpdated,
      userInput: "",
      count: this.state.count + 1,
    });
  }

  handleDelete(taskID) {
    const todoUpdated = this.state.todo.filter((task) => task.id !== taskID);
    this.setState({ todo: todoUpdated });
  }

  handleReset() {
      const todoUpdated = []
      this.setState({todo: todoUpdated})
  }

  toggleDone(taskObj) {
    const todoUpdated = this.state.todo.slice();
    const taskIndex = this.state.todo.indexOf(taskObj);
    todoUpdated[taskIndex].done = !taskObj.done;
    this.setState({ todo: todoUpdated });
  }

  toggleFavourite(taskObj) {
    const todoUpdated = this.state.todo.slice();
    const taskIndex = this.state.todo.indexOf(taskObj);
    todoUpdated[taskIndex].favourite = !taskObj.favourite;
    this.setState({ todo: todoUpdated });
  }

  // Way to display the list

  getList(isItDone, isItFavourite) {
    const displayList = this.state.todo.filter(
      (task) => task.done === isItDone && task.favourite === isItFavourite
    );
    return displayList.map((item) => (
      <Task
        key={item.id}
        taskName={item.task}
        onDelete={() => this.handleDelete(item.id)}
        isItDone={() => this.toggleDone(item)}
        isItFavourite={() => this.toggleFavourite(item)}
      />
    ));
  }

  render() {
    let resetButton
    if(this.state.todo.length>0){
      resetButton = <button onClick={() => this.handleReset()}>Reset</button>
    }

    return (
      <div>
        <p>Number of tasks {this.state.count}</p>
        <button onClick={() => this.getState()}>Get State</button>
        {resetButton}
        
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            placeholder="Add new task"
            onChange={(event) => this.handleInput(event)}
            value={this.state.userInput}
          />
          <button>Add</button>
        </form>

        <h1>What you have to do:</h1>
        <ul>
          {this.getList(false, true)}
          {this.getList(false, false)}
        </ul>

        <h1>What you have done:</h1>
        <ul>
          {this.getList(true, true)}
          {this.getList(true, false)}
        </ul>
      </div>
    );
  }
}

export default TodoList;
