import * as SRD from 'storm-react-diagrams';
import ContextImportPortModel from './ContextImportPortModel';

class ContextImportNodeModel extends SRD.NodeModel {
  constructor(name) {
    super('ContextImportNode');

    this.name = name;
    this.addPort(new ContextImportPortModel('out'));
  }
}

export default ContextImportNodeModel;
