import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import CardNodeWidget from './CardNodeWidget';
import CardNodeModel from './CardNodeModel';

export default class CardNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('card');
  }

  generateReactWidget(diagramEngine, node) {
    return <CardNodeWidget node={node} diagramEngine={diagramEngine} />;
  }

  getNewInstance() {
    return new CardNodeModel();
  }
}
