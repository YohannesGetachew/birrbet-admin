import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import ViewTransactions from "./viewTransactions";
import transactionStyle from "./style";
import ViewDepositRequests from "./viewDepositRequests";
import {
  useGetDepositRequests,
  useGetTransactions,
} from "../../customHooks/dataFetchers";
import { AddButton } from "../../components/buttons";
import { useGetCurrentUserRole } from "../../customHooks/helpers";

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

  const currentUserRole = useGetCurrentUserRole();

  const style = transactionStyle();

  if (loadingTransactions || loadingDepositRequests) return <Loader />;

  if (errorLoadingTransactions || errorLoadingDepositRequests)
    return <AlertError />;

  return (
    <div>
      <div className={style.buttonC}>
        <AddButton
          label="+ Create transaction"
          redirectRoute="/admin/transactions/create"
          dontRender={currentUserRole !== "CASHIER"}
        />
      </div>
      {currentUserRole !== "CASHIER" ? (
        <ViewTransactions transactions={transactions.transactions} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Transactions;
export { ViewTransactions };
