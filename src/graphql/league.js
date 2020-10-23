import gql from "@apollo/client";

export const LEAGUES = gql`
  {
    leagues {
      _id
      id
      name
      order
      country
      isAvailable
    }
  }
`;

export const UPDATE_LEAGUE = gql`
  mutation UpdateLeague($id: String!, $updateInput: LeagueDTO!) {
    updateLeague(id: $id, updateInput: $updateInput) {
      _id
      id
      name
      order
      country
      isAvailable
    }
  }
`;
