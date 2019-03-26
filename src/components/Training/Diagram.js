import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Diagram.css';

const Diagram = ({ SRD, engine, model }) => {
  

  // 3) create a default node
  const node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  const port1 = node1.addOutPort('Out');
  node1.setPosition(100, 0);

  // 4) create another default node
  const node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
  const port2 = node2.addInPort('In');
  node2.setPosition(400, 100);

  const node3 = new SRD.DefaultNodeModel('Node 3', 'rgb(192,255,0)');
  node3.addInPort('In');
  node3.setPosition(400, 300);


  const link1 = port1.link(port2);

  model.addAll(node1, node2, link1, node3);
  engine.setDiagramModel(model);


  return (
    <SRD.DiagramWidget
      className={s.diagramWidget}
      diagramEngine={engine}
    />
  );
};

Diagram.propTypes = {
  SRD: PropTypes.object.isRequired, // eslint-disable-line
  engine: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(s)(Diagram);
