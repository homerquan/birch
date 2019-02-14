import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import storm from 'storm-react-diagrams/dist/style.min.css';
import { List, ListItem } from 'material-ui/List';

import {
  ExperienceEditorContainer,
  Sidebar,
  Editor,
  EditorOptions,
} from '../styled/ExperienceEditor';

// import { DoubleClickNodeModel } from './CustomNode/DoubleClickNodeModel';
// import { DoubleClickNodeFactory } from './CustomNode/DoubleClickNodeFactory';
// import { SimplePortFactory } from './CustomNode/SimplePortFactory';
// import { DoubleClickPortModel } from './CustomNode/DoubleClickPortModel';

class ExperienceEditor extends React.Component {
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

      // engine.registerPortFactory(new SimplePortFactory('doubleClick', config => new DoubleClickPortModel()));
      // engine.registerNodeFactory(new DoubleClickNodeFactory());

      // 2) setup the diagram model
      const model = new SRD.DiagramModel();
      model.addListener({
        selectionChanged: (e) => {
          console.log('selection changed: ', e);
        },
      });

      // 3) create a default node
      const nodeOne = new SRD.DefaultNodeModel('Node One', 'rgb(0,192,255)');
      const nodeOneOut = nodeOne.addOutPort('Out');
      const nodeOneIn = nodeOne.addInPort('In');
      nodeOneOut.maximumLinks = 1;
      nodeOneIn.maximumLinks = 1;
      nodeOne.setPosition(100, 0);

      // 4) create another default node
      const nodeTwo = new SRD.DefaultNodeModel('Node Two', 'rgb(192,255,0)');
      const nodeTwoOut = nodeTwo.addOutPort('Out');
      const nodeTwoIn = nodeTwo.addInPort('In');
      nodeTwoOut.maximumLinks = 1;
      nodeTwoIn.maximumLinks = 1;
      nodeTwo.setPosition(400, 100);

      const nodeThree = new SRD.DefaultNodeModel('Node 3', 'rgb(192,255,0)');
      const nodeThreeOut = nodeThree.addOutPort('Out');
      const nodeThreeIn = nodeThree.addInPort('In');
      nodeThreeOut.maximumLinks = 1;
      nodeThreeIn.maximumLinks = 1;
      nodeThree.setPosition(400, 300);

      // const node2 = new DoubleClickNodeModel();
      // node2.setPosition(250, 108);

      const nodeOneToNodeTwo = nodeOneOut.link(nodeTwoIn);

      // model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree, node2);
      model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree);
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
    const inPort = node.addInPort('In');
    const outPort = node.addOutPort('Out');
    inPort.maximumLinks = 1;
    outPort.maximumLinks = 1;
    node.setPosition(300, 300);
    node.addListener({
      selectionChanged: (e) => {
        console.log('selection Changed on node: ', e);
      },
    });

    model.addNode(node);
    this.forceUpdate();
  }

  render() {
    const { SRD, engine } = this.state;

    return (
      <ExperienceEditorContainer>
        <Sidebar>
          <h3>Cards</h3>
          <List style={{ width: '100%' }}>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent mail" />
            <ListItem primaryText="Drafts" />
            <ListItem primaryText="Inbox" />
          </List>
        </Sidebar>
        <Editor>
          <EditorOptions>
            <RaisedButton
              label="Add Node"
              primary
              onClick={this.addNode}
            />
          </EditorOptions>

          {SRD
            ? (
              <SRD.DiagramWidget
                style={{ height: '100%' }}
                diagramEngine={engine}
                allowLooseLinks={false}
                maxNumberPointsPerLink={0}
              />
            ) : 'Diagram is loading'
          }
        </Editor>
      </ExperienceEditorContainer>
    );
  }
}
import { from } from 'rxjs/observable/from';

export default withStyles(storm)(ExperienceEditor);
