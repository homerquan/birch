/*
* @Author: homer
* @Date:   2019-05-16 22:51:19
* @Last Modified by:   homer
* @Last Modified time: 2019-05-16 22:58:54
*/

import { Component } from 'react';

class BaseComponent extends Component {
  transformConnectionNode = data => (
    _.map(data, 'node') // eslint-disable-line
  );
}

export default BaseComponent;
