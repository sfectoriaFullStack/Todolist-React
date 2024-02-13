import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [],
      value: "",
      lastId: localStorage.getItem("lastId")
        ? localStorage.getItem("lastId")
        : 1,
    };
  }
  addTask() {
    let newTask = {
      id: this.state.lastId,
      value: this.state.value,
      checked: false,
    };
    this.setState({
      tasks: [...this.state.tasks, newTask],
      lastId: +this.state.lastId + 1,
      value: "",
    });
    localStorage.setItem(
      "tasks",
      JSON.stringify([...this.state.tasks, newTask])
    );
    localStorage.setItem("lastId", JSON.stringify(+this.state.lastId + 1));
    console.log(this.state.lastId);
  }
  update(e, i) {
    let array = [...this.state.tasks];
    array[i].checked = e.target.checked;
    this.setState({ tasks: array });
    // this.tasks[i].checked = e.target.checked;
    localStorage.setItem("tasks", JSON.stringify(array));
  }

  removeTask(id) {
    let array = this.state.tasks.filter((elem) => elem.id !== id);
    this.setState({ tasks: array });
    localStorage.setItem("tasks", JSON.stringify(array));
  }
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <div className="d-flex">
            <input
              type="text"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
            <button onClick={() => this.addTask()}>Add Task</button>
          </div>
          <div>
            {this.state.tasks.map((elem, i) => (
              <div className="d-flex justify-content-between" key={i}>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={elem.checked}
                    onChange={(e) => this.update(e, i)}
                  />
                  <p style={{textDecoration:elem.checked ? "line-through" : "none"}}>{elem.value}</p>
                </div>
                <button onClick={() => this.removeTask(elem.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
