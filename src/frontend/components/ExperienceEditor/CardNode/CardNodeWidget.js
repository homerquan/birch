import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import * as SRD from 'storm-react-diagrams';
import { white } from 'material-ui/styles/colors';

import theme from '../../theme';

const { palette } = theme;

export const Container = styled.div`
  border-radius: 4px;
  border: 2px solid black;
`;

export const Header = styled.div`
  background-color: ${palette.primary1Color};
  color: ${white};
  padding: 5px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

export const Body = styled.div`
  padding: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  justify-content: space-between;
  background-color: ${white};
  height: 30px;
  
  p {
    margin: 0;
  }
`;

export const PortContainer = styled.div`
  display: flex;
  align-items: center;
`;

class CardNodeWidget extends SRD.BaseWidget {
  static defaultProps = {
    size: 150,
    node: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  generatePort(port) {
    return <SRD.DefaultPortLabel model={port} key={port.id} />;
  }

  render() {
    console.log('CardNodeWidget props in render here: ', this.props);
    return (
      <Container>
        <Header>
          <p>{this.props.node.name}</p>
        </Header>
        <Body>
          <PortContainer>
            {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
          </PortContainer>
          <PortContainer>
            {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
          </PortContainer>
        </Body>
      </Container>
    );
  }
}

CardNodeWidget.propTypes = {
  size: PropTypes.number.isRequired,
};

export default CardNodeWidget;
