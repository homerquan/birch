import * as SRD from 'storm-react-diagrams';
import ConditionPortModel from './ConditionPortModel';

export default class ConditionNodeModel extends SRD.NodeModel {
  constructor() {
    super('conditionNode');
    this.name = name;

    this.addPort(new ConditionPortModel('in', 1));
    this.addPort(new ConditionPortModel('out', 999));
  }
}
