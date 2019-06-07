/*
* @Author: homer
* @Date:   2019-05-28 23:39:15
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 05:16:23
*/


import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ThemeProvider } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import theme from '../../components/theme';
import BlankScreen from '../../components/Layout/BlankScreen';
import LoginView from '../../components/LoginView';
import Background from '../../../public/images/bg.svg';
import s from './styles.css';

const styles = {
  loginScreen: {
    backgroundImage: `url(${Background})`,
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  loginPaper: {
    minHehgit: 200,
    minWidth: 450,
    maxWidth: '100%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class LoginPage extends React.Component {

  static propTypes = {
    redirect: PropTypes.string.isRequired,
  };

  render() {
    return (
      <BlankScreen>
          <ThemeProvider theme={theme}>
            <div style={styles.loginScreen}>
              <Paper style={styles.loginPaper}>
                <LoginView title="Log in" redirect={this.props.redirect} />
              </Paper>
            </div>
          </ThemeProvider>
      </BlankScreen>
    );
  }
}

export default withStyles(s)(LoginPage);
