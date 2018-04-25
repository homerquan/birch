import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import Blockies from 'react-blockies';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import EventIcon from 'material-ui/svg-icons/notification/event-note';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { blue200, blue500 } from 'material-ui/styles/colors'

import s from './ConversationDetails.css';

class ConversationDetails extends Component {
  render() {
    const { conversation } = this.props;
    
    return (
      <MuiThemeProvider>
        <Paper>
          <div className={s.blockyWrapper}>
            <Blockies
              seed={conversation.id}
              size={10}
              scale={3}
              color={blue500}
              bgColor="#fafafa"
              spotColor={blue200}
            />
          </div>
          <List>
            <ListItem 
              leftIcon={<CompareArrows />}
              primaryText={
                <div>
                  <span>User Id</span>
                  <span className={s.tag}>{conversation.id}</span>
                </div>
              }
            />
            <ListItem 
              leftIcon={<EventIcon />}
              primaryText={
                <div>
                  <span className="title">First Seen</span>
                  <span className="content">{moment(conversation.createdAt).format('month')}</span>
                </div>
              }
            />
            <ListItem 
              leftIcon={<EventIcon />}
              primaryText={
                <div>
                  <span className="title">Last Seen</span>
                  <span className="content">{moment(conversation.updatedAt).format('month')}</span>
                </div>
              }
            />
          </List>

          <List>
            <Subheader className={s.agentsSubHeader}>Agents</Subheader>
            <ListItem
              primaryText="solver v 1.3"
              leftAvatar={<Avatar src="/images/avatar-helper.png" />}
            />
            <ListItem
              primaryText="Homer Quan"
              leftAvatar={<Avatar src="/images/avatar-helper.png" />}
            />
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(ConversationDetails);