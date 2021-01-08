import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskAPI} from "./api/task.api";
import {TaskDTO} from "./api/dto/task.dto";
import {Grid} from "@material-ui/core";
import {LoadingSpinner} from "./components/LoadingSpinner";
import {Task} from "./components/Task";
import {Navbar} from "./components/Navbar";
import {TaskModal} from "./components/TaskModal";

export const App:React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: string | number) => {
    setTasks(tasks.filter((task: TaskDTO) => task.id !== taskId))
  }

  useEffect(() => {
    const res = TaskAPI.getAll()

    res.then(res => {
      setTasks(res);
    })

  }, []);

  return (
    <div className="App">
      <TaskModal open={createTaskModalOpen} handleClose={() => setCreateTaskModalOpen(false)} onTaskCreated={addTask}/>
      <Navbar setCreateTaskModalOpen={setCreateTaskModalOpen}/>
      <Grid container spacing={1} style={{padding: '10px'}}>
        {tasks.length !== 0 ? (
          <>
            {tasks.map((task: TaskDTO) => {
              return (
                <Grid item xs={3} key={task.id}>
                  <Task data={task} onTaskDelete={deleteTask}/>
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
