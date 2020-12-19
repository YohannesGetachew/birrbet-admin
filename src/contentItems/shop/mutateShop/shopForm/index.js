import React from "react";
import PropTypes, { string } from "prop-types";
import { FieldArray, Form, Formik } from "formik";
import { TextField, SelectField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { Button, Grid } from "@material-ui/core";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { CREATE_SHOP, UPDATE_SHOP } from "../../../../graphql/shop";
import { useMutation } from "@apollo/client";
import { AlertError } from "../../../../components/errors";
import { useHistory } from "react-router-dom";
import shopFormStyle from "./style";
import { CustomIconButton } from "../../../../components/buttons/iconButtons";

const getInitialValues = (mutationMode, shop) => {
  if (mutationMode === "CREATE") {
    return {
      branchName: "",
      admin: "",
      longitude: "",
      latitude: "",
      contacts: [{ id: uuidv4(), type: "", value: "" }],
    };
  }
  return {
    branchName: shop.branchName,
    admin: shop.admin._id,
    longitude: shop.location.lon,
    latitude: shop.location.lat,
    contacts: shop.contacts.map((contact) => {
      return { ...contact, id: uuidv4() };
    }),
  };
};
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const validationSchema = Yup.object().shape({
  branchName: Yup.string().required("Branch name is required"),
  admin: Yup.string().required("Admin is required"),
  longitude: Yup.string().required("Longitude is required"),
  latitude: Yup.string().required("Latitude is required"),
  contacts: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      type: Yup.string().required("Please choose a contact type"),
      value: Yup.lazy((value, parent) => {
        switch (parent.parent.type) {
          case "E-MAIL":
            return Yup.string()
              .email("Please provide a valid email")
              .required("Email is required");
          case "PHONE":
            return Yup.string()
              .matches(phoneRegExp, "Please choose a valid phone number")
              .min(10, "Please choose a valid phone number")
              .max(13, "Please choose a valid phone number")
              .required("Phone number is required");
          default:
            return Yup.string().required(
              "Provide either an email or a password"
            );
        }
      }),
    })
  ),
});

const getPosition = (setFieldValue) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setFieldValue("longitude", position.coords.longitude);
    setFieldValue("latitude", position.coords.latitude);
  });
};

const handleSubmit = async (
  values,
  setSubmitting,
  mutate,
  mutationMode,
  shop,
  history
) => {
  setSubmitting(true);
  const location = {
    lat: parseFloat(values.latitude),
    lon: parseFloat(values.longitude),
  };
  const contacts = values.contacts.map((contact) => {
    return { type: contact.type, value: contact.value };
  });

  const variables = {
    shopInput: {
      branchName: values.branchName,
      adminId: values.admin,
      contacts,
      location,
    },
  };

  if (mutationMode === "EDIT") {
    variables.id = shop._id;
  }

  try {
    await mutate({ variables });
    window.location.reload(false);
  } catch (err) {
    setSubmitting(false);
    return;
  }
};

const sectionHeader = (style, title, action) => {
  return (
    <Grid container className={style.header}>
      {title}
      <span className={style.action}>{action}</span>
    </Grid>
  );
};

const ShopForm = ({ shop, admins, mutationMode }) => {
  const reorganizedAdmins = admins.map((admin) => {
    return {
      _id: admin._id,
      name: `${admin.firstName} ${admin.lastName} (${admin.username})`,
    };
  });

  const contactTypes = [
    { _id: "E-MAIL", name: "Email" },
    { _id: "PHONE", name: "Phone number" },
  ];

  const history = useHistory();
  const style = shopFormStyle();

  const mutationQuery = mutationMode === "CREATE" ? CREATE_SHOP : UPDATE_SHOP;
  const [mutate, { error }] = useMutation(mutationQuery);

  return (
    <>
      {error && <AlertError />}
      <Formik
        initialValues={getInitialValues(mutationMode, shop)}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(
            values,
            setSubmitting,
            mutate,
            mutationMode,
            shop,
            history
          )
        }
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Grid container className={style.root}>
              <Grid item container xs={12} md={6} className={style.formRow}>
                <Grid item xs={12} className={style.section}>
                  {sectionHeader(style, "Basic information")}
                  <div className={style.field}>
                    <TextField name="branchName" label="Branch name" />
                  </div>
                  <div className={style.field}>
                    <SelectField
                      name="admin"
                      label="Admin"
                      data={reorganizedAdmins}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} className={style.section}>
                  {sectionHeader(
                    style,
                    "Location",
                    <CustomIconButton
                      type="pinDrop"
                      handleClick={() => getPosition(setFieldValue)}
                    />
                  )}

                  <div className={style.field}>
                    <TextField
                      name="longitude"
                      label="Longitude"
                      type="number"
                    />
                  </div>
                  <div className={style.field}>
                    <TextField name="latitude" label="Latitude" type="number" />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={style.formRow}>
                <div className={style.section}>
                  <FieldArray name="contacts">
                    {({ push, remove, form }) => {
                      const { contacts } = form.values;
                      const canRemoveContacts = contacts.length > 1;
                      return (
                        <div>
                          {sectionHeader(
                            style,
                            "Contact information",
                            <CustomIconButton
                              variant="contained"
                              type="add"
                              handleClick={() =>
                                push({ id: uuidv4(), type: "", value: "" })
                              }
                            />
                          )}

                          {contacts.map((contact, index) => (
                            <Grid
                              container
                              key={contact.id}
                              className={style.contact}
                            >
                              <Grid item xs={12} md={4} className={style.field}>
                                <SelectField
                                  name={`contacts[${index}].type`}
                                  label="Contact type"
                                  data={contactTypes}
                                />
                              </Grid>
                              <Grid item xs={12} md={4} className={style.field}>
                                <TextField
                                  name={`contacts[${index}].value`}
                                  label="Contact"
                                  type={"text"}
                                />
                              </Grid>

                              <Grid item xs={2}>
                                {canRemoveContacts && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => remove(index)}
                                    className={style.removeContact}
                                  >
                                    -
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
              </Grid>
              <Grid item container className={style.submitButtonC}>
                <SubmitButton
                  label={mutationMode === "CREATE" ? "Create" : "Edit"}
                  isSubmitting={isSubmitting}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ShopForm;

ShopForm.propTypes = {
  shop: PropTypes.object,
  admins: PropTypes.array.isRequired,
  mutationMode: PropTypes.string.isRequired,
};

ShopForm.defaultProps = {
  shop: null,
};

// admin:
// firstName: "no"
// lastName: "ba"
// username: "e@gmail.com"
// __typename: "User"
// _id: "5f58ab415a63030017a2ee3f"
// __proto__: Object
// branchName: "shop1"
// contacts: Array(2)
// 0:
// type: "E-MAIL"
// value: "b@yahoo.com"
// __typename: "Contact"
// __proto__: Object
// 1:
// type: "E-MAIL"
// value: "0911235676"
// __typename: "Contact"
// __proto__: Object
// length: 2
// __proto__: Array(0)
// isActive: true
// location:
// lat: 9.0108471
// lon: 38.7811009
// __typename: "Location"
// __proto__: Object
// __typename: "Shop"
// _id: "5f5f5f85670d9c00176b9cce"
// __proto__: Object
