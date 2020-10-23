import React from "react";
import { Formik, Form } from "formik";
import { Button, Grid } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { TextField, SelectField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { CREATE_USER, UPDATE_USER } from "../../../../graphql/user";
import { AlertError } from "../../../../components/errors";
import userFormStyle from "./style";

const getInitialValues = (mutationMode, userData) => {
  if (mutationMode === "EDIT") {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      role: userData.role,
    };
  }
  return {
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    password: "",
  };
};

const getValidationSchema = (mutationMode) => {
  if (mutationMode === "EDIT") {
    return Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      username: Yup.string().required("User name is required"),
      role: Yup.string().required("Role is required"),
    });
  }

  return Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("User name is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required()
      .label("Confirm password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });
};

const handleSubmit = async (
  values,
  setSubmitting,
  mutate,
  mutationMode,
  userData,
  history,
  setErrors
) => {
  setSubmitting(true);
  delete values.confirmPassword;
  const variables =
    mutationMode === "EDIT"
      ? { id: userData._id, updateInput: values }
      : { userInput: values };

  try {
    await mutate({ variables: variables });
    setSubmitting(false);
    history.push("/admin/users");
  } catch (err) {
    console.log(err.message);
    setSubmitting(false);
    if (
      err &&
      err.message &&
      err.message.includes("E11000 duplicate key error collection:")
    ) {
      setErrors({ username: "Username already taken. Please choose another" });
    }
  }
};

const UserForm = ({ mutationMode, userData, history }) => {
  const mutationToUse = mutationMode === "EDIT" ? UPDATE_USER : CREATE_USER;
  const [mutate, { error }] = useMutation(mutationToUse);
  console.log(error);
  const roles = [
    { _id: "ADMIN", name: "Admin" },
    { _id: "SUPER_ADMIN", name: "Super admin" },
    { _id: "CUSTOMER", name: "Customer" },
  ];
  const style = userFormStyle();
  return (
    <Formik
      initialValues={getInitialValues(mutationMode, userData)}
      validationSchema={getValidationSchema(mutationMode)}
      onSubmit={(values, { setSubmitting, setErrors }) =>
        handleSubmit(
          values,
          setSubmitting,
          mutate,
          mutationMode,
          userData,
          history,
          setErrors
        )
      }
    >
      {({ isSubmitting, errors }) => (
        <Form>
          {console.log(errors)}
          <div>{error && <AlertError />}</div>
          <Grid container className={style.root}>
            <Grid item xs={12} md={6} className={style.formItemC}>
              <TextField name="firstName" label="First name" />
            </Grid>
            <Grid item xs={12} md={6} className={style.formItemC}>
              <TextField name="lastName" label="Last name" />
            </Grid>
            <Grid item xs={12} md={6} className={style.formItemC}>
              <TextField name="username" label="Username" />
            </Grid>
            <Grid item xs={12} md={6} className={style.formItemC}>
              <SelectField name="role" label="Role" data={roles} />
            </Grid>
            {mutationMode === "CREATE" && (
              <Grid item xs={12} md={6} className={style.formItemC}>
                <TextField name="password" label="Password" type="password" />
              </Grid>
            )}

            {mutationMode === "CREATE" && (
              <Grid item xs={12} md={6} className={style.formItemC}>
                <TextField
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                />
              </Grid>
            )}

            <Grid item container className={style.createButtonC}>
              {mutationMode === "EDIT" && (
                <Button onClick={() => history.push("/admin/users")}>
                  cancel
                </Button>
              )}
              <SubmitButton
                label={mutationMode === "EDIT" ? "Edit" : "Create"}
                isSubmitting={isSubmitting}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;

UserForm.propTypes = {
  mutationMode: PropTypes.string.isRequired,
  userData: PropTypes.object,
};

UserForm.defaultProps = {
  userData: null,
};
