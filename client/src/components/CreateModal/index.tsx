import React, {useState} from 'react';
import {createStyles, makeStyles, Modal, Theme, TextField, Button} from "@material-ui/core";
import {TaskAPI} from "../../api/task.api";
import {TaskDTO} from "../../api/dto/task.dto";
import {useStyles} from "./style";
import {getModalStyle} from "../Utility";

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskCreated: (task: TaskDTO) => void
}

export const CreateModal = (props: Props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<undefined | string>(undefined);

  const createTask = async () => {
    if (title) {
      const res = await TaskAPI.createOne({
        title,
        description
      });
      props.onTaskCreated(res);
      console.log("New Task", res);
    } else {
      console.log("Invalid Input")
    }
    props.handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a new task</h2>
      <p id="simple-modal-description">
        What do you need to accomplish?
      </p>

      <TextField
        id="outlined-textarea"
        label="Task title"
        placeholder="What to complete?"
        multiline
        variant="outlined"
        className={classes.input}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-textarea"
        label="Task description"
        placeholder="What is it about?"
        multiline
        variant="outlined"
        className={classes.input}
        onChange={e => setDescription(e.target.value)}
      />
      <Button color={"primary"} variant={"contained"} className={classes.input} onClick={createTask}>Add a task</Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
