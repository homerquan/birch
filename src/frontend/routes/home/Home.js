/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import BotsList from '../../components/BotsList/BotsList';
import Activities from '../../components/Activities/Activities';

import lightTheme from '../../components/theme';
import { RCard, RCardBody } from '../../components/styled/RCard';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '20px',
  },
  col: {
    flex: 1,
    // maxWidth: '450px',
    marginLeft: '8px',
    marginRight: '8px',
  },
};

// class Home extends React.Component {
//   render() {
//     return (
//       <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
//         <LayoutProvider layouts={grids}>
//           <Page layout="tabs">
//             <Section slot="main">
//               <Tabs>
//                 <Tab label="Applications" style={{ backgroundColor: 'white', color: 'black' }}>
//                   <div style={styles.container}>
//                     <div style={styles.col}>
//                       <BotsList clientId={this.props.session.userId} />
//                     </div>
//                   </div>
//                 </Tab>
//                 <Tab label="Activities" style={{ backgroundColor: 'white', color: 'black' }}>
//                   <div style={styles.container}>
//                     <div style={styles.col}>
//                       <Activities />
//                     </div>
//                   </div>
//                 </Tab>
//               </Tabs>
//             </Section>
//           </Page>
//         </LayoutProvider>
//       </MuiThemeProvider>
//     );
//   }
// }
class Home extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-three">
          <Section slot="titleBar">
            <TitleBar title="Dashboard" />
          </Section>
          <Section slot="col-1">
            <BotsList clientId={this.props.session.userId} />
          </Section>
          <Section slot="col-2">
            <BotsList clientId={this.props.session.userId} />
          </Section>
          <Section slot="col-3">
            <Activities />
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

Home.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default connect(selectProps, null)(Home);
