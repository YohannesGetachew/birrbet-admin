import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { useMutation, useLazyQuery } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";
import { LOGIN, CURRENT_USER, USERS } from "../../../../graphql/user";
import { AuthContext, Actions } from "../../../../contexts/auth";
import Cookies from "js-cookie";
import loginStyle from "./style";

const initialValues = { username: "", password: "" };

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const handleSubmit = async (values, setSubmitting, mutate, getUser) => {
  setSubmitting(true);
  try {
    const authData = await mutate({ variables: values });
    setSubmitting(false);
    if (authData) {
      const token = authData?.data?.login?.accessToken;
      const expiresIn = authData?.data?.login?.expiresIn;
      if (token) {
        Cookies.set("Authorization", `Bearer ${token}`);
        Cookies.set("Expires_in", expiresIn);
        if (Cookies.getJSON("Authorization") && Cookies.getJSON("Expires_in")) {
          getUser();
        }
      }
    } else {
      console.log("no auth data present");
    }
  } catch (err) {
    return;
  }
};

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [mutate, { error }] = useMutation(LOGIN);
  // const [unauthenticated, setUnauthenticated] = useState(false);
  const [getUser, { data, loading }] = useLazyQuery(CURRENT_USER, {
    onCompleted: (data) => {
      if (data?.whoami?.role === "CUSTOMER") {
        return;
      }
      const token = Cookies.getJSON("Authorization");
      const expiresIn = Cookies.getJSON("Expires_in");
      dispatch(
        Actions.addAuthData({
          token: token,
          userData: data.whoami,
          expiresIn: expiresIn,
        })
      );
    },
  });
  const style = loginStyle();
  const checkForErrors = (error) => {
    if (
      error &&
      (error.message === "User not found" ||
        error.message === "Invalid credentials")
    ) {
      // setUnauthenticated(false);
      return true;
    }
  };
  return (
    <>
      <h1 className={style.header}>
        <span className={style.logo}>B</span>irr bets
      </h1>
      {checkForErrors(error) && (
        <div className={style.errorC}>
          <AlertError message="Wrong credentials" />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting, mutate, getUser)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField name="username" label="Username" dark={true} />
            <TextField
              name="password"
              label="Password"
              dark={true}
              type="password"
            />
            <div className={style.submitBtnC}>
              <SubmitButton
                label="LOGIN"
                fullWidth={true}
                isSubmitting={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
