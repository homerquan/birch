import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import s from './style.css';
import theme from '../theme';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: '',
      },
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }

  registerHandler(event) {
    event.preventDefault();
    // this.props.actions.loginUser(this.state.credentials, this.props.redirect);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <h2 className={s.title}>Register</h2>
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
              <RaisedButton
                label="Login"
                primary
                type="submit"
                onClick={this.registerHandler}
              />
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Register);
