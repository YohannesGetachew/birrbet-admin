import { gql } from "@apollo/client";

export const FIXTURES = gql`
  query GetFixtures(
    $isAvailable: Boolean
    $leagueId: String
    $id: String
    $sportId: String
    $status: ScoreboardStatus
  ) {
    fixtures(
      isAvailable: $isAvailable
      leagueId: $leagueId
      id: $id
      sportId: $sportId
      status: $status
    ) {
      _id
      id
      leagueId
      status
      startDate
      sportId
      countryId
      participants {
        id
        name
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
