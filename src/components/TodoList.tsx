import React from "react";
import { ITodoList } from ".";
import { ITodo } from "./TodoList.type";

interface TodoItemProps {
  todo: ITodo;
  selectedList: ITodo[];
  setselectedList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

function TodoItem({ todo, selectedList, setselectedList }: TodoItemProps) {
  console.log("render TodoItem");
  function handleChange(id: number) {
    const newSelectedList = selectedList.map((todo) => {
      if (todo.id === id) {
        todo.selected = !todo.selected;
      }
      return todo;
    });
    setselectedList(newSelectedList);
  }

  // console.log(selected);

  return (
    <li
      key={todo.id}
      className={`todolist__item ${
        todo.selected ? "todolist__item--active" : ""
      }`}
      onChange={() => handleChange(todo.id)}
    >
      <label htmlFor={`label__${todo.id}`}>{todo.label}</label>
      <input type="checkbox" name={todo.label} id={`label__${todo.id}`} />
    </li>
  );
}

function TodoList({ selectedList, setselectedList }: ITodoList) {
  console.log("render TodoList");

  return (
    <ul className="todolist">
      {selectedList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          selectedList={selectedList}
          setselectedList={setselectedList}
        />
      ))}
    </ul>
  );
}

export default TodoList;
