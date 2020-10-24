import React from "react";
import PropTypes from "prop-types";
import { FieldArray, Form, Formik } from "formik";
import { TextField, SelectField } from "../../../../components/fields";
import { SubmitButton } from "../../../../components/buttons";
import { Button } from "@material-ui/core";
import * as Yup from "yup";

const getInitialValues = (mutationMode, shop) => {
  if (mutationMode === "CREATE") {
    return {
      branchName: "",
      admin: "",
      longitude: "",
      latitude: "",
      contacts: [{ type: "", value: "" }],
    };
  }
  return {
    branchName: shop.branchName,
    admin: shop.admin._id,
    longitude: shop.location.lon,
    latitude: shop.location.lat,
    contacts: shop.contacts,
  };
};

const ShopForm = ({ shop, admins, mutationMode }) => {
  console.log(shop);
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

  return (
    <Formik
      initialValues={getInitialValues(mutationMode, shop)}
      onSubmit={() => null}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextField name="branchName" label="Branch name" />
          <SelectField name="admin" label="Admin" data={reorganizedAdmins} />
          <TextField name="longitude" label="Longitude" type="number" />
          <TextField name="latigude" label="Latitude" type="number" />
          <FieldArray name="contacts">
            {({ push, remove, form }) => {
              const { contacts } = form.values;
              const canRemoveContacts = contacts.length > 1;
              return contacts.map((contact, index) => (
                <div key={contact}>
                  <Button onClick={() => push({ type: "", value: "" })}>
                    +
                  </Button>
                  <div>
                    <SelectField
                      name="type"
                      label="Contact type"
                      data={contactTypes}
                    />
                    <TextField name="value" label="Contact" />
                    {canRemoveContacts && (
                      <Button onClick={() => remove(index)}>-</Button>
                    )}
                  </div>
                </div>
              ));
            }}
          </FieldArray>
          <SubmitButton
            label={mutationMode === "CREATE" ? "Create" : "Edit"}
            isSubmitting={isSubmitting}
          />
        </Form>
      )}
    </Formik>
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
