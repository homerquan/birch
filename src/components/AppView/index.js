/*
*  @Author: homer
* @Date:   2019-05-28 19:28:23
* @Last Modified by:   homer
* @Last Modified time: 2019-05-28 20:30:15
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as runtimeActions from '../../actions/runtime';
import BaseComponent from '../BaseComponent';
import { appQuery } from './graphql';

const styles = {
  noDisplay: {
    display: 'none',
  },
};

class AppView extends BaseComponent {

  render() {
  	const { appById } = this.props.data;

    this.props.actions.setRuntimeVariable({
      name: 'selectedApp',
      value: appById,
    });

  	return (<div style={styles.noDisplay} />);
  }

}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(runtimeActions, dispatch),
});

export default
  compose(
    graphql(appQuery, {
      options: props => ({
        variables: { id: props.appId },
      }),
    }),
  )(connect(null, mapDispatchToProps)(AppView));
