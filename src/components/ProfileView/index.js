import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sessionActions from '../../actions/session';
import theme from '../theme';
import s from './style.css';

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
      <MuiThemeProvider muiTheme={createMuiTheme(theme)}>
        <div>
          <Button variant="contained"
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
