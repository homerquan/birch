import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Title.css';

class Title extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={s.titleContainer}>
        <h3 className={s.breadcrumb}>
          Home <span className={s.separator}>|</span>
          <span className={s.light}>{this.props.children}</span>
        </h3>
        <h2 className={s.title}>{this.props.children}</h2>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
)(Title);
