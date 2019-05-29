import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import storm from 'storm-react-diagrams/dist/style.min.css';

import s from './Training.css';
import Diagram from './Diagram';

class Training extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SRD: null,
      engine: null,
    };

    this.addNode = this.addNode.bind(this);
  }

  componentDidMount() {
    return import(/* webpackChunkName: "storm-react-diagrams" */ 'storm-react-diagrams').then((SRD) => {
      const engine = new SRD.DiagramEngine();
      engine.installDefaultFactories();

      const model = new SRD.DiagramModel();

      this.setState({ SRD, engine, model });
    })
    .catch(() => 'An error occurred while loading the component');
  }

  addNode() {
    console.log('called');
    const { SRD, engine, model } = this.state;

    const nodeCount = Object.keys(model.getNodes()).length + 1;

    const node = new SRD.DefaultNodeModel(`Node ${nodeCount}`, 'rgb(0,192,255)');
    node.addInPort('In');
    node.addOutPort('Out');
    node.setPosition(300, 300);

    model.addNode(node);
    engine.repaintCanvas();
    this.forceUpdate();
  }

  render() {
    const { SRD, engine } = this.state;
    const { isOpen, close } = this.props;

    const containerClass = classnames(
      [s.container],
      { [s.active]: isOpen },
    );

    return (
      <div className={containerClass}>
        <div className={s.header}>
          <Button variant="contained"
            label="Close"
            onClick={close}
          />
        </div>
        <div className={s.bodyContainer}>
          <div className={s.sidebar}>
            <p>Sidebar</p>
          </div>
          <div className={s.diagramWrapper}>
            <div className={s.diagramOptions}>
              <Button variant="contained"
                label="Add Node"
                primary
                onClick={this.addNode}
              />
            </div>
            {SRD !== null
              ? (
                <Diagram
                  SRD={SRD}
                  engine={engine}
                  model={this.state.model}
                  addNode={this.addNode}
                />
             ) : (
               'Loading Diagram'
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Training.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default withStyles(storm, s)(Training);