import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import styled from 'styled-components';

import theme from '../../theme';

const { palette } = theme;

const Container = styled.div`
  background-color: ${palette.primary1Color};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: space-between;
`;

const PortContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;

  p {
    color: white;
    margin: 0%;
  }
`;

class ConditionNodeWidget extends SRD.BaseWidget {
  render() {
    return (
      <Container>
        <PortContainer>
          <SRD.PortWidget name="in" node={this.props.node} />
          <p>In</p>
        </PortContainer>
        <PortContainer>
          <p>Out</p>
          <SRD.PortWidget name="out" node={this.props.node} />
        </PortContainer>
      </Container>
    );
  }
}

export default ConditionNodeWidget;
