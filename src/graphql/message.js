import { gql } from "@apollo/client";

export const MESSAGES = gql`
  {
    messages {
      _id
      messageHead
      messageBody
      isRead
      customerId
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: String!) {
    updateMessage(id: $id) {
      _id
      messageHead
      messageBody
      isRead
      customerId
    }
  }
`;
