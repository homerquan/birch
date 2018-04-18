import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { deepPurple500 } from 'material-ui/styles/colors';
import Link from '../Link/Link';
import RaisedButton from 'material-ui/RaisedButton';

// Styles
const paperStyle = {
  padding: '15px',
};

const pStyle = {
  margin: 0,
  fontWeight: 'bold',
};

const noteStyle = {
  fontSize: '12px',
  backgroundColor: 'lightgray',
  border: '1px solid gray',
  marginLeft: '6px',
  padding: '1px 2px',
  borderRadius: '2px',
  fontWeight: 'normal',
};

const linkStyle = {
  color: deepPurple500,
  textDecoration: 'none',
};

const footerContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
};

// Helper Component
const PrimaryText = () => (
  <p style={pStyle}>
    Reflen
    <span style={noteStyle}>ecf5973</span>
  </p>
);

const BotsList = () => (
  <MuiThemeProvider>
    <Paper zDepth={2} style={paperStyle}>
      <List style={{ padding: 0 }}>
        <ListItem
          leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
          primaryText={<PrimaryText />}
          secondaryText="http://www.reflen.com"
        />
        <Divider />
        <ListItem
          leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
          primaryText={<PrimaryText />}
          secondaryText="http://www.reflen.com"
        />
        <Divider />
        <ListItem
          leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
          primaryText={<PrimaryText />}
          secondaryText="http://www.reflen.com"
        />
        <Divider />
        <ListItem
          leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
          primaryText={<PrimaryText />}
          secondaryText="http://www.reflen.com"
        />
        <Divider />
      </List>
      <div style={footerContainer}>
        <Link to="#" style={linkStyle}>View all Applications</Link>
        <RaisedButton label="Create Application" />
      </div>
    </Paper>
  </MuiThemeProvider>
);

export default BotsList;
