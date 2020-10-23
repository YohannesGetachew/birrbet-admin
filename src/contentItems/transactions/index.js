import { useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { TRANSACTIONS } from "../../graphql/transaction";
import ViewTransactions from "./viewTransactions";
import transactionStyle from "./style";
import { useHistory } from "react-router-dom";

const Transactions = () => {
  const {
    loading: loadingTransactions,
    error: errorLoadingTransactions,
    data: transactions,
  } = useQuery(TRANSACTIONS, { fetchPolicy: "network-only" });
  const history = useHistory();
  const style = transactionStyle();
  if (loadingTransactions) return <Loader />;
  if (errorLoadingTransactions) return <AlertError />;
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
      <ViewTransactions transactions={transactions.transactions} />
    </div>
  );
};

export default Transactions;
