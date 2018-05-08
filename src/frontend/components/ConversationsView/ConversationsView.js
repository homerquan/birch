/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 08:26:05
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../theme';
import Paper from 'material-ui/Paper';
import DataTables from 'material-ui-datatables';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ConversationDrawer from '../ConversationDrawer';
import IconButton from 'material-ui/IconButton';
import OnlineIcon from 'react-material-icons/icons/action/swap-horiz';
import OffIcon from 'react-material-icons/icons/notification/sync-disabled';
import ActiveActionIcon from 'react-material-icons/icons/action/history';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import CircularProgress from 'material-ui/CircularProgress';
import MoreIcon from 'react-material-icons/icons/navigation/more-vert';
import s from './ConversationsView.css';
import gql from 'graphql-tag';
import Blockies from 'react-blockies';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import config from '../../config';

const styles = {
  chip: {
    margin: 2,
    display: "inline-block"
  }
};

const conversationsQuery = gql`
  query ConversationsQuery($clientId : String, $botId: String){
    ConversationsFeed(clientId : $clientId, botId: $botId) {
      conversations(first:1){
        edges {
          cursor
          node{
            id
            visitor
            client
            intentions {
              name
              score
            }
            actions {
              source
              name
              status
            }
            mode
            updatedAt
          }
        }
        pageInfo{
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const subscriptionConversationQuery = gql`
  subscription onUpdateConversation($clientId:String) {
    updateConversation(clientId:$clientId) {
      id
      status
    } 
  }
`;

const tableColumns = [
  {
    key: "id",
    style: {
      width: 10
    },
    render: (id, all) => (
      <div>
        <Blockies
          seed={id}
          size={10}
          scale={3}
          color="#c4c4c4"
          bgColor="#fafafa"
          spotColor="#666666"
        />
      </div>
    )
  },
  {
    key: "id",
    label: "Visitor",
    style: {
      width: 160
    },
    render: (id, all) => (
      <div>
        <div className={s.visitorName}>Anomynous</div>
        <div className={s.visitorId}>{id}</div>
      </div>
    )
  },
  {
    key: "status",
    label: "Status",
    style: {
      width: 40
    },
    render: (id, all) => <OnlineIcon />
  },
  {
    key: "intentions",
    label: "Intentions",
    render: (intentions, all) => (
      <div> 
        {intentions && intentions.length ? (
          intentions.map((intention) =>
            <Chip style={styles.chip}>{intention.name}</Chip>
          )
        ) : (
          <span>waiting data</span>
        )}  
      </div>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: (actions, all) => (
      <div>
       {actions && actions.length ? (
          actions.map((action) =>
            <Chip style={styles.chip}>
              <Avatar size={32}>{action.source.charAt(0)}</Avatar> {action.name} { action.status === 'in-progress' && <img src="/images/loader.gif" /> }
            </Chip>
          )
        ) : (
          <span>waiting actions</span>
        )}  
      </div>
    )
  },
  {
    key: "id",
    style: {
      width: 30
    },
    render: (id, all) => (
      <div>
        <IconButton tooltip="More">
          <MoreIcon />
        </IconButton>
      </div>
    )
  }
];

class ConversationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDrawer: false, selectedConversation: null };
  }

  closeDrawer = () => {
    this.setState({
      openDrawer: false
    });
  };

  openDrawer = index => {
    const selected = this.props.data.conversations[index];
    this.setState({
      openDrawer: true,
      selectedConversation: selected
    });
  };

  render() {
    const { ConversationsFeed, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {ConversationsFeed.conversations.edges && ConversationsFeed.conversations.edges.length ? (
            <DataTables
              height={"auto"}
              selectable={false}
              showRowHover={true}
              columns={tableColumns}
              data={ConversationsFeed.conversations.edges}
              showCheckboxes={false}
              onCellClick={this.openDrawer}
              page={1}
              count={100}
            />
          ) : (
            <div>
              <div className={s.nothing}>
                <div className={s.fun}>
                  <img src="/images/nothing.png" />
                </div>
              </div>
            </div>
          )}
          <ConversationDrawer
            conversation={this.state.selectedConversation}
            clientId={this.props.clientId}
            open={this.state.openDrawer}
            onClose={this.closeDrawer}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(
    graphql(conversationsQuery, {
      options: props => ({
        variables: { clientId: props.clientId, botId: props.botId },
        pollInterval: config.pollInterval
      })
    })
  )(ConversationsTable)
);
