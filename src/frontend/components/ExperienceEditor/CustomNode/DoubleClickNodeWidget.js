import * as React from 'react';

// import { DiamondNodeModel } from './DiamondNodeModel';
import { PortWidget } from 'storm-react-diagrams';

/**
 * @author Dylan Vorster
 */
export class DoubleClickNodeWidget extends React.Component {
  static defaultProps = {
    size: 150,
    node: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={'diamond-node'}
        style={{
          position: 'relative',
          width: this.props.size,
          height: this.props.size
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.props.size / 2 - 8,
            left: -8,
          }}
        >
          <PortWidget name='in' node={this.props.node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8,
            top: -8,
          }}
        >
          <PortWidget name='out' node={this.props.node} />
        </div>
      </div>
    );
  }
}
