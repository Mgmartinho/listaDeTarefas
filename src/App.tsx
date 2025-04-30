import "./App.css";
import { useState } from "react";
import { TaskType } from "./types/TaskTypes";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "usehooks-ts";
import Empty from "./components/Empty/Empty";
import Tasks from "./components/Task/Tasks";
import Filters from "./components/Filters/Filters";
import { FilterType } from "./types/FilterType";

//imagem


function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("task-list", []);
 //FILTRAGEM POR TIPO
  const [filter,setFilter] =useState<FilterType>("all");
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (input.length && event.key === "Enter") {
      setTasks([...tasks, { id: uuidv4(), title: input, done: false }]);
      setInput("");
      console.log("tag add");
    }
  }

  function handleSetTasks (newTasks: TaskType[]){
    setTasks(newTasks);
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

  function handleSetFilter(newFilter: FilterType[]) {
    setFilter(newFilter);
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
          <Tasks tasks={t} handleTaskToogle={handleTaskToogle}/>
        ))}

      
          <Empty 
           show
          title="Nenhuma tarefa encontrada!"
          />
        
          <Filters 
          handleSetTasks={handleSetTasks} 
          tasks={tasks}
          handleSetFilter={handleSetFilter}
          />
       
      </ul>
    </div>
  );
}

export default App;
