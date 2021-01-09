import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Modal, Theme, TextField, Button} from "@material-ui/core";
import {TaskAPI} from "../../api/task.api";
import {TaskDTO, TaskStatus} from "../../api/dto/task.dto";
import {useStyles} from "./style";
import {getModalStyle} from "../Utility";
import {toast} from "react-toastify";

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskUpdated: (task: TaskDTO) => void;
  data: TaskDTO;
}

export const EditModal = (props: Props) => {
  const {data, handleClose, onTaskUpdated, open} = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState<undefined | string>(undefined);
  const [status, setStatus] = useState(0)

  useEffect(() => {
    if(data) {
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    }
  }, [data])

  const updateTask = async () => {
    if (title) {
      const res = await TaskAPI.updateOne(props.data.id, {
        title,
        description,
        status
      });
      // to update the home page, right after editing task instead of refreshing a page
      onTaskUpdated(res);
      console.log("Task Edited", res);
      toast.success(`New Task: "${res.title}" created`);
    } else {
      console.log("Invalid Input");
      toast.error(`Invalid Input`);
    }
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update a new task</h2>
      <p id="simple-modal-description">
        How do you want to change a plan?
      </p>

      <TextField
        id="outlined-textarea"
        label="Task title"
        // placeholder="What to complete?"
        multiline
        variant="outlined"
        className={classes.input}
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        id="outlined-textarea"
        label="Task description"
        placeholder="What is it about?"
        multiline
        variant="outlined"
        className={classes.input}
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <Button color={"primary"} variant={"contained"} className={classes.input} onClick={updateTask}>Update a
        task</Button>
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
