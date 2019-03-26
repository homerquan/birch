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

import s from './Register.css';
import RegisterForm from '../../components/Register/RegisterForm';
import Marketing from '../../components/Register/Marketing';

class Register extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <section className={s.marketingSide}>
          <Marketing />
        </section>
        <section className={s.registerSide}>
          <RegisterForm />
        </section>
      </div>
    );
  }
}

export default withStyles(s)(Register);
