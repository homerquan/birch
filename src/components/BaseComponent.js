/*
* @Author: homer
* @Date:   2019-05-16 22:51:19
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 21:33:49
*/

import { Component } from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends Component {
  static propTypes = {
    session: PropTypes.shape({
      userId: PropTypes.string,
      userRole: PropTypes.string,
    }).isRequired,
  };

  transformConnectionNode = data => (
    _.map(data, 'node')
  );
}


export default BaseComponent;
