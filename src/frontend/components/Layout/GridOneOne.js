/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 12:25:56
 */

import React from 'react';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import { Slot } from 'react-page-layout';
import s from './GridOneOne.css';

class GridOneOne extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <Slot name="top" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Slot name="main" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default compose(
  withStyles(s),
)(GridOneOne);