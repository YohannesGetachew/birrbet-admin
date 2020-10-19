import React from "react";
import { Skeleton } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import loaderStyle from "./style";

const Loader = () => {
  const style = loaderStyle();
  return (
    <div className={style.root}>
      <CircularProgress
        variant="indeterminate"
        className={style.progress}
        size={50}
      />
    </div>
  );
};

export default Loader;
