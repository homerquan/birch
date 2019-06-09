import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import theme from '../theme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session';
import styles from './style.css';

class LoginView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { credentials: { username: '', password: '' }, remember: false };
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
      <ThemeProvider theme={theme}>
        <div className={s.root}>
          <div className={s.container}>
            <h2 className={s.title}>{this.props.title}</h2>
            <p className={s.lead}>to continue to reflen</p>
            <p>{this.props.session.statusText}</p>
            <form>
              <div className={s.formGroup}>
                <TextField
                  label="Username"
                  name="username"
                  value={this.state.credentials.username}
                  margin="normal"
                  variant="outlined"
                  placeholder="Username or email"
                  autoFocus
                  fullWidth
                  onChange={this.onChange}
                />
              </div>
              <div className={s.formGroup}>
                <TextField
                  label="Password"
                  name="password"
                  value={this.state.credentials.password}
                  margin="normal"
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                  onChange={this.onChange}
                />
              </div>
              <div className={s.formGroup}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.remember}
                      value="mememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </div>
              <div className={s.formGroup}>
                <Button variant="contained" color="primary" onClick={this.loginHandler}>
       Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const selectProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

export default withStyles(styles)(
  connect(selectProps, mapDispatchToProps)(LoginView),
);
