// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { graphql, compose } from 'react-apollo';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import s from './Notifications.css';

// const NotificationsFeed = gql`
//   query NotificationsFeed($clientId: String) {
//     notificationsFeed(clientId: $clientId){
//       notifications(first:1, filter:["status=unread"]){
//         totalCount
//         edges {
//           node {
//             id
//             text
//             status
//           }
//         }
//         pageInfo{
//         hasNextPage
//         endCursor
//         }
//       }
//     }
//   }
// `;

// class Notifications extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Notifications</h1>
//       </div>
//     );
//   }
// }

// Notifications.propTypes = {

// };


// export default withStyles(s)(
//   compose(
//     graphql(NotificationsFeed, {
//       options: props => ({
//         variables: { clientId: props.clientId },
//       }),
//     }),
//   )(Notifications),
// );


import React from 'react';

const Notifications = () => {
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

export default Notifications;