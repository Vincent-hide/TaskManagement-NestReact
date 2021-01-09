import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskAPI} from "./api/task.api";
import {TaskDTO} from "./api/dto/task.dto";
import {Container, Grid} from "@material-ui/core";
import {LoadingSpinner} from "./components/LoadingSpinner";
import {Task} from "./components/Task";
import {Navbar} from "./components/Navbar";
import {CreateModal} from "./components/CreateModal";
import {EditModal} from "./components/EditModal";

import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

export const App: React.FC = () => {
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
        if (taskDTO.id === task.id) return task;
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      <CreateModal open={createTaskModalOpen} handleClose={() => setCreateTaskModalOpen(false)}
                   onTaskCreated={addTask}/>
      <EditModal open={updateTaskModalOpen} handleClose={() => setUpdateTaskModalOpen(false)} onTaskUpdated={updateTask}
                 data={taskEdited as TaskDTO}/>
      <Navbar setCreateTaskModalOpen={setCreateTaskModalOpen}/>

      <Container style={{marginTop: 50}}>
        <Grid container spacing={1} style={{padding: '10px'}}>
          {tasks.length !== 0 ? (
            <>
              {tasks.map((task: TaskDTO) => {
                return (
                  <Grid item container xs={12} sm={6} md={4} key={task.id} justify="center">
                    <Task data={task} onTaskDelete={deleteTask} onTaskUpdate={handleEditTaskBtnClick}/>
                  </Grid>
                );
              })}
            </>
          ) : (
            <div style={{marginTop: 20}}>
              <LoadingSpinner/>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
}
