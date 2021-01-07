import React from 'react';
import {TaskDTO} from "../../api/dto/task.dto";
import {Card, CardContent, Typography, CardActions, Button, Container} from "@material-ui/core";

interface Props {
  data: TaskDTO
}

export const Task: ({data}: Props) => JSX.Element = ({data}: Props) => {
  const {title, description, status} = data;

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
          <Button size="small" variant="contained" style={{marginLeft: '5px'}} color="secondary">Delete</Button>
        </Container>
      </CardActions>
    </Card>
  );
};
