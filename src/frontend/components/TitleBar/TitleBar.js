import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';

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
            <a href="/">Home</a> <span className="separator">|</span>
          </li>
          <li>
            <h3>{this.props.title}</h3>
          </li>
        </Breadcrumbs>
        <div>
          <FlatButton
            label="Do Action"
            primary
            icon={<EditIcon style={{ width: '16px', height: '16px' }} />}
            style={{ height: '32px', lineHeight: '32px' }}
            labelStyle={{ fontSize: '12px' }}
          />
        </div>
      </TitleContainer>
    );
  }
}

export default Title;
