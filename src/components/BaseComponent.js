/*
* @Author: homer
* @Date:   2019-05-16 22:51:19
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 03:14:31
*/

import { Component } from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends Component {
  transformConnectionNode = data => (
    _.map(data, 'node') // eslint-disable-line
  );
}

BaseComponent.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string,
    userRole: PropTypes.string,
  }).isRequired,
};

export default BaseComponent;
