/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ThemeProvider } from 'styled-components';
import { Slot } from 'react-page-layout';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Tabs.css';
import { standard } from './theme';

class Tabss extends React.Component {
  render() {
    return (
      <ThemeProvider theme={standard}>
        <div className={s.pageContainer}>
          <Slot name="main" style={{ width: '100%' }} />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(normalizeCss, s)(Tabss);
