/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 16:14:03
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ThemeProvider } from '@material-ui/styles';
import { FiRefreshCcw as ReloadIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import BaseComponent from '../BaseComponent';
import theme from '../theme';
import config from '../../config';
import SessionsTable from '../SessionsTable';
import SessionMonitor from '../SessionMonitor';
import s from './style.css';
import { sessionsQuery, updateConversationPinToTop } from './graphql';


class SessionsView extends BaseComponent {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
      selectedSessionId: null,
    };

    this.addPinned = this.addPinned.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  closeDrawer() {
    this.setState({ drawerIsOpen: false });
  }

  openDrawer(sid) {
    this.setState({
      drawerIsOpen: true,
      selectedSessionId: sid,
    });
  }

  addPinned(e) {
    const conversationId = e.target.name;
    this.props.mutate({ variables: { conversationId, pinToTop: true } })
      .then(() => this.props.data.refetch());
  }

  render() {
    const { sessionConnection, loading, refetch } = this.props.data;

    if (loading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Toolbar>    
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
          </Toolbar>

          {sessionConnection.edges && sessionConnection.edges.length
            ? (
              <div>
                <SessionsTable
                  items={this.transformConnectionNode(sessionConnection.edges)}
                  openDrawer={this.openDrawer}
                  addPinned={this.addPinned}
                />
              </div>
            ) : (
              <div>
                <div className={s.nothing}>
                  <div className={s.fun}>
                    <img src="/images/nothing.png" alt="No Conversations" />
                  </div>
                </div>
              </div>
            )
          }

          {this.state.drawerIsOpen &&
            <SessionMonitor
              sessionId={this.state.selectedSessionId}
              userId={this.props.userId}
              appId={this.props.appId}
              isOpen={this.state.drawerIsOpen}
              closeDrawer={this.closeDrawer}
            />
          }

        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(
    graphql(updateConversationPinToTop),
    graphql(sessionsQuery, {
      options: props => ({
        variables: { userId: props.userId, appId: props.appId },
        pollInterval: config.pollInterval,
      }),
    }),
  )(SessionsView),
);
