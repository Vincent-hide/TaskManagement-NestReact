import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {useStyles} from "./styles";

export const LoadingSpinner: React.FC = () => {
  const {spinner} = useStyles();
  return (
    <div className={spinner}>
      <ScaleLoader/>
    </div>

  );
}
