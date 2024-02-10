import React from "react";
import { FaTrash } from "react-icons/fa";
import { LuPenSquare } from "react-icons/lu";
import { parse } from "uuid";

const Todo = (props) => {
  const { todo, toggleTodo, onDeleteTodo } = props;

  const toggleComplete = () => {
    toggleTodo(todo.id);
  };

  const deleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <div className='Todo'>
      <p className={todo.completed ? "completed" : ""} onClick={toggleComplete}>
        {todo.task}
      </p>
      <div>
        <FaTrash onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
