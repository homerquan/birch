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
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { deepPurple500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import s from './Activities.css';
import fakeData from './fakeData.json';
import Link from '../Link/Link';
import MessageListItem from './MessageListItem';
import NotificationListItem from './NotificationListItem';
import Loader from '../Loader/Loader';
import ActivitiesContentLoader from './ActivitiesContentLoader';

// Styles
// TODO: Need to explore ways to include
// material-ui styles in external css files.
const viewAllLink = {
  color: deepPurple500,
  textDecoration: 'none',
  display: 'block',
  marginTop: '5px',
  fontSize: '14px',
  textAlign: 'right',
};

class Activities extends React.Component {
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
      <MuiThemeProvider>
        <Paper zDepth={2} className={s.paper}>
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
           <Link to="#" style={viewAllLink}>View All Activities</Link>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Activities);
