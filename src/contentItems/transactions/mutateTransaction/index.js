import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { USERS } from "../../../graphql/user";
import Loader from "../../../components/loader";
import { AlertError } from "../../../components/errors";
import TransactionForm from "./transactionForm";
import { useHistory } from "react-router-dom";

const MutateTransaction = () => {
  const [value, setValue] = useState(0);
  const history = useHistory();
  const {
    loading: loadingCustomers,
    error: customersError,
    data: customersData,
  } = useQuery(USERS, {
    variables: { role: "CUSTOMER" },
    fetchPolicy: "network-only",
  });

  if (loadingCustomers) return <Loader />;
  if (customersError) return <AlertError />;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reorganizedCustomers = customersData?.users.map((customer) => {
    return {
      ...customer,
      name: `${customer.firstName} ${customer.lastName} (${customer.username})`,
    };
  });
  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="transactions tab">
        <Tab label="Deposit" />
        <Tab label="Withdrawal" />
      </Tabs>
      <div>
        {value === 0 && (
          <TransactionForm
            type="DEPOSIT"
            customers={reorganizedCustomers}
            history={history}
          />
        )}
        {value === 1 && (
          <TransactionForm
            type="WITHDRAW"
            customers={reorganizedCustomers}
            history={history}
          />
        )}
      </div>
    </div>
  );
};

export default MutateTransaction;
