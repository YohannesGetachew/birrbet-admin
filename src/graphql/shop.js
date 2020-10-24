import { gql } from "@apollo/client";

export const SHOPS = gql`
  {
    shops {
      _id
      branchName
      isActive
      admin {
        _id
        firstName
        lastName
        username
      }
      contacts {
        type
        value
      }
      location {
        lat
        lon
      }
    }
  }
`;

export const CREATE_SHOP = gql`
  mutation CreateShop($shopInput: ShopDto!) {
    createShop(shopInput: $shopInput) {
      _id
      branchName
      isActive
      admin {
        _id
        firstName
        lastName
        username
      }
      contacts {
        type
        value
      }
      location {
        lat
        lon
      }
    }
  }
`;

export const UPDATE_SHOP = gql`
  mutation UpdateShop($shopInput: UpdateShopDTO!, $id: String!) {
    updateShop(shopInput: $shopInput, id: $id) {
      _id
      branchName
      isActive
      admin {
        _id
        firstName
        lastName
        username
      }
      contacts {
        type
        value
      }
      location {
        lat
        lon
      }
    }
  }
`;

export const GET_SHOP = gql`
  query getShop($id: String!) {
    shop(id: $id) {
      _id
      branchName
      isActive
      admin {
        _id
        firstName
        lastName
        username
      }
      contacts {
        type
        value
      }
      location {
        lat
        lon
      }
    }
  }
`;
