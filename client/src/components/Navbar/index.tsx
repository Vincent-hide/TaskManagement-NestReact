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

export const Navbar: React.FC = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          Task Management
        </Typography>
        <Button variant="contained">Create Task</Button>
      </Toolbar>
    </AppBar>
  );
}
