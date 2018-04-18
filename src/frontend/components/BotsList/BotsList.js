import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { deepPurple500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import s from './BotsList.css';
import PrimaryText from './PrimaryText';
import Link from '../Link/Link';
import Loader from '../Loader/Loader';
import fakeData from './fakeData.json';

// Styles
// TODO: Need to explore ways to include
// material-ui styles in external css files.
const footerLinkStyle = {
  color: deepPurple500,
  textDecoration: 'none',
};

class BotsList extends Component {
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
      <MuiThemeProvider>
        <Paper zDepth={2} className={s.paper}>
          <List style={{ padding: 0 }}>
            {this.state.data.map(application => (
              <div>
                <ListItem
                  leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                  primaryText={<PrimaryText text={application.title} number={application.number} />}
                  secondaryText={application.link}
                />
                <Divider />
              </div>
              ),
            )}
          </List>

          <div className={s.footerContainer}>
            <Link to="#" style={footerLinkStyle}>View all Applications</Link>
            <RaisedButton label="Create Application" />
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(BotsList);
