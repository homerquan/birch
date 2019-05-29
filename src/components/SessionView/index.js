import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import Blockies from 'react-blockies';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { List, ListItem } from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { blue200, blue500, black } from '@material-ui/core/colors';
import { FiArrowRight as ArrowIcon, FiWatch as EventIcon, FiMoreVertical as MoreVert, FiList as AppsIcon } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import s from './style.css';

class SessionView extends Component {
  render() {
    const { conversation } = this.props;

    return (
      <RCard>
        <RCardHeader>
          <div className="title-container">
            <AppsIcon color={black} />
            <h2>Session</h2>
          </div>
          <div className="button-container">
            <Menu
              iconButtonElement={<IconButton><MoreVert /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
            </Menu>
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
              leftIcon={<ArrowIcon />}
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
            <ListSubheader className={s.agentsSubHeader}>Agents</ListSubheader>
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

SessionView.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default withStyles(s)(SessionView);