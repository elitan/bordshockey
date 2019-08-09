import gql from 'graphql-tag';

export const S_GET_TABLEZ = gql`
subscription {
  tablez (order_by: { points: desc}) {
    id
    name
    points
    matches_played
  }
}
`;

export const S_GET_MATCHES = gql`
subscription {
  matches: matches_with_points (order_by: {created_at: desc}) {
    home_team_id
    home_team_name
    home_team_score
    home_team_points
    away_team_id
    away_team_name
    away_team_score
    away_team_points
  }
}
`;
