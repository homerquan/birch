import * as SRD from 'storm-react-diagrams';
import _ from 'lodash';

export default class ConditionNodeModel extends SRD.NodeModel {
  constructor() {
    super('conditionNode');

    this.name = name;
  }

  addInPort(label) {
    return this.addPort(new SRD.DefaultPortModel(true, SRD.Toolkit.UID(), label));
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

  getInPorts() {
    return _.filter(this.ports, portModel => {
      return portModel.in;
    });
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => {
      return !portModel.in;
    });
  }
}
