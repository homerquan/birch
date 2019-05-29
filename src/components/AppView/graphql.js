/*
* @Author: homer
* @Date:   2019-05-28 19:29:22
* @Last Modified by:   homer
* @Last Modified time: 2019-05-28 19:42:06
*/

import gql from 'graphql-tag';

export const appQuery = gql`
query app ($id:MongoID!) {
  appById(_id:$id) {
    _id
    name
    hostname
  }
}
`;
