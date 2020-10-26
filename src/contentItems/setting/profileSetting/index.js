import { Form, Formik } from "formik";
import React from "react";
import { TextField } from "../../../components/fields";
import * as Yup from "yup";
import FileUpload from "../../../components/fileUpload/upload/fileUpload";
import profileStyle from "./style";
import { Avatar, Grid } from "@material-ui/core";
import { SubmitButton } from "../../../components/buttons";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/user";
import { AlertError } from "../../../components/errors";

const getInitialValues = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    // profileImage: user.profileImage,
  };
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  // profileImage: Yup.string(),
});

const handleSubmit = async (values, setSubmitting, mutate, user) => {
  setSubmitting(true);
  try {
    await mutate({ variables: { id: user._id, updateInput: values } });
    window.location.reload(false);
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const ProfileSetting = ({ user }) => {
  console.log(user);
  const style = profileStyle();
  const [mutate, { error }] = useMutation(UPDATE_USER);
  return (
    <>
      {error && <AlertError />}
      <Formik
        initialValues={getInitialValues(user)}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting, mutate, user)
        }
      >
        {({ values, isSubmitting }) => {
          // const setProfile = (file) => {
          //   values.profileImage = file;
          // };
          return (
            <Form>
              <Grid container className={style.root}>
                {/* <Grid item container xs={12} className={style.profileUploaderC}>
                <Avatar className={style.avatar}>
                  <FileUpload setFile={setProfile} />
                </Avatar>
              </Grid> */}
                <Grid item xs={12} md={6} className={style.formItem}>
                  <TextField name="firstName" label="First name" />
                </Grid>
                <Grid item xs={12} md={6} className={style.formItem}>
                  <TextField name="lastName" label="Last name" />
                </Grid>
                <Grid item xs={12} md={6} className={style.formItem}>
                  <TextField name="username" label="User name" />
                </Grid>
                <Grid item xs={12} container className={style.submitBtnC}>
                  <SubmitButton label="Save" isSubmitting={isSubmitting} />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProfileSetting;

// accountBalance: 0
// firstName: "Ezedin"
// isActive: false
// isLocked: false
// isVerified: false
// lastName: "Fedlu"
// profileImage: "https://res.cloudinary.com/dtz77duv8/image/upload/v1596730625/default-profile-image_d8f6uf.png"
// role: "SUPER_ADMIN"
// username: "0923275571"
// __typename: "User"
// _id: "5f46b3e4669b5c001704c61a"
