/*
* @Author: Homer
* @Date:   2017-12-31 18:26:35
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 11:45:28
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import theme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import ExperienceEditor from '../../components/ExperienceEditor';

class NewBot extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ThemeProvider theme={createMuiTheme(theme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-full">
            <Section slot="titleBar">
              <TitleBar
                title={this.props.title}
              />
            </Section>
            <Section slot="main">
              <ExperienceEditor />
            </Section>
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}


export default NewBot;
