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
import { deepPurple500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

import lightTheme from '../theme';
import s from './Activities.css';
import fakeData from './fakeData.json';
import MessageListItem from '../MessageListItem/MessageListItem';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import ActivitiesContentLoader from './ActivitiesContentLoader';

const linkStyle = {
  color: deepPurple500,
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: '400',
};

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
        <Paper zDepth={2} className={s.paper}>
          <Subheader>Recent Activities</Subheader>
          <List style={{ padding: 0 }}>
            {this.state.data.map(application => (
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
                <Divider />
              </div>
              ),
            )}
          </List>
          <div className={s.footerContainer}>
            <FlatButton
              label="View all Activities"
              labelStyle={linkStyle}
              href="#"
            />
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Activities);
