import "./App.css";
import { useState } from "react";
import { TaskType } from "./types/TaskTypes";
import {v4 as uuidv4} from "uuid"
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("task-list", []);

  function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
    if (input.length && event.key === "Enter") {
        setTasks([...tasks, {id: uuidv4(), title: input, done: true }]);
        setInput("");
        console.log("tag add")
      };
      
    }
  

  return (
    <div className="container-app">
      <div className="container-app__header">
        <div className="container-app__mask" />
        <h1>Tarefas</h1>
        <input
          type="text"
          placeholder="Criar nova tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul className="content-tasks">
        {tasks.map((t) => (
          <li
            className={`task-item ${t.done ? "task-item__done" : ""}`}
            key={t.id}
          >
            <input type="checkbox" checked={t.done} readOnly />
            {t.title}
          </li>
        ))}
        <li className="content-tasks__actions">
          <div><a href="#">Itens restantes</a></div>
          <div>
            <a href="#">Todas</a>
            <a href="#">Ativas</a>
            <a href="#">Completadas</a>
          </div>
          <div><a href="#">Limpar Completadas</a></div>
        </li>
      </ul>
    </div>
  );
}

export default App;
