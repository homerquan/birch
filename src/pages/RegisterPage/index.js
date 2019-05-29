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
import Register from '../../components/Register';
import s from './style.css';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <section className={s.marketingSide}>
          <div className={s.marketing}>
            <p>Marketing Side.</p>
          </div>
        </section>
        <section className={s.registerSide}>
          <Register />
        </section>
      </div>
    );
  }
}

export default withStyles(s)(RegisterPage);
