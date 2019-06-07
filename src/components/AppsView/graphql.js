/*
* @Author: homer
* @Date:   2019-05-26 15:33:39
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 19:28:06
*/
import gql from 'graphql-tag';

//TODO: using server side pagniation later
export const appsQuery = gql`
query Apps($userId: String) {
  appConnection(first:500,filter:{_owner:$userId}) {
     count
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          name
          hostname
          token
          updatedAt
          _owner
        }
      }
  } 
}
`;