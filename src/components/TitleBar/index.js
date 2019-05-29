import React from 'react';
import PropTypes from 'prop-types';

import { TitleContainer, Breadcrumbs } from '../styled/TitleBar';

class Title extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <TitleContainer>
        <Breadcrumbs>
          <li>
            <a href="/">Home</a><span className="separator">|</span>
          </li>
          <li>
            <h3>{this.props.title}</h3>
          </li>
        </Breadcrumbs>
        <div>
          {this.props.children}
        </div>
      </TitleContainer>
    );
  }
}

export default Title;
