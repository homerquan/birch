import * as SRD from 'storm-react-diagrams';
import ContextExportPortModel from './ContextExportPortModel';

class ContextExportNodeModel extends SRD.NodeModel {
  constructor() {
    super('contextExport');

    this.name = name;
    this.addPort(new ContextExportPortModel('in'));
  }
}

export default ContextExportNodeModel;
