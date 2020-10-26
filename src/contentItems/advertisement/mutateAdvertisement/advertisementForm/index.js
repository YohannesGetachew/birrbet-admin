import { useMutation } from "@apollo/client";
import { Button, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { SelectField, TextField } from "../../../../components/fields";
import FileUpload from "../../../../components/fileUpload/upload/fileUpload";
import { UPDATE_APP } from "../../../../graphql/app";
import advertisementFormStyle from "./style";
import PropTypes from "prop-types";
import { v4 as uuidv1 } from "uuid";
import * as Yup from "yup";
import { SubmitButton } from "../../../../components/buttons";
import { AlertError } from "../../../../components/errors";

const getInitialValues = (mutationMode, ads, adToEditId) => {
  if (mutationMode === "EDIT") {
    const currentAd = ads.find((ad) => ad.id === adToEditId);
    if (currentAd) {
      return {
        name: currentAd.name,
        position: currentAd.position,
        imagePath: currentAd.imagePath,
        id: currentAd.id,
      };
    }
  }
  return { name: "", position: "Header", imagePath: "", id: uuidv1() };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Advertisement name is required"),
  position: Yup.string().required("Advertisement position is required"),
  imagePath: Yup.string().required("image is required"),
  id: Yup.string().required(),
});

const handleSubmit = (
  values,
  setSubmitting,
  mutate,
  ads,
  adToEditId,
  mutationMode,
  appId,
  history
) => {
  setSubmitting(true);
  console.log("submistti");
  let variables = {};
  console.log(ads);
  const adsWithoutTypeName = ads.map((ad) => {
    const adWithoutTypeName = {};
    if (ad.__typename) {
      adWithoutTypeName.id = ad.id;
      adWithoutTypeName.imagePath = ad.imagePath;
      adWithoutTypeName.name = ad.name;
      adWithoutTypeName.position = ad.position;
    }
    return adWithoutTypeName;
  });
  if (mutationMode === "CREATE") {
    adsWithoutTypeName.push(values);
  } else {
    const adToEdit = adsWithoutTypeName.findIndex((ad) => ad.id === adToEditId);
    if (adToEdit >= 0) {
      adsWithoutTypeName[adToEdit] = {
        ...values,
        id: adsWithoutTypeName[adToEdit].id,
      };
    }
  }
  variables = {
    id: appId,
    appInput: { advertisements: [...adsWithoutTypeName] },
  };
  mutate({ variables })
    .then(() => {
      setSubmitting(false);
      history.push("/admin/advertisements");
    })
    .catch((e) => {
      setSubmitting(false);
      return;
    });
};

const AdvertisementForm = ({ mutationMode, ads, adToEditId, appId }) => {
  const adPositions = [
    { _id: "Header", name: "Header" },
    { _id: "Side", name: "Side" },
  ];
  const history = useHistory();
  const [mutate, { error }] = useMutation(UPDATE_APP);
  const style = advertisementFormStyle();
  return (
    <Formik
      initialValues={getInitialValues(mutationMode, ads, adToEditId)}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(
          values,
          setSubmitting,
          mutate,
          ads,
          adToEditId,
          mutationMode,
          appId,
          history
        )
      }
    >
      {({ values, isSubmitting, errors, touched }) => {
        const setFile = (file) => {
          values.imagePath = file;
        };
        return (
          <>
            {error && <AlertError />}
            <Form>
              <Grid container className={style.root}>
                <Grid item xs={12} md={6} className={style.formItem}>
                  <TextField name="name" label="Name" />
                </Grid>
                <Grid item xs={12} md={6} className={style.formItem}>
                  <SelectField
                    name="position"
                    label="Position"
                    data={adPositions}
                  />
                </Grid>
                <Grid item xs={12} className={style.formItem}>
                  <div className={style.uploaderHeader}>Image</div>
                  <span className={style.imageErr}>
                    {errors.imagePath && touched.imagePath}
                  </span>
                  <FileUpload setFile={setFile} max={1} accept="image/*" />
                </Grid>
                <div className={style.submitButtonC}>
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    className={style.submitButton}
                    label={mutationMode}
                  />
                </div>
              </Grid>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AdvertisementForm;

AdvertisementForm.propTypes = {
  mutationMode: PropTypes.string.isRequired,
};
