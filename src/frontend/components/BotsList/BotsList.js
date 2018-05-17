import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { deepPurple500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import lightTheme from '../theme';
import s from './BotsList.css';
import PrimaryText from './PrimaryText';
import BotsListLoader from './BotsListLoader';
import NewApp from '../NewApp/NewApp';

const botsQuery = gql`
  query BotsFeed($clientId: String!) {
    botsFeed(clientId: $clientId) {
      bots(first:1) {
        totalCount
        edges {
          cursor,
          node{
            id,
            name,
            host
            token
          }
        }
      }
    }
  }
`;

const linkStyle = {
  color: deepPurple500,
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: '400',
};

class BotsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newAppModalIsOpen: false,
    };

    this.closeNewAppModal = this.closeNewAppModal.bind(this);
  }

  closeNewAppModal() {
    this.setState({ newAppModalIsOpen: false });
  }

  transform = data => (_.map(data, 'node'));

  render() {
    const { loading, data: { botsFeed } } = this.props;
    const { newAppModalIsOpen } = this.state;

    if (!botsFeed || loading) {
      return <BotsListLoader />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <Paper zDepth={2} className={s.paper}>
          <Subheader>Applications</Subheader>
          <List style={{ padding: 0 }}>
            {this.transform(botsFeed.bots.edges).map(application => (
              <div key={application.id}>
                <ListItem
                  leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                  primaryText={<PrimaryText text={application.name} number={application.token} />}
                  secondaryText={application.host}
                ></ListItem>
                <Divider />
              </div>
              ),
            )}
          </List>

          <div className={s.footerContainer}>
            <FlatButton
              label="View all Applications"
              labelStyle={linkStyle}
              href="/apps"
            />
            <RaisedButton
              onClick={() => this.setState({ newAppModalIsOpen: true })}
              label="Create Application"
              primary
            />
          </div>
        </Paper>

        {newAppModalIsOpen &&
          <NewApp
            close={this.closeNewAppModal}
          />
        }
      </MuiThemeProvider>
    );
  }
}

BotsList.propTypes = {
  clientId: PropTypes.string.isRequired,  // eslint-disable-line
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    botsFeed: PropTypes.object,
  }).isRequired,
};

export default withStyles(s)(
  compose(
    graphql(botsQuery, {
      options: props => ({
        variables: { clientId: props.clientId },
      }),
    }),
  )(BotsList),
);
