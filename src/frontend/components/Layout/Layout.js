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
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    sideBarOpen: false,
  };

  toggleSidebar = () => {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen,
    });
  };

  closeSidebar = () => {
    this.setState({
      sideBarOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Header onToggleChange={this.toggleSidebar} onToggleChange={this.toggleSidebar}/>
        <Sidebar open={this.state.sideBarOpen} onClose={this.closeSidebar}/>
        {this.props.children}
        <Footer />
        <Feedback />
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);