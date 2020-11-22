import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { TextField } from "../../../components/fields";
import * as Yup from "yup";
import profileStyle from "./style";
import { Button, Grid } from "@material-ui/core";
import { SubmitButton } from "../../../components/buttons";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/user";
import { AlertError } from "../../../components/errors";
import AvatarUpload from "../../../components/fileUpload/avatarUpload";
import { UPDATE_PROFILE_IMAGE } from "../../../graphql/file";
import { useHistory } from "react-router-dom";
import { AuthContext, Actions } from "../../../contexts/auth";

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

const handleSubmit = async (
  values,
  setSubmitting,
  mutate,
  user,
  authData,
  dispatch
) => {
  setSubmitting(true);
  try {
    const updatedUserData = await mutate({
      variables: { id: user._id, updateInput: values },
    });
    const updatedAuthData = {
      ...authData,
      userData: { ...updatedUserData.data.updateUser },
    };
    dispatch(Actions.addAuthData(updatedAuthData));
    window.location.reload(false);
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const handleProfileUpload = async (uploadProfilePic, id, image) => {
  try {
    await uploadProfilePic({ variables: { id, image } });
  } catch (err) {
    return;
  }
};

const ProfileSetting = ({ user }) => {
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [
    uploadProfilePic,
    { data, loading: isUpdatingProfile, error: uploadingFailed },
  ] = useMutation(UPDATE_PROFILE_IMAGE);
  const { authData, dispatch } = useContext(AuthContext);
  const style = profileStyle();
  const [mutate, { error }] = useMutation(UPDATE_USER);
  return (
    <>
      {(error || uploadingFailed) && <AlertError />}
      <Formik
        initialValues={getInitialValues(user)}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting, mutate, user, authData, dispatch)
        }
      >
        {({ values, isSubmitting }) => {
          const getFile = (file) => {
            setProfileImage(file);
          };
          return (
            <Form>
              <Grid container className={style.root}>
                <Grid item container xs={12} className={style.profileUploaderC}>
                  <AvatarUpload
                    getFile={getFile}
                    label={"Profile picture"}
                    initialFile={profileImage}
                  />
                  <Button
                    disabled={
                      isUpdatingProfile || profileImage === user.profileImage
                    }
                    variant="contained"
                    size="small"
                    color={"secondary"}
                    onClick={() =>
                      handleProfileUpload(
                        uploadProfilePic,
                        user._id,
                        profileImage
                      )
                    }
                  >
                    {isUpdatingProfile
                      ? "Changing pic"
                      : "Confirm image change"}
                  </Button>
                </Grid>

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
                  <SubmitButton
                    label="Save"
                    isSubmitting={isSubmitting}
                    disabled={isUpdatingProfile || isSubmitting}
                  />
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
