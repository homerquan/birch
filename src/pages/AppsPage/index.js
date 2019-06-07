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
 * @Last Modified time: 2019-05-29 13:47:17
 */
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { ThemeProvider } from '@material-ui/styles';
import TitleBar from '../../components/TitleBar';
import theme from '../../components/theme';
import grids from '../../components/Layout/grids';
import ButtonLink from '../../components/share/ButtonLink';
import AppsView from '../../components/AppsView';
import s from './style.css';

class AppsPage extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-two">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} >
                <ButtonLink color="default" variant="contained" size="small" href="/create-app" aria-label="Add">
                  Add
                </ButtonLink>
              </TitleBar>
            </Section>
            <Section slot="col-1">
              <AppsView userId={this.props.session.userId} />
            </Section>
            <Section slot="col-2" />
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(connect(selectProps, null)(AppsPage));
