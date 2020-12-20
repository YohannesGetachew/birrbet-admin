import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      accessToken
      tokenType
      expiresIn
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    whoami {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      isLocked
      role
      accountBalance
      profileImage
    }
  }
`;

export const IS_USER_EXISTS = gql`
  query IsUserExists($phoneNumber: String!) {
    isUserExists(phoneNumber: $phoneNumber) {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      accountBalance
      profileImage
      createdAt
    }
  }
`;

export const USERS = gql`
  query GetUsers(
    $firstName: String
    $lastName: String
    $username: String
    $role: Role
  ) {
    users(
      firstName: $firstName
      lastName: $lastName
      username: $username
      role: $role
    ) {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      accountBalance
      profileImage
      createdAt
      belongsToShop
      cashierPermissions
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      accountBalance
      profileImage
      createdAt
      belongsToShop
      cashierPermissions
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $updateInput: UserUpdateDTO!) {
    updateUser(id: $id, updateInput: $updateInput) {
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      accountBalance
      profileImage
      createdAt
      belongsToShop
      cashierPermissions
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserDto!) {
    register(userInput: $userInput) {
      success
      message
    }
  }
`;

export const CHANGE_USER_ACTIVE = gql`
  mutation ChangeUserActive($id: String!) {
    changeUserActive(id: $id)
  }
`;
