import React from 'react';
import BaseComponent from '../BaseComponent';
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
import Loader from './Loader';
import s from './style.css';

const appsListQuery = gql`
query Apps($userId: String) {
  appConnection(first:10,filter:{_owner:$userId}) {
     count
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          name
          token
          updatedAt
          _owner
        }
      }
  } 
}
`;

class AppsList extends BaseComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data: { appConnection, loading } } = this.props;

    if (!appConnection) {
      return <Loader />;
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
              {this.transformConnectionNode(appConnection.edges).map((item, index, array) => (
                <div key={item.id}>
                  <ListItem
                    leftAvatar={<Avatar icon={<CodeIcon />} />}
                    primaryText={<PrimaryText text={item.name} number={item._id} />}
                    secondaryText={item.host}
                  />
                  { (array.length - 1) !== index ? <Divider /> : '' }
                </div>
                ),
              )}
            </List>
          </RCardBody>
          <RCardFooter>
            <ArrowForward color={black} />
            <a className="link-text" href="/apps">View all applications</a>
          </RCardFooter>
        </RCard>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(
    graphql(appsListQuery, {
      options: props => ({
        variables: { userId: props.userId },
      }),
    }),
  )(AppsList),
);
