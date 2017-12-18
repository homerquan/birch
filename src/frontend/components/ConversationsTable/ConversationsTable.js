/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-18 00:23:32
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import DataTables from 'material-ui-datatables';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ConversationDrawer from "../ConversationDrawer";
import s from "./ConversationsTable.css";
import gql from 'graphql-tag';

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  }
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24'
  }
];

class ConversationsTable extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
      <div>
      <DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={TABLE_DATA}
        showCheckboxes={false}
        page={1}
        count={100}
      />
      <ConversationDrawer/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(ConversationsTable);