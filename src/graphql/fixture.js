import { gql } from "@apollo/client";

export const FIXTURES = gql`
  query GetFixtures(
    $isAvailable: Boolean
    $league: Int
    $id: Int
    $status: FixtureStatus
  ) {
    fixtures(
      isAvailable: $isAvailable
      league: $league
      id: $id
      status: $status
    ) {
      _id
      id
      league
      status
      date
      isAvailable
      teams {
        home {
          name
        }
        away {
          name
        }
      }
    }
  }
`;

export const UPDATE_FIXUTRE = gql`
  mutation UpdateFixture($id: String!, $updateInput: FixtureDTO!) {
    updateFixture(id: $id, updateInput: $updateInput) {
      _id
      id
      league
      status
      date
      isAvailable
      teams {
        home {
          name
        }
        away {
          name
        }
      }
    }
  }
`;
