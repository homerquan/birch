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
import Footer from '../Footer';
import Console from '../Console/Console';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openSidebar: false,
      loading: true,
    };
  }

  // https://stackoverflow.com/questions/23734862/check-if-all-child-components-have-been-mounted
  // All child components are loaded before parent componentDidMount is called.
  componentDidMount() {
    this.setState({ loading: false });
  }

  toggleSidebar = () => {
    this.setState({
      openSidebar: !this.state.openSidebar,
    });
  };

  closeSidebar = () => {
    this.setState({
      openSidebar: false,
    });
  };

  render() {
    // const loading = this.state.loading;

    if (this.state.loading) {
      return (
        <div className={s.loader}>
          <img src="/images/loader.svg" alt="loading" />
        </div>
      );
    }

    return (
      <div>
        <Header onToggleChange={this.toggleSidebar} />
        <Sidebar open={this.state.openSidebar} onClose={this.closeSidebar} />
        <div>{this.props.children}</div>
        <Footer />
        <Console />
      </div>
    );

    // return (
    //   <div>
    //     <Header onToggleChange={this.toggleSidebar} />
    //     <Sidebar open={this.state.openSidebar} onClose={this.closeSidebar} />
    //     {loading ? (
    //       <div className={s.loader}>
    //         <img src="/images/loader.svg" alt="loading" />
    //       </div>
    //     ) : (
    //       <div>{this.props.children}</div>
    //     )}
    //     {loading ? null : <Footer />}
    //     <Console />
    //   </div>
    // );
  }
}

export default withStyles(normalizeCss, s)(Layout);
