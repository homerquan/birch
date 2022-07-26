/*
* @Author: Homer
* @Date:   2017-12-31 16:47:27
* @Last Modified by:   homer
* @Last Modified time: 2019-05-22 23:19:30
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import NewBotForm from './NewBotForm';
import s from './style.css';

const createBotQuery = gql`
  mutation createBotQuery($clientId: String!, $name: String!, $url: String!) {
    createBot(clientId: $clientId, name: $name, url: $url) {
      id
    }
  }
`;

class NewBotView extends React.Component {
  showResults = (values) => {
    const { mutate, clientId } = this.props;
    new Promise(resolve => {
      setTimeout(() => {
        // simulate server latency
        mutate({
          variables: {
            'clientId': clientId,
            'name': values.name,
            'url': values.url,
          },
          update: (store, { data: { createBot } }) => {
            window.location.replace("/apps"); 
          },
        });
        resolve();
      }, 500);
    });
  }

  render() {
    const { pristine, reset, submitting } = this.props;
    return <NewBotForm onSubmit={this.showResults.bind(this)} />;
  }
}

export default compose(
  reduxForm({
    form: 'NewBot',
  }),
  withStyles(s),
  graphql(createBotQuery, {
    options: (props, state) => ({
      variables: {}
    })
  })
)(NewBotView);
