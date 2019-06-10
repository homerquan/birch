
import gql from 'graphql-tag';

// TODO: using server side pagniation later
export const testSubscribe = gql`
  subscription {
    test
  }
`;
