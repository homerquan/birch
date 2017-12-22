/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-22 00:16:29
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
import OnlineIcon from "react-material-icons/icons/notification/sync";
import OffIcon from "react-material-icons/icons/notification/sync-disabled";
import ActiveActionIcon from "react-material-icons/icons/action/history";
import CircularProgress from "material-ui/CircularProgress";
import MoreIcon from "react-material-icons/icons/navigation/more-vert";
import s from "./ConversationsTable.css";
import gql from "graphql-tag";
import Blockies from "react-blockies";

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

const TABLE_COLUMNS = [
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
          <Avatar size={32}>K</Avatar>Preparing Answer <img src="/images/loader.gif" />
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
       <IconButton tooltip="Close" onTouchTap={this.handleCloseButtonTouchTap}>
          <MoreIcon />
        </IconButton>
      </div>
    )
  }
];

function Grids({ data: { conversations, refetch } }) {
  if (conversations && conversations.length) {
    return (
      <div>
        <button onClick={() => refetch()}>Refresh</button>
        <DataTables
          height={"auto"}
          selectable={false}
          showRowHover={true}
          columns={TABLE_COLUMNS}
          data={conversations}
          showCheckboxes={false}
          page={1}
          count={100}
          onCellClick={this.openDrawer}
        />
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <div>Enjoy peace</div>
    </div>
  );
}

const GridsWithData = graphql(conversationsQuery)(Grids);

class ConversationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDrawer: false };
  }

  closeDrawer = () => {
    this.setState({
      openDrawer: false
    });
  };

  openDrawer = () => {
    this.setState({
      openDrawer: true
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <GridsWithData />
          <ConversationDrawer
            open={this.state.openDrawer}
            onClose={this.closeDrawer}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(ConversationsTable);
