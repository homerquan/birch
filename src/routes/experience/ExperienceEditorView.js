/*
* @Author: Homer
* @Date:   2017-12-31 18:26:35
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-31 18:43:50
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import lightTheme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import ExperienceEditor from '../../components/ExperienceEditor';

class NewBot extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
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
      </MuiThemeProvider>
    );
  }
}


export default NewBot;
