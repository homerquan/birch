/*
* @Author: homer
* @Date:   2019-05-24 17:53:36
* @Last Modified by:   homer
* @Last Modified time: 2019-05-28 14:48:58
*/

import gql from 'graphql-tag';

export const sessionQuery = gql`
  query session ($sessionId:MongoID!) {
    sessionById(_id:$sessionId) {
      status
      context
      actionConnection(last:10) {
        count
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            _id
            text
          }
        }
      }
    }
  }
`;

export const conversationQueryLoadMore = gql`
  query Conversation($conversationId: String, $after: String,){
    conversation(conversationId: $conversationId){
      id
      messages(after: $after) {
        edges {
          node {
            id
            text
            source
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const createMessage = gql`
  mutation CreateMessage($input: MessageInput) {
    createMessage(input: $input){
      error {
        code
        message
        detail
      }
      message {
        id
      }
    }
  }
`;