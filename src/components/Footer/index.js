/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';
import Link from '../share/Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© Reflen Inc</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">{new Date().getFullYear()}</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
