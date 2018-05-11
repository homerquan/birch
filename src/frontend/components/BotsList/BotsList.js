import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { deepPurple500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import lightTheme from '../theme';
import s from './BotsList.css';
import PrimaryText from './PrimaryText';
import BotsListLoader from './BotsListLoader';
import fakeData from './fakeData.json';
import NewApp from '../NewApp/NewApp';

const linkStyle = {
  color: deepPurple500,
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: '400',
};

class BotsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
      newAppModalIsOpen: false,
    };

    this.closeNewAppModal = this.closeNewAppModal.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: fakeData.data,
        isLoading: false,
      });
    }, 1000);
  }

  closeNewAppModal() {
    this.setState({ newAppModalIsOpen: false });
  }

  render() {
    const { isLoading, newAppModalIsOpen } = this.state;

    if (isLoading) {
      return <BotsListLoader />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <Paper zDepth={2} className={s.paper}>
          <Subheader>Applications</Subheader>
          <List style={{ padding: 0 }}>
            {this.state.data.map(application => (
              <div key={application.id}>
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
            <FlatButton
              label="View all Applications"
              labelStyle={linkStyle}
              href="#"
            />
            <RaisedButton
              onClick={() => this.setState({ newAppModalIsOpen: true })}
              label="Create Application"
              primary
            />
          </div>
        </Paper>

        {newAppModalIsOpen &&
          <NewApp
            close={this.closeNewAppModal}
          />
        }
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(BotsList);
