/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-26 20:07:02
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import DataTables from "material-ui-datatables";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import OnlineIcon from "react-material-icons/icons/action/swap-horiz";
import OffIcon from "react-material-icons/icons/notification/sync-disabled";
import ActiveActionIcon from "react-material-icons/icons/action/history";
import ReloadIcon from "react-material-icons/icons/action/cached";
import CircularProgress from "material-ui/CircularProgress";
import MoreIcon from "react-material-icons/icons/navigation/more-vert";
import s from "./BotsView.css";
import gql from "graphql-tag";
import Blockies from "react-blockies";
import RaisedButton from "material-ui/RaisedButton";
import * as runtimeActions from "../../actions/runtime";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

const botsQuery = gql`
  query BotsQuery($clientId: String!) {
    bots(clientId: $clientId) {
      id
      name
      host
    }
  }
`;

const tableColumns = [
  {
    key: "name",
    label: "Name",
    style: {
      width: 160
    }
  },
  {
    key: "host",
    label: "Host",
    style: {
      width: 40
    }
  }
];

class BotsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDrawer: false, selectedConversation: null };
  }

  selectBot = index => {
    const selected = this.props.data.bots[index];
    this.props.actions.setRuntimeVariable({
      name: 'selectedApp',
      value: selected
    });
    window.location.replace("/"+selected.id+"/conversations"); 
  };

  render() {
    const { bots, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {bots && bots.length ? (
            <DataTables
              height={"auto"}
              selectable={false}
              showRowHover={true}
              columns={tableColumns}
              data={bots}
              showCheckboxes={false}
              onCellClick={this.selectBot}
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
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(runtimeActions, dispatch)
  };
}

export default withStyles(s)(
  compose(
    graphql(botsQuery, {
      options: props => ({
        variables: { clientId: props.clientId }
      })
    })
  )(connect(selectProps, mapDispatchToProps)(BotsView))
);
