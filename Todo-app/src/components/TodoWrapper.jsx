import React, { Component, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
uuidv4();

class TodoWrapper extends Component {
  state = {
    todos: [],
  };

  addTodo = (value) => {
    this.setState((prevState) => {
      return {
        todos: [
          ...prevState.todos,
          { id: uuidv4(), task: value, completed: false },
        ],
      };
    });
  };

  toggleTodo = (id) => {
    const { todos } = this.state;
    const updatedTodo = todos.map((eachTodo) =>
      eachTodo.id === id
        ? { ...eachTodo, completed: !eachTodo.completed }
        : eachTodo
    );
    this.setState({
      todos: updatedTodo,
    });
  };

  onDeleteTodo = (id) => {
    const { todos } = this.state;
    const updatedTodo = todos.filter((eachTodo) => eachTodo.id !== id);
    this.setState({
      todos: updatedTodo,
    });
  };

  onSaveTodo = () => {
    const { todos } = this.state;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  componentDidMount() {
    const persistent = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(persistent);
    this.setState({
      todos: parsedTodos,
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={this.addTodo} />
        {todos.map((eachTodo) => (
          <Todo
            todo={eachTodo}
            key={eachTodo.id}
            toggleTodo={this.toggleTodo}
            onDeleteTodo={this.onDeleteTodo}
          />
        ))}
        <div className='button-container'>
          <button className='save-btn' onClick={this.onSaveTodo}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

// const TodoWrapper = () => {
//   const [todos, setTodos] = useState([]);

//   const addTodo = (todo) => {
//     setTodos([
//       ...todos,
//       { id: uuidv4(), task: todo, completed: false, isEditing: false },
//     ]);
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((eachTodo) =>
//         eachTodo.id === id
//           ? { ...eachTodo, completed: !eachTodo.completed }
//           : eachTodo
//       )
//     );
//   };

//   const onDeleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   //below logic is used to store todos in local storage

//   // const saveTodos = () => {
//   //   localStorage.setItem("todos", JSON.stringify(todos));
//   // };
//   // const persistentTodos = () => {
//   //   const persistent = localStorage.getItem("todos");
//   //   const parsedTodos = JSON.parse(persistent);
//   // };

//   return (
//     <div className='TodoWrapper'>
//       <h1>Get Things Done!</h1>
//       <TodoForm addTodo={addTodo} />
// {todos.map((eachTodo) => (
//   <Todo
//     todo={eachTodo}
//     key={eachTodo.id}
//     toggleTodo={toggleTodo}
//     onDeleteTodo={onDeleteTodo}
//   />
// ))}

//     </div>
//   );
// };

export default TodoWrapper;
