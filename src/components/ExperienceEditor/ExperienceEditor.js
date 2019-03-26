import * as React from 'react';
import NoSSR from 'react-no-ssr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import storm from 'storm-react-diagrams/dist/style.min.css';
import _ from 'lodash';

import {
  ExperienceEditorContainer,
  Header,
  Sidebar,
  SidebarHeader,
  Editor,
  EditorOptions,
} from '../styled/ExperienceEditor';
import ExperienceCard from './ExperienceCard';

const fakeData = [
  {
    id: 'asfdsdaf',
    type: 'import',
    position: {
      x: 100,
      y: 100,
    },
    links: {
      out: 'kfjdkfdjf',
    },
  },
  {
    id: 'kfjdkfdjf',
    type: 'card',
    title: 'Conversational Form',
    position: {
      x: 350,
      y: 100,
    },
  },
  {
    id: 'dfdfdfd3dds',
    type: 'export',
    position: {
      x: 550,
      y: 100,
    },
  },
];

const fakeDataTwo = [
  {
    id: 'dfdfdfdfdfdd3dds',
    type: 'condition',
    position: {
      x: 150,
      y: 100,
    },
  },
  {
    id: 'asdffdfdfdfdd',
    type: 'card',
    title: 'Message Card',
    position: {
      x: 300,
      y: 40,
    },
  },
  {
    id: 'asdffdfdfdfdd',
    type: 'card',
    title: 'Message Card',
    position: {
      x: 300,
      y: 160,
    },
  },
];

class ExperienceEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SRD: null,
      DoubleClickNodeModel: null,
      graphLoaded: false,
      engine: null,
      userSimulator: false,
      inNestedScreen: false,
      data: fakeData,
    };

    this.addNode = this.addNode.bind(this);
    this.addExperienceCard = this.addExperienceCard.bind(this);
    this.addContextImport = this.addContextImport.bind(this);
    this.addContextExport = this.addContextExport.bind(this);
    this.addConditionNode = this.addConditionNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    const graphBase = this.buildGraph(fakeData);

    this.setState({
      graphLoaded: true,
      ...graphBase,
    });
  }

  buildGraph(data) {
    const SRD = require('storm-react-diagrams');

    const CardNodeFactory = require('./CardNode/CardNodeFactory').default;
    const ContextImportNodeFactory = require('./ContextImportNode/ContextImportNodeFactory').default;
    const ContextExportNodeFactory = require('./ContextExportNode/ContextExportNodeFactory').default;
    const ConditionNodeFactory = require('./ConditionNode/ConditionNodeFactory').default;

    const engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    engine.registerNodeFactory(new CardNodeFactory());
    engine.registerNodeFactory(new ContextImportNodeFactory());
    engine.registerNodeFactory(new ContextExportNodeFactory());
    engine.registerNodeFactory(new ConditionNodeFactory());

    // 2) setup the diagram model
    const model = new SRD.DiagramModel();

    const nodesObject = [];
    data.forEach((node) => {
      switch (node.type) {
        case 'import': {
          const newNode = this.contextImportInit(engine, node);
          nodesObject.push({ id: node.id, node: newNode });
          break;
        }
        case 'export': {
          const newNode = this.contextExportInit(engine, node);
          nodesObject.push({ id: node.id, node: newNode });
          break;
        }
        case 'card': {
          const newNode = this.experienceCardInit(engine, node);
          nodesObject.push({ id: node.id, node: newNode });
          break;
        }
        case 'condition': {
          const newNode = this.conditionNodeInit(engine, node);
          nodesObject.push({ id: node.id, node: newNode });
          break;
        }
        default:
          break;
      }
    });

    const nodes = nodesObject.map(nodeObject => nodeObject.node);
    const models = model.addAll(...nodes);

    models.forEach((item) => {
      item.addListener({
        selectionChanged: (e) => {
          if (this.state.userSimulator && !this.state.inNestedScreen) {
            e.stopPropagation();

            const graphBase = this.buildGraph(fakeDataTwo);
            this.setState({
              data: fakeDataTwo,
              userSimulator: false,
              inNestedScreen: true,
              ...graphBase,
            });
          }
        },
      });
    });

    engine.setDiagramModel(model);
    engine.repaintCanvas();

    return {
      SRD,
      engine,
    };
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

  experienceCardInit(engine, nodeData) {
    const CardNodeModel = require('./CardNode/CardNodeModel').default;

    const node = new CardNodeModel(nodeData.title);
    const nodeOut = node.addOutPort('Out');
    const nodeIn = node.addInPort('In');
    nodeOut.maximumLinks = 1;
    nodeIn.maximumLinks = 1;
    node.setPosition(nodeData.position.x, nodeData.position.y);

    return node;
  }

  contextImportInit(engine, nodeData) {
    const ContextImportNodeModel = require('./ContextImportNode/ContextImportNodeModel').default;

    const node = new ContextImportNodeModel();
    const nodeOut = node.addOutPort('Out');
    nodeOut.maximumLinks = 1;
    node.setPosition(nodeData.position.x, nodeData.position.y);

    return node;
  }

  contextExportInit(engine, nodeData) {
    const ContextExportNodeModel = require('./ContextExportNode/ContextExportNodeModel').default;

    const node = new ContextExportNodeModel();
    const nodeIn = node.addInPort('In');
    nodeIn.maximumLinks = 1;
    node.setPosition(nodeData.position.x, nodeData.position.y);

    return node;
  }

  conditionNodeInit(engine, nodeData) {
    const ConditionNodeModal = require('./ConditionNode/ConditionNodeModal').default;

    const node = new ConditionNodeModal();
    node.addOutPort('Out');

    const nodeIn = node.addInPort('In');
    nodeIn.maximumLinks = 1;
    node.setPosition(nodeData.position.x, nodeData.position.y);

    return node;
  }

  addExperienceCard(title) {
    const CardNodeModel = require('./CardNode/CardNodeModel').default;
    const { engine } = this.state;
    const model = engine.getDiagramModel();

    const node = new CardNodeModel(title);
    const nodeOut = node.addOutPort('Out');
    const nodeIn = node.addInPort('In');
    nodeOut.maximumLinks = 1;
    nodeIn.maximumLinks = 1;
    node.setPosition(100, 200);

    node.addListener({
      selectionChanged: (e) => {
        console.log('experience card: ', e);

        if (this.state.userSimulator) {
          e.stopPropagation();
          console.log('go!');
        }
      },
    });

    model.addNode(node);
    this.forceUpdate();
  }

  addContextImport() {
    const ContextImportNodeModel = require('./ContextImportNode/ContextImportNodeModel').default;
    const { engine } = this.state;
    const model = engine.getDiagramModel();

    const node = new ContextImportNodeModel();
    const nodeOut = node.addOutPort('Out');
    nodeOut.maximumLinks = 1;
    node.setPosition(100, 200);

    model.addNode(node);
    this.forceUpdate();
  }

  addContextExport() {
    const ContextExportNodeModel = require('./ContextExportNode/ContextExportNodeModel').default;
    const { engine } = this.state;
    const model = engine.getDiagramModel();

    const node = new ContextExportNodeModel();
    const nodeIn = node.addInPort('In');
    nodeIn.maximumLinks = 1;
    node.setPosition(100, 200);

    model.addNode(node);
    this.forceUpdate();
  }

  addConditionNode() {
    const ConditionNodeModal = require('./ConditionNode/ConditionNodeModal').default;
    const { engine } = this.state;
    const model = engine.getDiagramModel();

    const node = new ConditionNodeModal();
    node.addOutPort('Out');

    const nodeIn = node.addInPort('In');
    nodeIn.maximumLinks = 1;
    node.setPosition(200, 200);

    model.addNode(node);
    this.forceUpdate();
  }

  deleteNode() {
    const { engine } = this.state;
    const model = engine.getDiagramModel();

    _.forEach(model.getSelectedItems(), (item) => {
      item.remove();
    });

    this.forceUpdate();
  }

  back() {
    const graphBase = this.buildGraph(fakeData);
    this.setState({
      data: fakeData,
      inNestedScreen: false,
      ...graphBase,
    });
  }

  render() {
    const { SRD, graphLoaded, engine } = this.state;
    const experienceCards = this.state.data.filter(node => node.type === 'card');

    return (
      <NoSSR>
        <Header>
          <RaisedButton
            label="User Simulator"
            onClick={() => this.setState({ userSimulator: !this.state.userSimulator })}
            style={{ marginRight: '5px' }}
            backgroundColor={this.state.userSimulator ? 'green' : 'white'}
          />
          <RaisedButton
            label="delete"
            onClick={this.deleteNode}
            style={{ marginRight: '5px' }}
          />
        </Header>
        <ExperienceEditorContainer>
          <Sidebar>
            <SidebarHeader>
              <h3>Cards</h3>

              {this.state.inNestedScreen
                ? (
                  <RaisedButton
                    label="Back"
                    onClick={this.back}
                    primary
                  />
                )
                : ''
              }
            </SidebarHeader>
            {experienceCards.map(card => (
              <ExperienceCard
                headerTitle={card.title}
                limitToOne={false}
                onClick={() => this.addExperienceCard(card.title)}
              />
            ))}
          </Sidebar>
          <Editor>
            <EditorOptions>
              <RaisedButton
                label="Context Import Node"
                onClick={this.addContextImport}
                style={{ marginRight: '5px' }}
              />
              <RaisedButton
                label="Condition Node"
                onClick={this.addConditionNode}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              />
              <RaisedButton
                label="Context Export Node"
                onClick={this.addContextExport}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              />
              <RaisedButton
                label="Plugin Node"
                onClick={this.addNode}
                style={{ marginLeft: '5px' }}
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
