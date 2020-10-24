import { gql } from "@apollo/client";

export const COUNTRIES = gql`
  query {
    countries {
      _id
      name
      order
      isAvailable
    }
  }
`;

export const UPDATE_COUNTRY = gql`
  mutation UpdateCountry($id: String!, $updateInput: CountryDTO!) {
    updateCountry(id: $id, updateInput: $updateInput) {
      _id
      name
      order
      isAvailable
    }
  }
`;
