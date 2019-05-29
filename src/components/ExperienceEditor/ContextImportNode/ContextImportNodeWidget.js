import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as SRD from 'storm-react-diagrams';
import { white } from '@material-ui/core/colors';
import { FiChevronRight as ChevronRight } from 'react-icons/fi';

// import theme from '../../theme';

// const { palette } = theme;

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

  render() {
    return (
      <Container>
        <p>Context Import</p>
        <PortContainer>
          <ChevronRight color="black" />
          <p>Out</p>
          <SRD.PortWidget name="out" node={this.props.node} />
        </PortContainer>
      </Container>
    );
  }
}

ContextImportNodeWidget.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ContextImportNodeWidget;
