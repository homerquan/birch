import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Account.css';

const Account = () => (
  <div className={s.container}>
    <div>
      <h2>Profile</h2>
    </div>
    <div>
      <p>Profile Data</p>
    </div>
    <div>
      <h2>Password</h2>
    </div>
    <div>
      <p>passowrd reset</p>
    </div>
    <div>
      <h2>Close Account</h2>
    </div>
    <div>
      <p>Close this account</p>
    </div>
  </div>
);

export default withStyles(s)(Account);

