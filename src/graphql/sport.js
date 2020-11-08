import { gql } from "@apollo/client";

export const SPORTS = gql`
  query {
    sports {
      _id
      id
      name
      isAvailable
    }
  }
`;

export const UPDATE_SPORT = gql`
  mutation UpdateSport($id: String!, $updateInput: AvailabilityDTO!) {
    updateSport(id: $id, updateInput: $updateInput) {
      _id
      name
      isAvailable
    }
  }
`;
