/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied
 * and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-22 23:10:51
 */
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { deepPurple500, black } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import s from './ConversationDetailsActivity.css';
import fakeData from './fakeData.json';
import MessageListItem from '../MessageListItem';
import NotificationListItem from '../NotificationListItem';
import ConversationDetailsLoader from './ConversationDetailsLoader';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';

const linkStyle = {
  color: deepPurple500,
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: '400',
};

class ConversationDetailsActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: fakeData.data,
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <ConversationDetailsLoader />;
    }

    return (
      <RCard>
        <RCardHeader>
          <div className="title-container">
            <AppsIcon color={black} />
            <h2>Recent Activities</h2>
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
          <List style={{ padding: 0 }}>
            {this.state.data.map((application, index, array) => (
              <div key={application.id}>
                {application.type === 'message'
                  ? <MessageListItem
                    application={application.application}
                    text={application.text}
                    time={application.time}
                  />
                  : <NotificationListItem
                    application={application.application}
                    text={application.text}
                    time={application.time}
                    link={application.link}
                  />
                }
                { array.length === (index + 1) ? '' : <Divider /> }
              </div>
              ),
            )}
          </List>
        </RCardBody>
        <RCardFooter>
          <FlatButton
            label="View all Conversations"
            labelStyle={linkStyle}
            fullWidth
          />
        </RCardFooter>
      </RCard>
    );
  }
}

export default withStyles(s)(ConversationDetailsActivity);
