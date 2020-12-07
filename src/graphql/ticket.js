import { gql } from "@apollo/client";

export const TICKETS = gql`
  query GetTickets(
    $date: String
    $isPlaced: Boolean
    $isExpired: Boolean
    $userID: String
    $status: String
    $placerType: String
  ) {
    tickets(
      date: $date
      isPlaced: $isPlaced
      isExpired: $isExpired
      userID: $userID
      status: $status
      placerType: $placerType
    ) {
      _id
      createdAt
      updatedAt
      stake
      vatValue
      totalOdds
      ticketID
      isPlaced
      placementID
      status
      placerType
      userID
      shopID
      user {
        _id
        firstName
        lastName
      }
      shop {
        _id
      }
      bets {
        _id
        fixtureName
        type
        value
        oddValue
        status
      }
      isExpired
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($updateInput: UpdateTicketDTO!, $id: String!) {
    updateTicket(updateInput: $updateInput, id: $id) {
      _id
      createdAt
      updatedAt
      stake
    }
  }
`;

export const GET_BETS = gql`
  {
    bets {
      _id
    }
  }
`;
