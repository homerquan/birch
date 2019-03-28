import * as SRD from 'storm-react-diagrams';
import CardPortModel from './CardPortModel';

export default class CardNodeModel extends SRD.NodeModel {
  constructor(name) {
    super('card');
    this.name = name;

    this.addPort(new CardPortModel('in'));
    this.addPort(new CardPortModel('out'));
  }
}
