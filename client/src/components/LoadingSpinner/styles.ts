import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  spinner: {
    position: "fixed",
    left: "0px",
    top: "200px",
    bottom: "0px",
    right: "0px",
    width: "100%",
    height: "100%",
    zIndex: 1
  }
});

export {useStyles};
