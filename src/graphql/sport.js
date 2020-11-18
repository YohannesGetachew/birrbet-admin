import { gql } from "@apollo/client";

export const SPORTS = gql`
  query {
    sports {
      _id
      id
      name
      isAvailable
      order
    }
  }
`;

export const UPDATE_SPORT = gql`
  mutation UpdateSport($id: String!, $updateInput: SportDTO!) {
    updateSport(id: $id, updateInput: $updateInput) {
      _id
      id
      name
      isAvailable
      order
    }
  }
`;
