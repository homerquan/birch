import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import _ from 'lodash';
import styled from 'styled-components';

const Container = styled.div`
  background-color: red;
  width: 50px;
  height: 50px;
`;

class ConditionNodeWidget extends SRD.BaseWidget {
  generatePort(port) {
    return <SRD.DefaultPortLabel model={port} key={port.id} />;
  }

  render() {
    return (
      <Container>
        {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
        {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
      </Container>
    );
  }
}

export default ConditionNodeWidget;
