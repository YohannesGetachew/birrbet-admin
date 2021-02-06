import { gql } from "@apollo/client";

export const TICKETS = gql`
  query GetTickets(
    $date: String
    $isPlaced: Boolean
    $isExpired: Boolean
    $userID: String
    $status: String
    $placerType: String
    $latest: Boolean
  ) {
    tickets(
      date: $date
      isPlaced: $isPlaced
      isExpired: $isExpired
      userID: $userID
      status: $status
      latest: $latest
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
      placedDate
      userID
      shopID
      paidDate
      resolvedDate
      payer {
        _id
        firstName
        lastName
      }
      user {
        _id
        firstName
        lastName
        belongsToShop
      }
      shop {
        _id
        branchName
      }
      bets {
        _id
        fixtureId
        fixtureName
        type
        value
        oddValue
        status
        betId
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

export const DUPLICATE_TICKET = gql`
  mutation DuplicateTicket($stake: Float!, $id: String!) {
    duplicateTicket(stake: $stake, id: $id) {
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
      placedDate
      userID
      shopID
      paidDate
      resolvedDate
      payer {
        _id
        firstName
        lastName
      }
      user {
        _id
        firstName
        lastName
        belongsToShop
      }
      shop {
        _id
        branchName
      }
      bets {
        _id
        fixtureId
        fixtureName
        type
        value
        oddValue
        status
        betId
      }
      isExpired
    }
  }
`;
