import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { LOGIN } from "../../../../graphql/user";
import loginStyle from "./style";

const initialValues = { username: "", password: "" };

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const handleSubmit = async (values, setSubmitting, mutate) => {
  setSubmitting(true);
  try {
    const authData = await mutate({ variables: values });
    setSubmitting(false);
    if (authData) {
      const token = authData?.data?.login?.accessToken;
      console.log(token);
    } else {
      console.log("no auth data");
    }
  } catch (err) {
    console.log(err);
  }
};

const LoginForm = () => {
  const [mutate] = useMutation(LOGIN);
  const style = loginStyle();
  return (
    <>
      <h1 className={style.header}>Birr Bet</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting, mutate)
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
