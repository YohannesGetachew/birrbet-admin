import { gql } from "@apollo/client";

export const MARKETS = gql`
  {
    markets {
      _id
      name
      isAvailable
    }
  }
`;

export const UPDATE_MARKETS = gql`
  mutation UpdateMarket($id: String!, $updateInput: MarketDTO!) {
    updateMarket(id: $id, updateInput: $updateInput) {
      _id
      name
      isAvailable
    }
  }
`;
