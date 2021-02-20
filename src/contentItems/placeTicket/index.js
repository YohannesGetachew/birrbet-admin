import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { SubmitButton } from "../../components/buttons";
import { AlertError } from "../../components/errors";
import FieldText from "../../components/fields/TextField";
import Loader from "../../components/loader";
import { useGetApp } from "../../customHooks/dataFetchers";
// import useGetCurrentUserRole from "../../customHooks/helpers/useGetCurrentUserRole";
import { TICKETS } from "../../graphql/ticket";
import PrintableTicket from "../ticket/showTickets/printableTicket";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const PlaceTicket = () => {
  const [getTicket, { data, loading, error, called }] = useLazyQuery(TICKETS);
  // const [currentTab, setCurrentTab] = useState("PLACE");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // const currentUserRole = useGetCurrentUserRole();
  const {
    loading: appLoading,
    data: appData,
    error: errorLoadingApp,
  } = useGetApp();
  if (appLoading) {
    return <Loader />;
  }
  if (errorLoadingApp) {
    return <AlertError />;
  }
  return (
    <div>
      <Formik
        initialValues={{ ticketID: "" }}
        onSubmit={(values) =>
          getTicket({
            variables: { ticketID: values.ticketID.toUpperCase() },
          })
        }
      >
        <Form>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FieldText
              variant={"filled"}
              name={"ticketID"}
              label={"Search ticket ID"}
              fullWidth={false}
            />
            <div style={{ marginLeft: "10px" }}>
              <SubmitButton label={"Search"} isSubmitting={loading} />
            </div>
          </div>
        </Form>
      </Formik>
      <div style={{ padding: "10px 0 10px 0" }}>
        {error && <AlertError />}
        {data?.tickets.length === 1 ? (
          <>
            {/* <div style={{ display: "flex", justifyContent: "end" }}>
              <TextField
                // className={style.root}
                select
                value={currentTab}
                onChange={(e) => setCurrentTab(e.target.value)}
              >
                {currentUserRole === "CASHIER" && (
                  <MenuItem key={"PLACE"} value={"PLACE"}>
                    PLACE
                  </MenuItem>
                )}
                {currentUserRole === "CASHIER" && (
                  <MenuItem key={"PRINT"} value={"PRINT"}>
                    PRINT
                  </MenuItem>
                )}
                <MenuItem key={"VIEW"} value={"VIEW"}>
                  VIEW
                </MenuItem>
              </TextField>
            </div> */}
            <PrintableTicket
              ticket={data.tickets[0]}
              actionMode={"PLACE"}
              app={appData.app}
              ref={componentRef}
            />
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={handlePrint}
                style={{ backgroundColor: "blue", color: "#ffffff" }}
              >
                PRINT
              </Button>
            </div>
          </>
        ) : null}
        {called && data?.tickets.length === 0 && "No tickets found"}
      </div>
    </div>
  );
};

export default PlaceTicket;
