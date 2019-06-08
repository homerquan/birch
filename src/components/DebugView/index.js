/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 04:03:43
*/

import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import gql from 'graphql-tag';
import s from './style.css';

const testSubscription = gql`
  subscription {
    test
  }
`;

class DebugView extends React.Component {
  state = {
    test: '',
  };

  async componentDidMount() {
    const that = this;
    this.subscription = this.props.client.subscribe({
      query: testSubscription,
      variables: {},
    }).subscribe({
      next(data) {
        that.setState({ test: data.test });
        console.log(data);
      },
      error(err) {
        console.error('err', err);
      },
    });
  }

  async componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div>
        <h2>Test GraphQL subscription</h2>
        <div>{this.state.test}</div>
      </div>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(withApollo(connect(selectProps, null)(DebugView)));
