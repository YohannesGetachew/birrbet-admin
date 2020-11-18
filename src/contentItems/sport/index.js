import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SPORTS, UPDATE_SPORT } from "../../graphql/sport";
import Loader from "../../components/loader";
import { AlertError } from "../../components/errors";
import Table from "../../components/table";
import { useTheme } from "@material-ui/core";
import getSportTableColumns from "./sportTableColumns";
import CustomModal from "../../components/modal";
import sportStyle from "./style";
import CancelButton from "../../components/buttons/cancelButton";
import { SubmitButton } from "../../components/buttons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FieldText from "../../components/fields/TextField";

const handleSportUpdate = async (
  values,
  setSubmitting,
  initialMutationVariable,
  updateSports,
  handleModalClose
) => {
  setSubmitting(true);
  const didValueChange =
    values.order !== initialMutationVariable.updateInput.order;
  if (!didValueChange) {
    return handleModalClose();
  }
  try {
    await updateSports({
      variables: {
        ...initialMutationVariable,
        updateInput: {
          isAvailable: initialMutationVariable.updateInput.isAvailable,
          order: values.order,
        },
      },
    });
    handleModalClose();
  } catch (err) {
    return;
  }
};

const Sport = () => {
  const sportModalRef = useRef();
  const style = sportStyle();
  const [mutationVariables, setMutationVariables] = useState(null);
  const [sportName, setSportName] = useState("");
  const {
    data: sportData,
    loading: loadingSports,
    error: errorLoadingSports,
  } = useQuery(SPORTS);
  const [
    updateSports,
    { data, loading: isUpdatingSports, error: errorUpdatingSport },
  ] = useMutation(UPDATE_SPORT);
  const theme = useTheme();

  const handleModalOpen = (id, order, sportName, isAvailable) => {
    setMutationVariables({ id, updateInput: { order, isAvailable } });
    setSportName(sportName);
    sportModalRef.current.openModal();
  };

  const handleModalClose = () => {
    sportModalRef.current.closeModal();
  };
  if (loadingSports) return <Loader />;
  if (errorLoadingSports) return <AlertError />;

  return (
    <>
      {errorUpdatingSport && <AlertError />}
      <CustomModal ref={sportModalRef}>
        <Formik
          initialValues={{
            order:
              mutationVariables?.updateInput?.order &&
              !isNaN(mutationVariables?.updateInput?.order)
                ? mutationVariables?.updateInput?.order
                : "",
          }}
          validationSchema={Yup.object().shape({
            order: Yup.number()
              .typeError("Please input a number")
              .integer("Oly an integer is allowed")
              .min(1, "Minimum order is 1")
              .max(
                sportData.sports.length,
                `Maximum order is ${sportData.sports.length}`
              )
              .required("Order is required"),
          })}
          onSubmit={(values, { setSubmitting }) =>
            handleSportUpdate(
              values,
              setSubmitting,
              mutationVariables,
              updateSports,
              handleModalClose
            )
          }
        >
          {({ isSubmitting }) => (
            <div className={style.modalC}>
              {sportName}
              <Form>
                <FieldText type="number" label="Order" name="order" />
                <div className={style.buttonsC}>
                  <CancelButton customClickHandler={handleModalClose} />
                  <SubmitButton label="Save" isSubmitting={isSubmitting} />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </CustomModal>
      <Table
        columns={getSportTableColumns(
          theme,
          handleModalOpen,
          sportData.sports.length
        )}
        data={sportData.sports}
      />
    </>
  );
};

export default Sport;
