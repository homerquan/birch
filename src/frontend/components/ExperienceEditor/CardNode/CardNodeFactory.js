import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import CardNodeWidget from './CardNodeWidget';

export default class CardNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('default');
  }

  generateReactWidget(diagramEngine, node) {
    return <CardNodeWidget node={node} diagramEngine={diagramEngine} />;
  }

  getNewInstance() {
    return new SRD.DefaultNodeModel();
  }
}
