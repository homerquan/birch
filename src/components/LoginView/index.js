import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox';
import theme from '../theme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session';
import s from './style.css';

class LoginView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { credentials: { username: '', password: '' } };
    this.onChange = this.onChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }

  loginHandler(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials, this.props.redirect);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={createMuiTheme(theme)}>
        <div className={s.root}>
          <div className={s.container}>
            <h2 className={s.title}>{this.props.title}</h2>
            <p className={s.lead}>to continue to reflen</p>
            <p>{this.props.session.statusText}</p>
            <form>
              <div className={s.formGroup}>
                <TextField
                  hintText="Username or email"
                  type="text"
                  name="username"
                  autoFocus
                  value={this.state.credentials.username}
                  onChange={this.onChange}
                />
              </div>
              <div className={s.formGroup}>
                <TextField
                  hintText="Password"
                  type="password"
                  name="password"
                  value={this.state.credentials.password}
                  onChange={this.onChange}
                />
              </div>
              <div className={s.formGroup}>
                <Checkbox label="Remember me" />
              </div>
              <div className={s.formGroup}>
                <Button
                  variant="contained"
                  label="Login"
                  primary
                  type="submit"
                  onClick={this.loginHandler}
                />
              </div>
            </form>
          </div>
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
  connect(selectProps, mapDispatchToProps)(LoginView),
);
