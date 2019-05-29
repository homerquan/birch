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
import { graphql, compose } from 'react-apollo';
import ThemeProvider from '@material-ui/core/styles/ThemeProvider'

import lightTheme from '../theme';
import Button from '@material-ui/core/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Knowledge.css';
import KnowledgeApi from '../../api/Knowledge';

class Knowledge extends React.Component {

  constructor(props) {
    super(props);
    this.state = { knowledge: '' };
    KnowledgeApi.get().then(resp => {
      this.setState({ knowledge: resp.text });
      document.getElementById("demoKB").value = resp.text;
    });
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onSave.bind(this);
  }


  onChange(event) {
    const text = event.target.value;
    return this.setState({ knowledge: text });
  }

  onSave(event) {
    event.preventDefault();
    KnowledgeApi.set(document.getElementById("demoKB").value);
  }

  render() {
    return (
      <ThemeProvider theme={createMuiTheme(lightTheme)}>
      <div>
        <textarea id="demoKB" class="knowledge" defaultValue={this.state.knowledge} />
        <Button label="Change" fullWidth={true} onClick={this.onSave} />
      </div>  
      </ThemeProvider>
    );
  }
}

export default compose(
  withStyles(s),
)(Knowledge);
