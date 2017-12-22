/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-21 23:10:53
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import DataTables from "material-ui-datatables";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ConversationDrawer from "../ConversationDrawer";
import OnlineIcon from 'react-material-icons/icons/notification/sync';
import OffIcon from 'react-material-icons/icons/notification/sync-disabled';
import s from "./ConversationsTable.css";
import gql from "graphql-tag";
import Blockies from "react-blockies";

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
      width: 20,
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
      width: 40,
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
      width: 20,
    },
    render: (id, all) => (
      <OnlineIcon/>
    )
  },
  {
    key: "intention",
    label: "Intention",
    render: (id, all) => (
      <OnlineIcon/>
    )
  },
  {
    key: "action",
    label: "Action",
    style: {
      width: 100,
    },
    render: (id, all) => (
      <OnlineIcon/>
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
