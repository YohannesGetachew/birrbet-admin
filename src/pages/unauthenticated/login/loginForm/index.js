import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";
import { LOGIN } from "../../../../graphql/user";
import { AuthContext, Actions } from "../../../../contexts/auth";
import loginStyle from "./style";

const initialValues = { username: "", password: "" };

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const handleSubmit = async (
  values,
  setSubmitting,
  mutate,
  dispatch,
  addAuthData
) => {
  setSubmitting(true);
  try {
    const authData = await mutate({ variables: values });
    setSubmitting(false);
    if (authData) {
      const token = authData?.data?.login?.accessToken;
      if (token) return dispatch(addAuthData(authData.data.login));
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
  const style = loginStyle();
  return (
    <>
      <h1 className={style.header}>
        <span className={style.logo}>B</span>irr bets
      </h1>
      {error && error.message === "User not found" && (
        <div className={style.errorC}>
          <AlertError message="Wrong credentials" />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(
            values,
            setSubmitting,
            mutate,
            dispatch,
            Actions.addAuthData
          )
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
