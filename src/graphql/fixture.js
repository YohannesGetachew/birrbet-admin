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
      odds {
        marketId
        market {
          id
          name
        }
        bets {
          id
          name
          startPrice
          price
        }
      }

      basicOdds {
        odds {
          marketId
          market {
            id
            name
          }
          bets {
            id
            name
            startPrice
            price
          }
        }
        more
      }
    }
  }
`;

export const FIXTURE = gql`
  query Fixture($id: String!) {
    fixture(id: $id) {
      _id
      startDate
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

export const LIVE_ODD = gql`
  subscription {
    liveOdd {
      fixtureId
      marketId
      bets {
        id
        name
        startPrice
        price
      }
    }
  }
`;

export const LIVE_SCORE = gql`
  subscription {
    liveScore {
      fixtureId
      score {
        Scoreboard {
          Results {
            Value
            Position
          }
        }
      }
    }
  }
`;

export const LIVE_FIXTURE = gql`
  subscription {
    liveFixture {
      league {
        name
      }
      country {
        name
      }
    }
  }
`;
