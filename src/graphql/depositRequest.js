import { gql } from "@apollo/client";

export const GET_DEPOSIT_REQUESTS = gql`
  {
    depositRequests {
      _id
      evidence
      evidenceType
      confirmed
      denied
      requestId
      customer {
        _id
        firstName
        lastName
        username
      }
      transferSource
      transactionId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_DEPOSIT_REQUEST = gql`
  mutation CreateDepositRequest($depositRequestInput: DepositRequestDto!) {
    createDepositRequest(depositRequestInput: $depositRequestInput) {
      _id
      requestId
      evidence
      evidenceType
      confirmed
      customer {
        _id
        firstName
      }
      transferSource
      transactionId
      createdAt
      updatedAt
    }
  }
`;

export const CONFIRM_DEPOSIT_REQUEST = gql`
  mutation ConfirmDepositRequest(
    $updateDepositRequestInput: UpdateDepositRequestDto!
    $id: String!
  ) {
    confirmDepositRequest(
      updateDepositRequestInput: $updateDepositRequestInput
      id: $id
    ) {
      _id
      evidence
      evidenceType
      confirmed
      customer {
        _id
        firstName
      }
      transferSource
      transactionId
      createdAt
      updatedAt
    }
  }
`;

export const DENY_DEPOSIT_REQUEST = gql`
  mutation DenyDepostiRequest($id: String!) {
    denyDepositRequest(id: $id) {
      _id
      evidence
      evidenceType
      confirmed
      denied
      customer {
        _id
        firstName
      }
      transferSource
      transactionId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DEPOSIT_REQUEST = gql`
  mutation DeleteDepositRequest($id: String!) {
    deleteDepositRequest(id: $id)
  }
`;
