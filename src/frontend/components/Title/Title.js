import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


class Title extends React.Component {
  render() {
    return (
      <img src="/mocks/title.png"></img>
    );
  }
}

export default compose()(Title);
