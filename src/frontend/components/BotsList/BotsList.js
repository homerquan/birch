import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { black, deepPurple500 } from 'material-ui/styles/colors';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { List, ListItem } from 'material-ui/List';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import CodeIcon from 'material-ui/svg-icons/action/code';

import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import PrimaryText from './PrimaryText';
import lightTheme from '../theme';
import s from './BotsList.css';
import BotsListLoader from './BotsListLoader';

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

class BotListTwo extends React.Component {
  static propTypes = {
    data: PropTypes.isRequired,
  };

  constructor(props) {
    super(props);

    console.log('BotsList Props: ', this.props);
  }

  transform = data => (_.map(data, 'node'));

  render() {
    const { data: { botsFeed } } = this.props;

    if (!botsFeed) {
      return <BotsListLoader />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <RCard>
          <RCardHeader>
            <div className="title-container">
              <AppsIcon color={black} />
              <h2>Applications</h2>
            </div>
            <div className="button-container">
              <IconMenu
                iconButtonElement={<IconButton><MoreVert /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
              </IconMenu>
            </div>
          </RCardHeader>
          <RCardBody>
            <List style={{ padding: 0 }}>
              {this.transform(botsFeed.bots.edges).map((application, index, array) => (
                <div key={application.id}>
                  <ListItem
                    leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                    primaryText={<PrimaryText text={application.name} number={application.token} />}
                    secondaryText={application.host}
                  />
                  { (array.length - 1) !== index ? <Divider /> : '' }
                </div>
                ),
              )}
            </List>
          </RCardBody>
          <RCardFooter>
            <ArrowForward color={black} />
            <p className="link-text">View all applications</p>
          </RCardFooter>
        </RCard>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(
    graphql(botsQuery, {
      options: props => ({
        variables: { clientId: props.clientId },
      }),
    }),
  )(BotListTwo),
);
