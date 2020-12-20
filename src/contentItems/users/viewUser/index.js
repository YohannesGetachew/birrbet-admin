import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertError } from "../../../components/errors";
import Loader from "../../../components/loader";
import { ViewTransactions } from "../../transactions";
import { ShowTickets } from "../../ticket";
import useGetUserData from "./data";
import Profile from "./profile";
import style from "./style";

const ViewUser = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetUserData(id);
  const [currentTab, setCurrentTab] = useState(0);
  const classes = style();
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <AlertError />;
  }

  const { role } = data.userResult.user;

  return (
    <>
      <Profile user={data.userResult.user} />
      {role !== "SUPER_ADMIN" && role !== "ADMIN" && (
        <div>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="reports-tab"
          >
            <Tab label="Tickets" />
            <Tab label="Transactions" />
          </Tabs>
          <div className={classes.tabC}>
            {currentTab === 0 && (
              <ShowTickets
                app={data.appResult.app}
                tickets={data.ticketsResult.tickets}
              />
            )}
            {currentTab === 1 && (
              <ViewTransactions
                transactions={data.transactionsResult.transactions}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
