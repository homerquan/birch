import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import Blockies from 'react-blockies';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import EventIcon from 'material-ui/svg-icons/notification/event-note';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { blue200, blue500, black } from 'material-ui/styles/colors';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import s from './style.css';

class ConversationDetails extends Component {
  render() {
    const { conversation } = this.props;

    return (
      <RCard>
        <RCardHeader>
          <div className="title-container">
            <AppsIcon color={black} />
            <h2>Conversation</h2>
          </div>
          <div className="button-container">
            <IconMenu
              iconButtonElement={<IconButton><MoreVert /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
            </IconMenu>
          </div>
        </RCardHeader>
        <RCardBody>
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
        </RCardBody>
      </RCard>
    );
  }
}

ConversationDetails.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default withStyles(s)(ConversationDetails);