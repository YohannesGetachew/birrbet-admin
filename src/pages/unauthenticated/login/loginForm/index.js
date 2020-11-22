import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { useMutation, useLazyQuery } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";
import { LOGIN, IS_USER_EXISTS } from "../../../../graphql/user";
import { AuthContext, Actions } from "../../../../contexts/auth";
import logo from "../../../../assets/logo.png";
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
    if (authData) {
      const token = authData?.data?.login?.accessToken;
      if (token) {
        getUser({ variables: { phoneNumber: values.username } });
      }
    } else {
      console.log("no auth data present");
    }
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [mutate, { error: errorLoadingAuthData, data: authData }] = useMutation(
    LOGIN
  );
  const [getUser, { loading: loadingUser }] = useLazyQuery(IS_USER_EXISTS, {
    onCompleted: (userData) => {
      if (userData?.isUserExists?.role === "CUSTOMER") {
        return;
      }
      const token = authData?.login?.accessToken;
      const expiresIn = authData?.login?.expiresIn;
      const user = userData.isUserExists;
      dispatch(
        Actions.addAuthData({
          token,
          expiresIn,
          userData: user,
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
        <img
          width="100"
          height="100"
          src={logo}
          alt="Birr bet"
          className={style.logo}
        />
      </h1>
      {checkForErrors(errorLoadingAuthData) && (
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
                isSubmitting={isSubmitting || loadingUser}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
