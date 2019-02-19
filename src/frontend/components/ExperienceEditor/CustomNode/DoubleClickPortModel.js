import NoSSR from 'react-no-ssr';
import * as _ from 'lodash';

import { PortModel, DefaultLinkModel } from 'storm-react-diagrams';

export class DoubleClickPortModel extends PortModel {
  position;

  constructor(pos = 'in') {
    super(pos, 'doubleClick');
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  createLinkModel() {
    return new DefaultLinkModel();
  }
}
