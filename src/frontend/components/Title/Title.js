import React from 'react';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Title extends React.Component {
  render() {
    return (
     <h2>{this.props.children}</h2>
    );
  }
}

export default compose()(Title);
