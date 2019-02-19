import * as React from 'react';
import NoSSR from 'react-no-ssr';

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



class ExperienceEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SRD: null,
      DoubleClickNodeModel: null,
      graphLoaded: false,
      engine: null,
    };

    this.addNode = this.addNode.bind(this);
    // this.renderGraph = this.renderGraph.bind(this);
  }

  // componentDidMount() {
    // let DoubleClickNodeModel = null;
    // let DoubleClickNodeFactory = null;
    // let SimplePortFactory = null;
    // let DoubleClickPortModel = null;

    // console.log('$storm Here: ', $storm);

    // import('./CustomNode/DoubleClickNodeModel').then((module) => {
    //   // this.setState({ doubleClickNodeModel: DoubleClickNodeModel });
    //   console.log('what is DoubleClickNodeModel?: ', module);
    //   console.log('what is DoubleClickNodeModel deafult?: ', module.default);
    //   console.log('what is DoubleClickNodeModel? DoubleClickNodeModel: ', module.DoubleClickNodeModel);
    //   DoubleClickNodeModel = module.DoubleClickNodeModel;
    // });
    // import('./CustomNode/DoubleClickNodeFactory').then((module) => {
    //   // this.setState({ doubleClickNodeFactory: DoubleClickNodeFactory });
    //   console.log('what is DoubleClickNodeFactory?: ', module);
    //   // console.log('what is DoubleClickNodeFactory?: ', DoubleClickNodeFactory.DoubleClickNodeFactory);
    //   DoubleClickNodeFactory = module.DoubleClickNodeFactory;
    // });
    // import('./CustomNode/SimplePortFactory').then((module) => {
    //   // this.setState({ simplePortFactory: SimplePortFactory });
    //   SimplePortFactory = module.SimplePortFactory;
    // });
    // import('./CustomNode/DoubleClickPortModel').then((module) => {
    //   // this.setState({ doubleClickPortModel: DoubleClickPortModel });
    //   DoubleClickPortModel = module.DoubleClickPortModel;
    // });

  //   return import(/* webpackChunkName: "storm-react-diagrams" */ 'storm-react-diagrams').then((SRD) => {
  //     const engine = new SRD.DiagramEngine();
  //     engine.installDefaultFactories();

  //     console.log('made it here?', DoubleClickNodeModel);

  //     // engine.registerPortFactory(new SimplePortFactory('doubleClick', config => new DoubleClickPortModel()));
  //     // engine.registerNodeFactory(new DoubleClickNodeFactory());

  //     console.log('created engine stuff?');

  //     // 2) setup the diagram model
  //     const model = new SRD.DiagramModel();
  //     model.addListener({
  //       selectionChanged: (e) => {
  //         console.log('selection changed: ', e);
  //       },
  //     });

  //     // 3) create a default node
  //     const nodeOne = new SRD.DefaultNodeModel('Node One', 'rgb(0,192,255)');
  //     const nodeOneOut = nodeOne.addOutPort('Out');
  //     const nodeOneIn = nodeOne.addInPort('In');
  //     nodeOneOut.maximumLinks = 1;
  //     nodeOneIn.maximumLinks = 1;
  //     nodeOne.setPosition(100, 0);

  //     // 4) create another default node
  //     const nodeTwo = new SRD.DefaultNodeModel('Node Two', 'rgb(192,255,0)');
  //     const nodeTwoOut = nodeTwo.addOutPort('Out');
  //     const nodeTwoIn = nodeTwo.addInPort('In');
  //     nodeTwoOut.maximumLinks = 1;
  //     nodeTwoIn.maximumLinks = 1;
  //     nodeTwo.setPosition(400, 100);

  //     const nodeThree = new SRD.DefaultNodeModel('Node 3', 'rgb(192,255,0)');
  //     const nodeThreeOut = nodeThree.addOutPort('Out');
  //     const nodeThreeIn = nodeThree.addInPort('In');
  //     nodeThreeOut.maximumLinks = 1;
  //     nodeThreeIn.maximumLinks = 1;
  //     nodeThree.setPosition(400, 300);

  //     // const node2 = new doubleClickNodeModel();
  //     // node2.setPosition(250, 108);

  //     const nodeOneToNodeTwo = nodeOneOut.link(nodeTwoIn);

  //     // model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree, node2);
  //     model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree);
  //     engine.setDiagramModel(model);
  //     engine.repaintCanvas();

  //     this.setState({
  //       SRD,
  //       engine,
  //     });
  //   })
  //   .catch(() => 'An error occurred while loading the component');
  // }

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

  componentDidMount() {


    //For Client side rendering Add cliend side component after mount
    let DoubleClickNodeModel = require('./CustomNode/DoubleClickNodeModel');
    let DoubleClickNodeFactory = require('./CustomNode/DoubleClickNodeFactory');
    let SimplePortFactory = require('./CustomNode/SimplePortFactory');
    let DoubleClickPortModel= require('./CustomNode/DoubleClickPortModel');

    console.log('$storm Here: ', $storm);
    // console.log('client Here: ', context.client);

    const engine = new $storm.DiagramEngine();
    engine.installDefaultFactories();

    // engine.registerPortFactory(new SimplePortFactory('doubleClick', config => new DoubleClickPortModel()));
    // engine.registerNodeFactory(new DoubleClickNodeFactory());

    // // 2) setup the diagram model
    const model = new $storm.DiagramModel();
    // model.addListener({
    //   selectionChanged: (e) => {
    //     console.log('selection changed: ', e);
    //   },
    // });

    // 3) create a default node
    const nodeOne = new $storm.DefaultNodeModel('Node One', 'rgb(0,192,255)');
    const nodeOneOut = nodeOne.addOutPort('Out');
    const nodeOneIn = nodeOne.addInPort('In');
    nodeOneOut.maximumLinks = 1;
    nodeOneIn.maximumLinks = 1;
    nodeOne.setPosition(100, 0);

    // 4) create another default node
    const nodeTwo = new $storm.DefaultNodeModel('Node Two', 'rgb(192,255,0)');
    const nodeTwoOut = nodeTwo.addOutPort('Out');
    const nodeTwoIn = nodeTwo.addInPort('In');
    nodeTwoOut.maximumLinks = 1;
    nodeTwoIn.maximumLinks = 1;
    nodeTwo.setPosition(400, 100);

    const nodeThree = new $storm.DefaultNodeModel('Node 3', 'rgb(192,255,0)');
    const nodeThreeOut = nodeThree.addOutPort('Out');
    const nodeThreeIn = nodeThree.addInPort('In');
    nodeThreeOut.maximumLinks = 1;
    nodeThreeIn.maximumLinks = 1;
    nodeThree.setPosition(400, 300);

    // // const node2 = new doubleClickNodeModel();
    // // node2.setPosition(250, 108);

    const nodeOneToNodeTwo = nodeOneOut.link(nodeTwoIn);

    // model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree, node2);
    model.addAll(nodeOne, nodeTwo, nodeOneToNodeTwo, nodeThree);
    engine.setDiagramModel(model);
    engine.repaintCanvas();

    this.setState({
      graphLoaded: true,
      engine,
      SRD: $storm,
    });
  }

  render() {
    const { SRD, graphLoaded, engine } = this.state;

    return (
    <NoSSR>    
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

          {graphLoaded
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
    </NoSSR>   
    );
  }
}

export default withStyles(storm)(ExperienceEditor);
