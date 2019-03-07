import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import ConditionNodeWidget from './ConditionNodeWidget';

export default class ConditionNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('conditionNode');
  }

  generateReactWidget(diagramEngine, node) {
    return <ConditionNodeWidget node={node} diagramEngine={diagramEngine} />;
  }

  getNewInstance() {
    return new SRD.DefaultNodeModel();
  }
}
