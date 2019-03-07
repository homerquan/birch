import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import * as SRD from 'storm-react-diagrams';
import { white } from 'material-ui/styles/colors';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

import theme from '../../theme';

const { palette } = theme;

export const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  border: 2px solid black;
  background-color: ${white};
  padding: 5px 5px 5px 0;
  display: flex;
  
  p {
    margin: 0;
  }
`;

export const PortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

class ContextExportNodeWidget extends SRD.BaseWidget {
  static defaultProps = {
    size: 150,
    node: null,
  };

  constructor(props) {
    super(props);
    this.state = {};

    console.log('ContextExport props here: ', this.props);
  }

  generatePort(port) {
    return <SRD.DefaultPortLabel model={port} key={port.id} />;
  }

  render() {
    return (
      <Container>
        <PortContainer>
          {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
          <ChevronLeft color="black" />
        </PortContainer>
        <p>Context Export</p>
      </Container>
    );
  }
}

ContextExportNodeWidget.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ContextExportNodeWidget;
