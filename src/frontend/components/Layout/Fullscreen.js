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
import LayoutCss from './Layout.css'; // Bring in same base styles as rest of app
import s from './FullScreen.css';

class Fullscreen extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(normalizeCss, LayoutCss, s)(Fullscreen);
