import "./App.css";
import { useState } from "react";
import { TaskType } from "./types/TaskTypes";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import Empty from "./components/Empty/Empty";

//imagem


function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("task-list", []);
  //CONTADOR DE ITENS RESTANTES
  const pendingTasksQtd = tasks.filter((tasks) => !tasks.done).length;
  //FILTRAGEM POR TIPO
  const [filter,setFilter] =useState<"all" | "done" | "pending">("all");
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (input.length && event.key === "Enter") {
      setTasks([...tasks, { id: uuidv4(), title: input, done: false }]);
      setInput("");
      console.log("tag add");
    }
  }

  function handleTaskToogle(id: string){
    setTasks((prevState) => 
      prevState.map((task) => 
        task.id === id ? {...task, done: !task.done} : task))
  }

  function filteredTasks() {
    switch(filter){
      case "all": 
        return tasks;
      case "done":
        return tasks.filter((tasks) => tasks.done);
      case "pending": 
        return tasks.filter((tasks) => !tasks.done);
      default: 
        return [];
    }
  }

  function hendleUnchekedAllCompletedTasks(){
    setTasks((prevState) => prevState.map((task) => task.done ? {...task, done: false} : task))
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
        {filteredTasks().map((t) => (
          <li
            className={`task-item ${t.done ? "task-item__done" : ""}`}
            key={t.id}
          >
            <input 
              type="checkbox" 
              checked={t.done} 
              readOnly 
              onChange={() => handleTaskToogle(t.id)}
            />
            {t.title}
          </li>
        ))}

        {filteredTasks().length === 0 && (
          <Empty title="Nenhuma tarefa encontrada!"/>
        )}

        <li className="content-tasks__actions">
          <div>
            <a href="#">{pendingTasksQtd} Itens Restantes</a>
          </div>
          <div>
            <a href="#" onClick={() => setFilter("all")}>Todas</a>
            <a href="#" onClick={() => setFilter("pending")}>Ativas</a>
            <a href="#" onClick={() => setFilter("done")}>Completadas</a>
          </div>
          <div>
            <a href="#" onClick={hendleUnchekedAllCompletedTasks}>Limpar Completadas</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
