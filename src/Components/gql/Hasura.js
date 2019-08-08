import gql from 'graphql-tag';

export const S_GET_TABLEZ = gql`
subscription {
  tablez (order_by: { points: desc}) {
    name
    points
  }
}
`;
