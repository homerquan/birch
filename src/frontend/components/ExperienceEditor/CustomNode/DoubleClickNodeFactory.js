
import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import { DoubleClickNodeWidget } from './DoubleClickNodeWidget';
import { DoubleClickNodeModel } from './DoubleClickNodeModel';

export class DoubleClickNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('doubleClick');
  }

  generateReactWidget(diagramEngine, node) {
    return <DoubleClickNodeWidget node={node} />;
  }

  getNewInstance() {
    return new DoubleClickNodeModel();
  }
}
