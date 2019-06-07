/*
 * @Author: homer
 * @Date:   2019-05-24 13:43:49
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-24 15:16:19
 */

import gql from 'graphql-tag';

export const sessionsQuery = gql`
	query Sessions($userId: String, $appId: String) {
		sessionConnection(
			first: 10
			filter: { _owner: $userId, _app: $appId }
		) {
			count
			pageInfo {
				startCursor
				endCursor
			}
			edges {
				node {
					_id
					status
					updatedAt
					_app
					_owner
				}
			}
		}
	}
`;

export const updateConversationPinToTop = gql`
  mutation UpdateConversationPinToTop($conversationId: String!, $pinToTop: Boolean!)  {
    updateConversationPinToTop(conversationId:$conversationId, pinToTop: $pinToTop) {
      id
      pinToTop
    }
  }
`;

export const subscriptionConversationQuery = gql`
  subscription onUpdateConversation($clientId:String) {
    updateConversation(clientId:$clientId) {
      id
      status
    }
  }
`;
