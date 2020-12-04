import { useMutation, useQuery } from "@apollo/client";
import { Button, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TRANSACTIONS } from "../../graphql/transaction";
import ViewTransactions from "./viewTransactions";
import transactionStyle from "./style";
import { useHistory } from "react-router-dom";
import { MESSAGES, UPDATE_MESSAGE } from "../../graphql/message";
import ViewDepositRequests from "./viewDepositRequests";
import {
  useGetDepositRequests,
  useGetTransactions,
} from "../../customHooks/dataFetchers";

const Transactions = () => {
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactions,
  } = useGetTransactions();
  const {
    loading: loadingDepositRequests,
    error: errorLoadingDepositRequests,
    data: depositRequests,
  } = useGetDepositRequests();

  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const history = useHistory();
  const style = transactionStyle();

  if (loadingTransactions || loadingDepositRequests) return <Loader />;

  if (errorLoadingTransactions || errorLoadingDepositRequests)
    return <AlertError />;

  return (
    <div>
      <div className={style.buttonC}>
        <Button
          onClick={() => history.push("/admin/transactions/create")}
          variant="contained"
          size="small"
          className={style.addBtn}
        >
          + Create transaction
        </Button>
      </div>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="reports-tab"
      >
        <Tab label="Pending" />
        <Tab label="Completed" />
      </Tabs>
      {currentTab === 0 && (
        <ViewDepositRequests
          depositRequests={depositRequests.depositRequests}
        />
      )}
      {currentTab === 1 && (
        <ViewTransactions transactions={transactions.transactions} />
      )}
    </div>
  );
};

export default Transactions;
