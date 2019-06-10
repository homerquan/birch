/*
 * @Author: homer
 * @Date:   2019-05-24 13:43:49
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-24 15:16:19
 */

import gql from 'graphql-tag';

// TODO: using server side pagniation later
export const globalNotificationSubscribe = gql`
  subscription {
    globalNotificationChange {
      id
      type
      text
      link
    }
  }
`;
