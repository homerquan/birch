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
 * @Last Modified time: 2019-05-29 02:51:37
 */
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List } from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { black } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FiRadio as NotificationsIcon, FiArrowRight as ArrowForward } from 'react-icons/fi';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import lightTheme from '../theme';
import fakeData from './fakeData.json';
import MessageListItem from '../MessageListItem';
import NotificationListItem from '../NotificationListItem';
import ActivitiesContentLoader from './ActivitiesContentLoader';
import s from './style.css';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: fakeData.data,
    };
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <ActivitiesContentLoader />;
    }

    return (
      <MuiThemeProvider muiTheme={createMuiTheme(lightTheme)}>
        <RCard>
          <RCardHeader>
            <div className="title-container">
              <NotificationsIcon color={black} />
              <h2>Activities</h2>
            </div>
            <div className="button-container">
              <Menu>
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
                  { (array.length - 1) !== index ? <Divider /> : '' }
                </div>
                ),
              )}
            </List>
          </RCardBody>
          <RCardFooter>
            <ArrowForward color={black} />
            <p className="link-text">View all activities</p>
          </RCardFooter>
        </RCard>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Activities);
