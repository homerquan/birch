import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import ContextImportNodeWidget from './ContextImportNodeWidget';
import ContextImportNodeModel from './ContextImportNodeModel';

export default class ContextImportNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('ContextImportNode');
  }

  generateReactWidget(diagramEngine, node) {
    return <ContextImportNodeWidget node={node} diagramEngine={diagramEngine} />;
  }

  getNewInstance() {
    return new ContextImportNodeModel();
  }
}
