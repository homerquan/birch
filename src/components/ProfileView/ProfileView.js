import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sessionActions from '../../actions/session';
import theme from '../theme';
import s from './ProfileView.css';

class ProfileView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler(event) {
    event.preventDefault();
    this.props.actions.logout();
    window.location.replace('/login');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <RaisedButton
            label="Logout"
            primary
            onClick={this.logoutHandler}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default withStyles(s)(
  connect(selectProps, mapDispatchToProps)(ProfileView),
);
