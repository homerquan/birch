import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Slot } from 'react-page-layout';
import { ThemeProvider } from 'styled-components';

import { standard } from './theme';
import s from './GridOneThree.css';

class GridOneThree extends React.Component {
  render() {
    return (
      <ThemeProvider theme={standard}>
        <div>
          <Slot name="titleBar" />
          <div className={s.pageContainer}>
            <div className={s.col}>
              <Slot name="col-1" />
            </div>
            <div className={s.col}>
              <Slot name="col-2" />
            </div>
            <div className={s.col}>
              <Slot name="col-3" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(GridOneThree);
