/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 04:03:43
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import * as globalNotificationActions from '../../actions/globalNotification';
import s from './style.css';

const testSubscription = gql`
  subscription {
    test
  }
`;

class DebugView extends React.Component {

  static propTypes = {
    runtime: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    client: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { test: '' };
    this.globalNotificationTestHandler = this.globalNotificationTestHandler.bind(this);
  }

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

  globalNotificationTestHandler(event) {
    event.preventDefault();
    const test = { id: 123, type: 'general', text: 'test message', link: '/' };
    this.props.actions.addGlobalNotification(test);
  }

  render() {
    return (
      <div>
        <h2>Test GraphQL subscription</h2>
        <div>{this.state.test}</div>
        <h2>General Functions</h2>
        <Button variant="contained" color="primary" onClick={this.globalNotificationTestHandler}>
          Test global notification
        </Button>
      </div>
    );
  }
}

const selectProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(globalNotificationActions, dispatch),
});

export default withStyles(s)(withApollo(connect(selectProps, mapDispatchToProps)(DebugView)));
