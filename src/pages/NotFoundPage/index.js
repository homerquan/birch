/*
* @Author: homer
* @Date:   2019-05-28 23:39:15
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 05:16:23
*/


import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FiFrown as SadIcon } from 'react-icons/fi';
import s from './style.css';

const iconStyles = {
  width: 100,
  height: 100,
};


class NotFound extends React.Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
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
