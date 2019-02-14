import { NodeModel } from 'storm-react-diagrams';
import { DoubleClickPortModel } from './DoubleClickPortModel';

export class DoubleClickNodeModel extends NodeModel {
  constructor() {
    super('doubleClick');

    this.addPort(new DoubleClickPortModel('in'));
    this.addPort(new DoubleClickPortModel('out'));
  }
}
