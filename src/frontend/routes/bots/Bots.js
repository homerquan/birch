/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes
 * can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   Michael
 * @Last Modified time: 2017-05-11
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';

import s from './Bots.css';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import BotsView from '../../components/BotsView';

class Bots extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title={this.props.title} />
          </Section>
          <Section slot="main">
            <BotsView clientId={this.props.session.userId} />
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

Bots.propTypes = {
  title: PropTypes.string.isRequired,
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(connect(selectProps, null)(Bots));
