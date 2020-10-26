import { gql } from "@apollo/client";

export const APP = gql`
  {
    app {
      _id
      appName
      appLogo
      currentTime
      maxWin
      maxStake
      minStake
      withdrawalLimit
      bookmaker
      commissionRate
      vatRate
      advertisements {
        id
        name
        position
        imagePath
      }
      rules
    }
  }
`;

export const UPDATE_APP = gql`
  mutation UpdateApp($id: String!, $appInput: AppDto!) {
    updateApp(id: $id, appInput: $appInput) {
      _id
      appName
      appLogo
      currentTime
      maxWin
      maxStake
      minStake
      withdrawalLimit
      bookmaker
      commissionRate
      vatRate
      advertisements {
        id
        name
        position
        imagePath
      }
      rules
    }
  }
`;

export const UPDATE_ADVERTISEMENT = gql`
  mutation UpdateAdvertisement($id: String!, $adInput: AdvertisementDTO!) {
    updateAdvertisement(id: $id, adInput: $adInput) {
      _id
      appName
      appLogo
      currentTime
      maxWin
      maxStake
      minStake
      withdrawalLimit
      bookmaker
      commissionRate
      vatRate
      advertisements {
        id
        name
        position
        imagePath
      }
      rules
    }
  }
`;
