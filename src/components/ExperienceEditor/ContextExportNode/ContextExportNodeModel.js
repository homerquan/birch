import * as SRD from 'storm-react-diagrams';
import _ from 'lodash';

export default class ContextExportNodeModel extends SRD.NodeModel {
  constructor() {
    super('contextExport');

    this.name = name;
  }

  addInPort(label) {
    return this.addPort(new SRD.DefaultPortModel(true, SRD.Toolkit.UID(), label));
  }

  deSerialize(object, engine) {
    super.deSerialize(object, engine);
    this.name = object.name;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
    });
  }

  getInPorts() {
    return _.filter(this.ports, portModel => {
      return portModel.in;
    });
  }
}
