import React from "react";
import { Grid } from "@material-ui/core";
import LoginForm from "./loginForm";
import loginStyle from "./style";
import sports from "./sports.png";

const Login = () => {
  const style = loginStyle();
  return (
    <Grid container className={style.root}>
      <Grid item container xs={12} md={6} className={style.formC}>
        <LoginForm />
      </Grid>
      <Grid item xs={false} md={6} className={style.pictureC}>
        <img src={sports} alt="sports" className={style.picture} />
      </Grid>
    </Grid>
  );
};

export default Login;
