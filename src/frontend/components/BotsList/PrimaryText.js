import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PrimaryText.css';

const PrimaryText = ({ text, number }) => (
  <p className={s.primaryText}>
    <a href={`/${number}/conversations`}>{text}</a>      
    <span className={s.note}>{number}</span>
  </p>
);

PrimaryText.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default withStyles(s)(PrimaryText);
