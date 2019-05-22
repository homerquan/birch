import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './style.css';

const AppLoading = () => (
  <div className={s.loader}>
    <img src="/images/loader.svg" alt="loading" />
  </div>
);

export default withStyles(s)(AppLoading);
