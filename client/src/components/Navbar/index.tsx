import React from "react";
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
  setCreateTaskModalOpen: (b: boolean) => void
}

export const Navbar: (props: Props) => JSX.Element = (props: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          Task Management
        </Typography>
        <Button variant="contained" onClick={() => props.setCreateTaskModalOpen(true)}>Create Task</Button>
      </Toolbar>
    </AppBar>
  );
}
