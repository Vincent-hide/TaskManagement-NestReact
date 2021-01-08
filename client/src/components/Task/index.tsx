import React from 'react';
import {TaskDTO} from "../../api/dto/task.dto";
import {Card, CardContent, Typography, CardActions, Button, Container} from "@material-ui/core";
import {TaskAPI} from "../../api/task.api";

interface Props {
  data: TaskDTO,
  onTaskDelete: (taskId: number | string) => void
}

export const Task: ({data, onTaskDelete}: Props) => JSX.Element = ({data, onTaskDelete}: Props) => {
  const {id, title, description, status} = data;

  const deleteTask = async (id: string | number) => {
    await TaskAPI.deleteOne(id);
    onTaskDelete(id);
  }

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
        <Typography>
          {status}
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
          <Button size="small" variant="contained" style={{marginRight: '5px'}} color="primary">Edit</Button>
          <Button size="small" variant="contained" style={{marginLeft: '5px'}} color="secondary"
                  onClick={() => deleteTask(id)}>Delete</Button>
        </Container>
      </CardActions>
    </Card>
  );
};
