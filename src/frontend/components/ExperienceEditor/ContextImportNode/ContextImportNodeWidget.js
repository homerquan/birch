import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import * as SRD from 'storm-react-diagrams';
import { white } from 'material-ui/styles/colors';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import theme from '../../theme';

const { palette } = theme;

export const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 2px solid black;
  background-color: ${white};
  padding: 5px 0 5px 5px;
  display: flex;
  
  p {
    margin: 0;
  }
`;

export const PortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

class ContextImportNodeWidget extends SRD.BaseWidget {
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
    console.log('ContextImport props here: ', this.props);
    return (
      <Container>
        <p>Context Import</p>
        <PortContainer>
          <ChevronRight color="black" />
          {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
        </PortContainer>
      </Container>
    );
  }
}

ContextImportNodeWidget.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ContextImportNodeWidget;
