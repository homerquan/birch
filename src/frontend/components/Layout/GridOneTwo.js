/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-16 05:38:11
 */

import React from 'react';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import { Slot } from 'react-page-layout';
import {ThemeProvider} from 'styled-components'
import {standard} from './theme'
import s from './GridOneTwo.css';

class GridOneTwo extends React.Component {
  render() {
    return (
     <ThemeProvider theme={standard}>   
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <Slot name="top" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <Slot name="main" />
          </Col>
           <Col xs={12} md={4}>
            <Slot name="right" />
          </Col>
        </Row>
      </Grid>
      </ThemeProvider> 
    );
  }
}

export default compose(
  withStyles(s),
)(GridOneTwo);