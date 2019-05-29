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
 * @Last Modified time: 2019-05-29 03:23:50
 */
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List } from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { deepPurple500, black } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FiList as AppsIcon, FiMoreVertical as MoreVert } from 'react-icons/fi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import fakeData from './fakeData.json';
import MessageListItem from '../MessageListItem';
import NotificationListItem from '../NotificationListItem';
import Loader from './Loader';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import s from './style.css';

const linkStyle = {
  color: deepPurple500,
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: '400',
};

class SessionActivitiesView extends Component {
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
      return <Loader />;
    }

    return (
      <RCard>
        <RCardHeader>
          <div className="title-container">
            <AppsIcon color={black} />
            <h2>Recent Activities</h2>
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
          <Button
            label="View all Conversations"
            labelStyle={linkStyle}
            fullWidth
          />
        </RCardFooter>
      </RCard>
    );
  }
}

export default withStyles(s)(SessionActivitiesView);
