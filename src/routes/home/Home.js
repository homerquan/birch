/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Page, Section, LayoutProvider } from "react-page-layout";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import { Tabs, Tab } from "material-ui/Tabs";
import Slider from "material-ui/Slider";
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';

import grids from "../../components/Layout/grids";
import TitleBar from "../../components/TitleBar";
import AppsList from "../../components/AppsList";
import Activities from "../../components/Activities";

import lightTheme from "../../components/theme";
import { RCard, RCardBody } from "../../components/styled/RCard";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "20px"
  },
  col: {
    flex: 1,
    // maxWidth: '450px',
    marginLeft: "8px",
    marginRight: "8px"
  }
};

class Home extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-two">
            <Section slot="titleBar">
              <TitleBar title="Dashboard">
              </TitleBar>
            </Section>
            <Section slot="col-1">
              <AppsList clientId={this.props.session.userId} />
            </Section>
            <Section slot="col-2">
              <Activities />
            </Section>
          </Page>
        </LayoutProvider>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string
  }).isRequired
};

function selectProps(state) {
  return {
    session: state.session
  };
}

export default connect(
  selectProps,
  null
)(Home);
