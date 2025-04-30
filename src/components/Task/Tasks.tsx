import { TaskType } from "../../types/TaskTypes";
import "./Task.css"

interface ITasksProps{
    tasks: TaskType;
    handleTaskToogle: (id: string) => void;
}

export default function Tasks({tasks,handleTaskToogle}: ITasksProps ) {

    const {done,title,id} = tasks;

  return (
    <li className={`task-item ${done ? "task-item__done" : ""}`} >
      <input
        type="checkbox"
        checked={done}
        readOnly
        onChange={() => handleTaskToogle(id)}
      />
      {title}
    </li>
  );
}
