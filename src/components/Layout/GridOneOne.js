/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied
 * and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   homer
 * @Last Modified time: 2019-04-26 13:20:47
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'react-apollo';
import { Slot } from 'react-page-layout';
import { ThemeProvider } from 'styled-components';

import { standard } from './theme';
import s from './GridOneOne.css';

class GridOneOne extends React.Component {
  render() {
    return (
      <ThemeProvider theme={standard}>
        <div>
          <Slot name="titleBar" />
          <div className={s.pageContainer}>
            <Slot name="main" />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default compose(
  withStyles(s),
)(GridOneOne);
