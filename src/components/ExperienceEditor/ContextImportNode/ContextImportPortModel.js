import * as SRD from 'storm-react-diagrams';
import * as _ from 'lodash';

export default class ContextImportPortModel extends SRD.PortModel {
  constructor(name) {
    super(name, 'ContextImportNode', SRD.Toolkit.UID(), 1);
    this.name = name;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.name = data.name;
  }

  createLinkModel() {
    const link = super.createLinkModel();
    return link || new SRD.DefaultLinkModel();
  }
}
