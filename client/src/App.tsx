import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskAPI} from "./api/task.api";
import {TaskDTO} from "./api/dto/task.dto";
import {Grid} from "@material-ui/core";
import {LoadingSpinner} from "./components/LoadingSpinner";
import {Task} from "./components/Task";
import {Navbar} from "./components/Navbar";

export const App:React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  useEffect(() => {
    const res = TaskAPI.getAll()

    res.then(res => {
      setTasks(res);
    })

  }, []);

  return (
    <div className="App">
      <Navbar />
      <Grid container spacing={1} style={{padding: '10px'}}>
        {tasks.length !== 0 ? (
          <>
            {tasks.map((task: TaskDTO) => {
              return (
                <Grid item xs={3}>
                  <Task data={task} />
                </Grid>
              );
            })}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Grid>
    </div>
  );
}
