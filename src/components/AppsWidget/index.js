import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { black, deepPurple500 } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { FiPlay as ArrowForward, FiMoreVertical as MoreVert, FiList as AppsIcon, FiCode as CodeIcon } from 'react-icons/fi';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import PrimaryText from './PrimaryText';
import theme from '../theme';
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
      <ThemeProvider theme={theme}>
        <RCard>
          <RCardHeader>
            <div className="title-container">
              <AppsIcon color={black} />
              <h2>Applications</h2>
            </div>
            <div className="button-container">
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
              </Menu>
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
      </ThemeProvider>
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
