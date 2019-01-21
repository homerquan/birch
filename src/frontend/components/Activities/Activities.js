/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied
 * and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   Michael
 * @Last Modified time: 2017-04-18 17:55:06
 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { black } from 'material-ui/styles/colors';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-active';
import IconButton from 'material-ui/IconButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import lightTheme from '../theme';
import s from './Activities.css';
import fakeData from './fakeData.json';
import MessageListItem from '../MessageListItem/MessageListItem';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import ActivitiesContentLoader from './ActivitiesContentLoader';

class Activities extends Component {
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
      return <ActivitiesContentLoader />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <RCard>
          <RCardHeader>
            <div className="title-container">
              <NotificationsIcon color={black} />
              <h2>Activities</h2>
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
