import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import ContextExportNodeWidget from './ContextExportNodeWidget';

export default class ContextImportNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('contextExport');
  }

  generateReactWidget(diagramEngine, node) {
    return <ContextExportNodeWidget node={node} diagramEngine={diagramEngine} />;
  }

  getNewInstance() {
    return new SRD.ContextExportNodeModel();
  }
}
