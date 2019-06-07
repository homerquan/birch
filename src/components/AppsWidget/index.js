import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FiArrowRight as ArrowForward, FiMoreVertical as MoreVert, FiGrid as AppsIcon, FiPackage as AppIcon } from 'react-icons/fi';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../share/RCard';
import ListItemLink from '../share/ListItemLink';
import PrimaryText from './PrimaryText';
import theme from '../theme';
import Loader from './Loader';
import styles from './styles.css';

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
              <AppsIcon className="title-icon" />
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
                <div key={item._id}>
                  <ListItemLink href={`/app/${item._id}/sessions`} button>
                    <ListItemIcon>
                      <AppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<PrimaryText text={item.name} number={item._id} />}
                      secondary={item.hostname}
                    />
                  </ListItemLink>
                  { (array.length - 1) !== index ? <Divider /> : '' }
                </div>
                ),
              )}
            </List>
          </RCardBody>
          <RCardFooter>
            <ArrowForward />
            <a className="link-text" href="/apps">View all applications</a>
          </RCardFooter>
        </RCard>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(
  compose(
    graphql(appsListQuery, {
      options: props => ({
        variables: { userId: props.userId },
      }),
    }),
  )(AppsList),
);
