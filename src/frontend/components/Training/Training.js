import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import storm from 'storm-react-diagrams/dist/style.min.css';

import s from './Training.css';

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

      // 2) setup the diagram model
      const model = new SRD.DiagramModel();

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
      engine.repaintCanvas();

      this.setState({
        SRD,
        engine,
      });
    })
    .catch(() => 'An error occurred while loading the component');
  }

  addNode() {
    const { SRD, engine } = this.state;
    const model = engine.getDiagramModel();

    const nodeCount = Object.keys(model.getNodes()).length + 1;

    const node = new SRD.DefaultNodeModel(`Node ${nodeCount}`, 'rgb(0,192,255)');
    node.addInPort('In');
    node.addOutPort('Out');
    node.setPosition(300, 300);

    model.addNode(node);
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
          <RaisedButton
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
              <RaisedButton
                label="Add Node"
                primary
                onClick={this.addNode}
              />
            </div>
            {SRD
              ? (
                <SRD.DiagramWidget
                  className={s.diagramWidget}
                  diagramEngine={engine}
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


// “query {
//   ConversationsFeed(clientId:“abc”,botId:“123") {
//     conversations(first:1,last:10){
//       totalCount
//       edges{
//         node {
//           id
//           client
//         }
//       }
//   pageInfo{
//   hasNextPage
//   endCursor
//   }
//   }
//   }
//   }”