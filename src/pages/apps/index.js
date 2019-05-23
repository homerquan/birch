/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes
 * can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-23 03:13:14
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../components/theme';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import AppsView from '../../components/AppsView';
import s from './style.css';

class Apps extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <AppsView userId={this.props.session.userId} />
            </Section>
          </Page>
        </LayoutProvider>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(connect(selectProps, null)(Apps));
