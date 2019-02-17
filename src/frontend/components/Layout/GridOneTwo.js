/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied
 * and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-21 21:49:17
 */

import React from 'react';
import { Slot } from 'react-page-layout';
import styled, { ThemeProvider } from 'styled-components';

import { standard } from './theme';

const ContentContainer = styled.div`
  display: flex; 
  margin: 0 20px;
  margin-top: 20px;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 2;
  margin-right: 10px;

  @media (max-width: 850px) {
    margin-right: 0px;
  }
`;

const Aside = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;

  @media (max-width: 850px) {
    margin-left: 0px;
  }
`;

class GridOneTwo extends React.Component {
  render() {
    return (
      <ThemeProvider theme={standard}>
        <div>
          <Slot name="titleBar" />
          <ContentContainer>
            <MainContent>
              <Slot name="main" style={{ width: '100%' }} />
            </MainContent>
            <Aside>
              <Slot name="right" style={{ width: '100%' }} />
            </Aside>
          </ContentContainer>
        </div>
      </ThemeProvider>
    );
  }
}

export default GridOneTwo;
