/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-22 23:16:34
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import DataTables from "material-ui-datatables";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ConversationDrawer from "../ConversationDrawer";
import IconButton from "material-ui/IconButton";
import OnlineIcon from "react-material-icons/icons/action/swap-horiz";
import OffIcon from "react-material-icons/icons/notification/sync-disabled";
import ActiveActionIcon from "react-material-icons/icons/action/history";
import CircularProgress from "material-ui/CircularProgress";
import MoreIcon from "react-material-icons/icons/navigation/more-vert";
import s from "./ConversationsTable.css";
import gql from "graphql-tag";
import Blockies from "react-blockies";

import RaisedButton from "material-ui/RaisedButton";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

const styles = {
  chip: {
    margin: 2,
    display: "inline-block"
  }
};

const conversationsQuery = gql`
  query {
    conversations {
      id
      visitor
      client
      mode
      updatedAt
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
    key: "intention",
    label: "Intention",
    render: (intention, all) => (
      <div>
        <Chip style={styles.chip}>view product</Chip>
        <Chip style={styles.chip}>buy product</Chip>
      </div>
    )
  },
  {
    key: "action",
    label: "Action",
    render: (action, all) => (
      <div>
        <Chip style={styles.chip}>
          <Avatar size={32}>L</Avatar>Thinking <img src="/images/loader.gif" />
        </Chip>
        <Chip style={styles.chip}>
          <Avatar size={32}>K</Avatar>Preparing Answer{" "}
          <img src="/images/loader.gif" />
        </Chip>
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
    const { conversations, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <RaisedButton label="Reload" onTouchTap={() => refetch()} />
            </ToolbarGroup>
          </Toolbar>

          {conversations && conversations.length ? (
            <DataTables
              height={"auto"}
              selectable={false}
              showRowHover={true}
              columns={tableColumns}
              data={conversations}
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
            open={this.state.openDrawer}
            onClose={this.closeDrawer}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(graphql(conversationsQuery))(ConversationsTable)
);
