import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskAPI} from "./api/task.api";
import {TaskDTO} from "./api/dto/task.dto";
import {Grid} from "@material-ui/core";
import {LoadingSpinner} from "./components/LoadingSpinner";
import {Task} from "./components/Task";
import {Navbar} from "./components/Navbar";
import {CreateModal} from "./components/CreateModal";
import {EditModal} from "./components/EditModal";

export const App:React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [taskEdited, setTaskEdited] = useState<undefined | TaskDTO>(undefined);

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  };

  // to update the home page right after removing the task instead of refreshing a page
  const deleteTask = (taskId: string | number) => {
    setTasks(tasks.filter((task: TaskDTO) => task.id !== taskId))
  }

  const updateTask = (task: TaskDTO) => {
    setTasks(
      tasks.map((taskDTO: TaskDTO) => {
        if(taskDTO.id === task.id) return task;
        return taskDTO;
      })
    )
  }

  const handleEditTaskBtnClick = (task: TaskDTO) => {
    setTaskEdited(task);
    setUpdateTaskModalOpen(true)
  }

  useEffect(() => {
    const res = TaskAPI.getAll()

    res.then(res => {
      setTasks(res);
    })

  }, []);

  return (
    <div className="App">
      <CreateModal open={createTaskModalOpen} handleClose={() => setCreateTaskModalOpen(false)} onTaskCreated={addTask}/>
      <EditModal open={updateTaskModalOpen} handleClose={() => setUpdateTaskModalOpen(false)} onTaskUpdated={updateTask} data={taskEdited as TaskDTO}/>
      <Navbar setCreateTaskModalOpen={setCreateTaskModalOpen}/>
      <Grid container spacing={1} style={{padding: '10px'}}>
        {tasks.length !== 0 ? (
          <>
            {tasks.map((task: TaskDTO) => {
              return (
                <Grid item xs={3} key={task.id}>
                  <Task data={task} onTaskDelete={deleteTask} onTaskUpdate={handleEditTaskBtnClick}/>
                </Grid>
              );
            })}
          </>
        ) : (
          <div style={{marginTop: 20}}>
            <LoadingSpinner />
          </div>
        )}
      </Grid>
    </div>
  );
}
