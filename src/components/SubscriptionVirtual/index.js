import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import { addGlobalNotification } from '../../actions/globalNotification';
import { globalNotificationSubscribe } from './graphql';

// This is a virtual componoent without render.
// A centralized bridge to receive graphql subscriptions from the server and sync into redux states
class SubscriptionVirtual extends React.Component {

  static propTypes = {
    addGlobalNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const that = this;
    this.subscription = this.props.client.subscribe({
      query: globalNotificationSubscribe,
      variables: {},
    }).subscribe({
      next(data) {
       that.props.addGlobalNotification(data.globalNotificationChange);
      },
      error(err) {
        console.error('err', err);
      },
    });
  }

  render() {
    return null;
  }
}

const selectProps = state => ({
  session: state.session,
  runtime: state.runtime,
  notifications: state.notifications,
  globalNotification: state.globalNotification,
});

const mapDispatchToProps = dispatch => ({
  addGlobalNotification: bindActionCreators(addGlobalNotification, dispatch),
});

export default withApollo(connect(selectProps, mapDispatchToProps)(SubscriptionVirtual));
