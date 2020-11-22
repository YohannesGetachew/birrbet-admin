import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
  query GetTransactions(
    $customerUsername: String
    $cashierUsername: String
    $type: TransactionType
    $from: String
    $to: String
  ) {
    transactions(
      customerUsername: $customerUsername
      cashierUsername: $cashierUsername
      type: $type
      from: $from
      to: $to
    ) {
      _id
      type
      amount
      createdAt
      customer {
        _id
        firstName
        lastName
        username
        accountBalance
      }
      cashier {
        _id
        firstName
        lastName
        username
      }
    }
  }
`;

export const MAKE_TRANSACTION = gql`
  mutation MakeTransaction($transaction: TransactionDTO!) {
    makeTransaction(transaction: $transaction) {
      _id
      createdAt
      updatedAt
      type
      amount
      cashier {
        _id
      }
    }
  }
`;
