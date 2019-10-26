import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = ({ tasks, completedTasks }) => {
  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify({ tasks, completedTasks })
  );
};
const restoredTasks = () => {
  let taskMap = JSON.parse(localStorage.getItem("TASK_STORAGE_KEY"));
  return taskMap ? taskMap : { tasks: [], completedTasks: [] };
};

function Tasks() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = restoredTasks();
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(
    storedTasks.completedTasks
  );

  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTaskText = event => {
    setTaskText(event.target.value);
  };
  const addTask = () => {
    setTasks([...tasks, { taskText, id: uuid() }]);
  };
  const completeTasks = completeTasks => {
    setCompletedTasks([...completedTasks, completeTasks]);
    setTasks(tasks.filter(task => task.id !== completeTasks.id));
  };
  const deleteTasks = task => () => {
    setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
  };
  console.log("Tasks", tasks);

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input vaule={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map(task => {
          return (
            <div
              key={task.id}
              onClick={() => {
                completeTasks(task);
              }}
            >
              {task.taskText}
            </div>
          );
        })}
      </div>
      <div className="task-list">
        {completedTasks.map(task => {
          return (
            <div key={task.id} onClick={deleteTasks(task)}>
              {task.taskText + " "} <span className="delete-task">X</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Tasks;
