import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Conversations extends React.Component {
  render() {
    return (
      <a href="/conversation"><img src="/mocks/conversations.png"></img></a>
    );
  }
}

export default compose()(Conversations);
