import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import _ from 'lodash';

class ContextImportNodeModel extends SRD.NodeModel {
  constructor(name) {
    super('ContextImportNode');

    this.name = name;
  }

  addOutPort(label) {
    return this.addPort(new SRD.DefaultPortModel(false, SRD.Toolkit.UID(), label));
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

  getOutPorts() {
    return _.filter(this.ports, portModel => {
      return !portModel.in;
    });
  }
}

export default ContextImportNodeModel;
