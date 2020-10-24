import { Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { TextField, SelectField } from "../../../components/fields";

const MutateShop = (props) => {
  const { id } = useParams();
  return (
    <Formik>
      <Form>{/* <TextField name/> */}</Form>
    </Formik>
  );
};

export default MutateShop;
