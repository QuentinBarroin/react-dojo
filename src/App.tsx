import React, { Fragment, useState,  useRef ,useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Status } from "./components";
import { ITodo } from "./components/TodoList.type";

const todolist: ITodo[] = [
  {
    id: 1,
    selected: false,
    label: "Créer un composant React",
    status: Status.DONE,
  },
  {
    id: 2,
    selected: false,
    label: "Branche redux",
    status: Status.TODO,
  },
  {
    id: 3,
    selected: false,
    label: "Créer la todo list",
    status: Status.DOING,
  },
];

interface IDrink {
  strIngredient1: string;
}

function App() {
  const myRef = useRef(null);
  const [selectedList, setselectedList] = useState(todolist);
  const [count, setCount] = useState(selectedList.length);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("https://the-cocktail-db.p.rapidapi.com/list.php?i=list", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "1a97a1a761msh2b170c5408ad2a2p1b0b25jsn3c7ecd3b4d54"
      }
    })
        .then(response => response.json())
        .then(data => {
          setDrinks(data.drinks);
        })
        .catch(err => {
        });
  },[]);


  function  updateNumberOfTodo()  {
    (myRef!.current! as HTMLSpanElement).innerText = ''+count;
  }

  function  removeElement(e: { currentTarget: any; })  {
    // @ts-ignore
    const index = drinks.findIndex(drink => drink.strIngredient1 === e.currentTarget.id);
    const cloneDrinks = [...drinks]
    cloneDrinks.splice(index,1);
    setDrinks(cloneDrinks);
  }

  return (
    <Fragment>
      <h1>Ma liste à faire</h1>
      <div> ( <span ref={myRef}>{count}</span> elements)</div>
      <div className="App">
        <TodoList
          selectedList={selectedList}
          setselectedList={setselectedList}
        />
        <ul  className="list">
          {drinks.map((drink: any) => (
              <li key={drink.strIngredient1} >
                <a id={drink.strIngredient1} onClick={removeElement}>{drink.strIngredient1}</a>
                </li>
          ))}
        </ul>
        <input onClick={updateNumberOfTodo}/>
      </div>
    </Fragment>
  );
}

export default App;
