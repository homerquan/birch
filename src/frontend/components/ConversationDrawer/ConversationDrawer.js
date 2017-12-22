/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-21 21:47:35
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
  }

  handleCloseButtonTouchTap = () => {
    this.props.onClose();
  };
  
  render() {
    return (
      <Drawer containerClassName={s.drawer} width={window.innerWidth>650?600:'100%'} openSecondary={true} open={this.props.open} >
           <div>
           <IconButton tooltip="Close" onTouchTap={this.handleCloseButtonTouchTap}>
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
