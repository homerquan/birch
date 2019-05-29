import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import s from './Info.css';

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    const { next, back } = this.props;

    return (
      <div className={s.body}>
        <div>
          <SelectField
            floatingLabelText="Type"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={null} primaryText="" />
            <MenuItem value={1} primaryText="Personal" />
            <MenuItem value={2} primaryText="E-commerce" />
            <MenuItem value={3} primaryText="Health" />
            <MenuItem value={4} primaryText="Finance" />
          </SelectField>
        </div>
        <div className={s.footer}>
          <Button variant="contained"
            style={{ marginRight: '14px' }}
            label="Back"
            onClick={back}
          />
          <Button variant="contained"
            label="Next"
            onClick={next}
          />
        </div>
      </div>
    );
  }
}

Properties.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

export default withStyles(s)(Properties);
