/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-19 00:20:14
*/

import React from "react";
import { graphql, compose, withApollo} from "react-apollo";
import Paper from "material-ui/Paper";
import { connect } from 'react-redux';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'react-material-icons/icons/content/clear';
import s from "./ConversationDrawer.css";
import gql from "graphql-tag";

class ConversationDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  render() {
    return (
      <Drawer width={600} openSecondary={true} open={this.state.open} >
           <div>
           <IconButton tooltip="Add a app">
                  <CloseIcon/>
            </IconButton>
           </div> 
      </Drawer>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session
  };
}

export default  withStyles(s)(withApollo(connect(selectProps, null)(ConversationDrawer)));
