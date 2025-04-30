import { FilterType } from "../../types/FilterType";
import { TaskType } from "../../types/TaskTypes";
import "./Filters.css"


interface IFilterProps{
    tasks: TaskType[];
    handleSetTasks: (tasks: TaskType[]) => void;
    handleSetFilter: (filter: FilterType[]) => void;
}



export default function Filters({tasks, handleSetTasks, handleSetFilter}: IFilterProps) {

    //CONTADOR DE ITENS RESTANTES
    const pendingTasksQtd = tasks.filter((tasks) => !tasks.done).length;
     
    function hendleUnchekedAllCompletedTasks(){
        const filteredTasks = tasks.map((task) => 
            task.done ? {...task, done: false} : task);

        handleSetTasks{filteredTasks}
      }

    return(
        <li className="content-tasks__actions">
        <div>
          <a href="#">{pendingTasksQtd} Itens Restantes</a>
        </div>
        <div>
          <a href="#" onClick={() => handleSetFilter("all")}>Todas</a>
          <a href="#" onClick={() => handleSetFilter("pending")}>Ativas</a>
          <a href="#" onClick={() => handleSetFilter("done")}>Completadas</a>
        </div>
        <div>
          <a href="#" onClick={hendleUnchekedAllCompletedTasks}>Limpar Completadas</a>
        </div>
      </li>
    )
}