import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Status } from "./components";
import { ITodo } from "./components/TodoList.type";
import { useCombinedRefs } from "./utils";
import { setTimeout } from "timers";

// Initial state
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

// pour passer une ref d'un composant parent vers son enfant, on utilise le forwardRef
const ComponentForwardRef = React.forwardRef(function ComponentForwardRef( // on nomme la function pour la retrouver nommée dans l'interface de React devtools sur le browser
  props: any,
  ref: any
) {
  const innerRef = React.useRef(null);

  const combinedRef: any = useCombinedRefs(ref, innerRef);

  // https://fr.reactjs.org/docs/hooks-reference.html#uselayouteffect
  React.useLayoutEffect(() => {
    const rect = (combinedRef!.current! as HTMLElement).getBoundingClientRect();
    console.log("Input dimensions:", rect.width, rect.height);
  }, [combinedRef, ref]);

  return (
    <section className="container">
      <h1>Un composant de test qui utilise forwardRef</h1>
      <div className="container__ref" ref={combinedRef}>
        Ici est le conteneur de la div sur laquelle la ref du parent est passé
        et qui sera mis en couleur
      </div>
    </section>
  );
});

interface IIngredient {
  strIngredient1: string;
}

// composant principal
function App() {
  const [selectedList, setselectedList] = useState(todolist);
  const myRef = useRef<any>(null);

  const [ingredientsList, setingredientsList] = useState([]);
  const [alerting, setalerting] = useState(false);

  const searchIngredient = useCallback(
    (e) => {
      const searchTerm = e.currentTarget.value;
      const filteredIngredientsList = ingredientsList.filter(
        (ingredient: IIngredient) => {
          return ingredient!
            .strIngredient1!.toLowerCase()
            .startsWith(searchTerm.toLowerCase());
        }
      );
      setingredientsList(filteredIngredientsList);
    },
    [ingredientsList]
  );

  useEffect(() => {
    console.log("did mount");

    fetch("https://the-cocktail-db.p.rapidapi.com/list.php?i=list", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "5ac84d7878msh98e545dee42d208p1f9880jsnea0afef4297e",
      },
    })
      .then((response) => {
        return response.json().then(function (json) {
          setingredientsList(json.drinks);

          // traitement du JSON
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  setTimeout(() => {
    setalerting(true);
  }, 2000);

  function handleClickToChangeColor(color: string) {
    myRef.current.style.background = color;
  }

  return (
    <Fragment>
      <h1>Ma liste à faire</h1>
      <div className="App">
        <TodoList
          selectedList={selectedList}
          setselectedList={setselectedList}
          alerting={alerting}
        />
        {/* <div ref={myRef}>Zone qui change de couleur</div> */}
        <ComponentForwardRef ref={myRef} />

        <input
          className="button"
          type="button"
          value="Change color"
          onClick={() => handleClickToChangeColor("#00f")}
        />

        <h4>Liste des ingrédients récupérés depuis une API</h4>
        <label htmlFor="searchIngredient">Rechercher un ingrédient</label>
        <input type="text" onChange={searchIngredient} />
        <ul className="list">
          {ingredientsList.map((ingredient: any) => (
            <li key={ingredient.strIngredient1}>{ingredient.strIngredient1}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default App;
