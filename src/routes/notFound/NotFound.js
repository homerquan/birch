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
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NotFound.css";
import SadIcon from 'react-icons/lib/fa/frown-o';

const iconStyles = {
    width: 100,
    height: 100
};


class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (    
        <div className={s.center}>
            <SadIcon style={iconStyles} /> 
            <h1>Oops...</h1>
            <p>Sorry, the page you were trying to view does not exist.</p>
            <a href="/">Go back</a>
        </div>
    );
  }
}

export default withStyles(s)(NotFound);