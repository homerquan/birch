import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../../components/theme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className={s.root}>
          <div className={s.container}>
            <h1>{this.props.title}</h1>
            <p className={s.lead}>to continue to convospot</p>
            <p>{this.props.session.statusText}</p>
            <form>
              <div className={s.formGroup}>
                <TextField
                  hintText="Username or email"
                  type="text"
                  name="email"
                  autoFocus
                  value={this.state.credentials.email}
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
                <RaisedButton label="Login" primary type="submit" onClick={this.onSave} />
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
    session: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default withStyles(s)(connect(selectProps, mapDispatchToProps)(Login));
